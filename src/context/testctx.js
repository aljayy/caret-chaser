import React, { useState, useEffect, useRef, useCallback } from "react";

const TestCtx = React.createContext({
  passageArray: [],
  passageTop: 0,
  caretLeft: 0.5,
  caretTop: 1,
  isLoading: false,
  isTyping: false,
  netWpm: [],
  passageRef: "",
  secondaryResults: [],
  settings: [],
  timeLimit: 0,
  calculateResults: () => {},
  checkLetter: () => {},
  retrievePassage: () => {},
  setIsTyping: () => {},
  setSettings: () => {},
  setTimeLimit: () => {},
});

export function TestCtxProvider({ children }) {
  const [caretLeft, setCaretLeft] = useState(0.5);
  const [caretTop, setCaretTop] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [netWpm, setNetWpm] = useState([]);
  const [passageArray, setPassageArray] = useState([]);
  const [passageTop, setPassageTop] = useState(0);
  const [secondaryResults, setSecondaryResults] = useState([]);
  const [timeLimit, setTimeLimit] = useState(15);
  const [wordIndex, setWordIndex] = useState(0);
  const [settings, setSettings] = useState([
    [{ test: "timed", active: true }],
    [
      { settings: 15, active: true },
      { settings: 30, active: false },
      { settings: 60, active: false },
    ],
  ]);
  const passageRef = useRef(null);

  useEffect(() => {
    setTimeLimit(settings[1].find((option) => option.active).settings);
  }, [settings]);

  const retrievePassage = useCallback(async () => {
    let response = await fetch(
      `https://caret-catcher-default-rtdb.firebaseio.com/passage0.json`
    );

    let data = await response.json();

    let passage = data
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.split("").map((letter) => {
          return { letter: letter, correct: null, incorrect: null };
        });
      });

    setPassageArray(passage);
  }, []);

  function checkLetter(e) {
    if (!isTyping) {
      setIsTyping(true);
    }

    if (currentPosition === null) {
      setCurrentPosition(passageRef.current.childNodes[wordIndex].offsetTop);
    }

    let letterRegex = /^[a-zA-Z]$/;
    if (letterRegex.test(e.key)) {
      let currentLetter = passageArray[wordIndex][letterIndex].letter;
      if (e.key === currentLetter) {
        setPassageArray((prev) => {
          let updated = [...prev];
          updated[wordIndex][letterIndex].correct = true;
          return updated;
        });
      } else if (e.key !== currentLetter) {
        setPassageArray((prev) => {
          let updated = [...prev];
          updated[wordIndex][letterIndex].incorrect = true;
          return updated;
        });
      }
      setLetterIndex((prev) => prev + 1);
      setCaretLeft((prev) => prev + 1.45);
    } else if (e.key === " ") {
      if (letterIndex === 0) return;

      let currentWord = passageArray[wordIndex];

      if (letterIndex < currentWord.length) {
        for (let i = letterIndex; i < currentWord.length; i++) {
          setPassageArray((prev) => {
            let updated = [...prev];
            updated[wordIndex][i].incorrect = true;
            return updated;
          });
        }
      }

      if (
        passageRef.current.childNodes[wordIndex + 1].offsetTop !==
          currentPosition &&
        passageRef.current.childNodes[wordIndex].offsetTop === 6
      ) {
        setCaretLeft(0.5);
        setCurrentPosition(
          passageRef.current.childNodes[wordIndex + 1].offsetTop
        );
        setCaretTop(5.4);
      } else if (
        passageRef.current.childNodes[wordIndex + 1].offsetTop !==
        currentPosition
      ) {
        setPassageTop((prev) => prev - 4.4);
        setCaretLeft(0.5);
        setCurrentPosition(
          passageRef.current.childNodes[wordIndex + 1].offsetTop
        );
      } else setCaretLeft((prev) => prev + 1.15);

      setWordIndex((count) => count + 1);
      setLetterIndex(0);
    } else if (e.key === "Backspace" && letterIndex > 0) {
      setLetterIndex((prev) => prev - 1);
      setPassageArray((prev) => {
        let updated = [...prev];
        updated[wordIndex][letterIndex - 1].correct = null;
        updated[wordIndex][letterIndex - 1].incorrect = null;
        return updated;
      });
      setCaretLeft((prev) => prev - 1.45);
    }
  }

  function calculateNetWPM(seconds) {
    let spaces =
      passageArray
        .map((word) => {
          return word.filter((letter) => {
            if (letter.incorrect || letter.correct) return true;
            else return false;
          });
        })
        .filter((arr) => {
          if (arr.length < 1) return false;
          return true;
        }).length - 1;

    let correctChars = passageArray.flatMap((word) => {
      return word.filter((letter) => {
        if (letter.correct) return true;
        else return false;
      });
    }).length;

    let incorrectChars = passageArray.flatMap((word) => {
      return word.filter((letter) => {
        if (letter.incorrect) return true;
        else return false;
      });
    }).length;

    let totalChars = correctChars + incorrectChars + spaces;

    let currentWPM = Math.round(
      (totalChars / 5 - incorrectChars) / (seconds / 60)
    );

    setNetWpm((prev) => {
      return [...prev, { seconds: seconds, wpm: currentWPM }];
    });
  }

  const calculateResults = useCallback(() => {
    setIsLoading(true);
    let correctChars =
      passageArray.flatMap((word) => {
        return word.filter((letter) => {
          if (letter.correct) return true;
          else return false;
        });
      }).length +
      passageArray
        .map((word) => {
          return word.filter((letter) => {
            if (letter.incorrect || letter.correct) return true;
            else return false;
          });
        })
        .filter((arr) => {
          if (arr.length < 1) return false;
          return true;
        }).length -
      1;

    let incorrectChars = passageArray.flatMap((word) => {
      return word.filter((letter) => {
        if (letter.incorrect) return true;
        else return false;
      });
    }).length;

    let totalChars = correctChars + incorrectChars;
    let accuracy = Math.round((correctChars / totalChars) * 100);
    let gwpm = Math.round(totalChars / 5 / (timeLimit / 60));
    let charsData = {
      incorrect: incorrectChars,
      correct: correctChars,
      total: totalChars,
    };

    setSecondaryResults([
      {
        accuracy,
        gwpm,
        charsData,
      },
    ]);
    setIsLoading(false);
  }, [passageArray]);

  return (
    <TestCtx.Provider
      value={{
        calculateNetWPM,
        calculateResults,
        caretLeft,
        caretTop,
        checkLetter,
        isLoading,
        isTyping,
        netWpm,
        passageArray,
        passageRef,
        passageTop,
        retrievePassage,
        secondaryResults,
        setIsTyping,
        setTimeLimit,
        settings,
        setSettings,
        timeLimit,
      }}
    >
      {children}
    </TestCtx.Provider>
  );
}

export default TestCtx;
