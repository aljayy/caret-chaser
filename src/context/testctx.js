import React, { useState, useRef } from "react";

const TestCtx = React.createContext({
  passageArray: [],
  passageTop: 0,
  caretLeft: 0.5,
  caretTop: 1,
  passageRef: "",
  checkLetter: () => {},
  retrievePassage: () => {},
});

export function TestCtxProvider({ children }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [passageArray, setPassageArray] = useState([]);
  const [passageTop, setPassageTop] = useState(0);
  const [caretLeft, setCaretLeft] = useState(0.5);
  const [caretTop, setCaretTop] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(null);
  const passageRef = useRef(null);

  async function retrievePassage() {
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
  }

  function checkLetter(e) {
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

  return (
    <TestCtx.Provider
      value={{
        checkLetter,
        caretLeft,
        caretTop,
        passageArray,
        passageRef,
        passageTop,
        retrievePassage,
      }}
    >
      {children}
    </TestCtx.Provider>
  );
}

export default TestCtx;