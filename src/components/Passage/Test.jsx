import { useState, useEffect, useRef } from "react";
import Caret from "../Caret/Caret";
import classes from "./Passage.module.scss";

function Passage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [passageArray, setPassageArray] = useState([]);
  const [caretX, setCaretX] = useState(0.4);
  const [caretY, setCaretY] = useState(0.8);

  const [activeWordRect, setActiveWordRect] = useState(null);
  const activeRef = useRef([]);
  // Caret component implementation
  // // This component is going to be a div with no content. Just some width, height, and coloring added to give the appearance of a caret.
  // // // Currently positioned absolute with parent "passage-wrapper" positioned relative. With a starting top of 0.8rem and left 0.4rem
  // // // After some light testing, the caret's left position is going to have to move 1.2rem per letter typed. 1rem when space bar is clicked.

  useEffect(() => {
    return async () => {
      let response = await fetch(
        `https://caret-catcher-default-rtdb.firebaseio.com/passage0.json`
      );

      let data = await response.json();

      let passage = data
        .toLowerCase()
        .split(" ")
        .map((word) => {
          // return word.split("").map((letter) => {
          //   return { letter: letter, correct: null, incorrect: null };
          // });
          return {
            active: null,
            word: word.split("").map((letter) => {
              return { letter: letter, correct: null, incorrect: null };
            }),
          };
        });
      setPassageArray(passage);
    };
  }, []);

  useEffect(() => {
    if (activeRef.current[wordIndex]) {
      setActiveWordRect(activeRef.current[wordIndex].getBoundingClientRect());
      console.log(activeRef.current[wordIndex].offsetTop);
      if (activeRef.current[wordIndex].offsetTop === 41) {
        setCaretY(4.6);
        setCaretX(0.4);
      }
    }
  }, [wordIndex]);

  function checkLetter(e) {
    let letterRegex = /^[a-zA-Z]$/;
    if (letterRegex.test(e.key)) {
      let currentLetter = passageArray[wordIndex].word[letterIndex].letter;

      // if (wordIndex === 0 && passageArray[wordIndex].active === null || wordIndex !== 0)
      //   passageArray[wordIndex].active = true;

      if (passageArray[wordIndex].active === null)
        passageArray[wordIndex].active = true;

      let curWord = document.getElementsByClassName(`${classes.active}`);
      console.log(curWord.offsetTop);
      if (e.key === currentLetter) {
        setPassageArray((prev) => {
          let updated = [...prev];
          updated[wordIndex].word[letterIndex].correct = true;
          return updated;
        });
      } else if (e.key !== currentLetter) {
        setPassageArray((prev) => {
          let updated = [...prev];
          updated[wordIndex].word[letterIndex].incorrect = true;
          return updated;
        });
      }
      setLetterIndex((prev) => prev + 1);
      setCaretX((prev) => prev + 1.2);
    } else if (e.key === " ") {
      if (letterIndex === 0) return;

      let currentWord = passageArray[wordIndex];
      currentWord.active = false;

      if (letterIndex < currentWord.length) {
        for (let i = letterIndex; i < currentWord.length; i++) {
          setPassageArray((prev) => {
            let updated = [...prev];
            updated[wordIndex].word[i].incorrect = true;
            return updated;
          });
        }
      }

      setWordIndex((count) => count + 1);
      setLetterIndex(0);
      setCaretX((prev) => prev + 1);
    } else if (e.key === "Backspace" && letterIndex > 0) {
      setLetterIndex((prev) => prev - 1);
      setPassageArray((prev) => {
        let updated = [...prev];
        updated[wordIndex].word[letterIndex - 1].correct = null;
        updated[wordIndex].word[letterIndex - 1].incorrect = null;
        return updated;
      });
      setCaretX((prev) => prev - 1.2);
    }
  }

  return (
    <div className={classes["passage-wrapper"]}>
      <Caret caretX={caretX} caretY={caretY} />
      <input className={classes["test-input"]} onKeyDown={checkLetter} />
      {passageArray.map((word, index) => {
        return (
          <div
            className={`${classes.word} ${word.active ? classes.active : ""}`}
            ref={(el) => (activeRef.current[index] = el)}
          >
            {word.word.map((current) => {
              return (
                <span
                  className={`${current.correct ? classes.correct : ""} ${
                    current.incorrect ? classes.incorrect : ""
                  }`}
                >
                  {current.letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Passage;
