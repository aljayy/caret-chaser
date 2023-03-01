import { useState, useEffect, useRef } from "react";
import Caret from "../Caret/Caret";
import classes from "./Passage.module.scss";

function Passage() {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [passageArray, setPassageArray] = useState([]);
  const [caretLeft, setCaretLeft] = useState(0.5);
  const [caretTop, setCaretTop] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(null);
  const passageRef = useRef();

  // Implementing changing passages position alongside the Caret component

  // // Show only 3 lines of text at a time ✅
  // // // I believe this is why mt keeps their font size text at 24px across all devices. Makes it easier to handle this implementation so keep that in mind. ✅
  // // // With each line break the offsetTop is changed by 4.4rem, 3 lines of text will on average be 13.2rem. So the passage-wrapper should be that height. ✅

  // // Keeping track of offsetTop ✅
  // // // Create state that holds current value of offsetTop, initialize as null. ✅
  // // // // Check if state is null in checkLetter function, if so update state to be the position of the current word. ✅
  // // // Comparing currentWord position with offsetTop state ✅
  // // // // The line breaks only when the spacebar is clicked. So with each spacebar click check if passageRef...[wordIndex + 1].offsetTop !== currentPosition. ✅
  // // // // If it is different, update offsetTop to new position. ✅
  // // // // // Position Caret on new line. ✅

  // // Moving passages position when line breaks 📌
  // // // On first line 📌
  // // // // User is going to be on the first line only once, after the first line break to go on to the second line I will give the user the illusation of staying on the second line. 📌
  // // // // // e.g. user starts typing on the second line for the first time. They reach the end, break onto the third line of the passage, offsetTop value changes. 📌
  // // // // // // I will want to shift the text up by one line. first line hidden, second line => first, third => second, fourth => third. 📌
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
        currentPosition
      ) {
        setCurrentPosition(
          passageRef.current.childNodes[wordIndex + 1].offsetTop
        );
        setCaretLeft(0.5);
        setCaretTop(5.4);
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
