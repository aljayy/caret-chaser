import { useState, useEffect, useRef } from "react";
import Caret from "../Caret/Caret";
import classes from "./Passage.module.scss";

function Passage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [passageArray, setPassageArray] = useState([]);
  const [caretLeft, setCaretLeft] = useState(0.4);
  const [caretTop, setCaretTop] = useState(0.8);
  const passageRef = useRef();
  // // Shifting passage position 📌
  // // // The only time the user will be typing on the first line is in the beginning, after the currentWord shifts onto the second line that's where it will stay for the duration of the test. 📌
  // // // So when user completes the last word on the second line and shifts to the next one. Move the passage up so now the second line is the first line, the third is the second, and the fourth is the third. (I want to only show 3 lines at a time). 📌

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
          return word.split("").map((letter) => {
            return { letter: letter, correct: null, incorrect: null };
          });
        });
      setPassageArray(passage);
    };
  }, []);

  function checkLetter(e) {
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
      setCaretLeft((prev) => prev + 1.2);
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

      if (passageRef.current.childNodes[wordIndex + 1].offsetTop > 5) {
        setCaretLeft(0.4);
        setCaretTop(4.6);
      } else setCaretLeft((prev) => prev + 1);

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
      setCaretLeft((prev) => prev - 1.2);
    }
  }

  return (
    <div className={classes["test-wrapper"]}>
      <Caret caretLeft={caretLeft} caretTop={caretTop} />
      <input className={classes["test-input"]} onKeyDown={checkLetter} />
      <div ref={passageRef} className={classes["passage-wrapper"]}>
        {passageArray.map((word) => {
          return (
            <div className={classes.word}>
              {word.map((current) => {
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
    </div>
  );
}

export default Passage;
