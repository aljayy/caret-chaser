import { useState, useEffect } from "react";
import classes from "./Passage.module.scss";

function Passage() {
  // Approach to displaying test
  // // e.g. passage = "easy stop"
  // // I need to first of all break each word into it's own array. passage.split(" ") => ["easy", "stop"]; ✅
  // // For each word, split all the letters. => [["e", "a", "s", "y"], ["s", "t", "o", "p"]] => wordArr; ✅
  // // Loop through each element of this array of arrays. And display all the letters together as words. ✅
  // // They will all have a default class. e.g. Light mode text will have a class that will give the letters a color of #99947F (plus all default styling). ✅
  // Approach to styling current letter
  // // Have a hidden input where the users input will be compared to the passage. ✅
  // // If keyDownEvent === arr[letterIndex], letter class coloring = #000000 ✅
  // // Else if keyDownEvent !== arr[letterIndex], letter class coloring = #BA3333 ✅
  // Approach to implementing test
  // // // Have a wordIndex state that holds the index of the current word I'm in. Increase the counter by 1 when the spacebar is clicked && letterIndex !== 0. wordArr[0] => ["e", "a", "s", "y"] 📌
  // // // I will also need a letterIndex state that holds the current letter I'm comparing to. Start at 0, increase with a keyDownEvent that isn't a space and reset to 0 if event is a space. arr[0] => "e". 📌

  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [passageArray, setPassageArray] = useState([]);

  useEffect(() => {
    let passage = "easy stop population including society common like"
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
      // if (e.key === " " && letterIndex !== 0) {
      //   setWordIndex((prev) => prev + 1);
      // }
    }
  }

  return (
    <div className={classes["passage-wrapper"]}>
      <input className={classes["test-input"]} onKeyDown={checkLetter} />
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
  );
}

export default Passage;

// let testWords =
//   "Ground live color ok thus relate image meeting cost lead need energy although build because history news pretty care say impact concern future create either through or ball physical road determine half cover key here travel stay design law direction condition interest hair follow able inside use these traditional rise employee tend soldier until order claim season decision school growth light appear before attorney someone prepare rich answer year nation single most forward before economic yeah student generation market son easy stop population including society common like during form ahead him camera continue not into task let option edge how our beautiful use close however traditional threat old political itself support fall attention red Democrat let right record never onto minute speak worker seven imagine performance still capital success prove fast miss effort lose citizen movement enjoy game student break adult major";
