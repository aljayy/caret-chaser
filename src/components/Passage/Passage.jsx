import { useEffect, useContext } from "react";
import TestCtx from "../../context/testctx";
import ThemeCtx from "../../context/themectx";
import Caret from "../Caret/Caret";
import classes from "./Passage.module.scss";

function Passage() {
  const themeCtx = useContext(ThemeCtx);
  const { retrievePassage, checkLetter, passageArray, passageRef, passageTop } =
    useContext(TestCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  useEffect(() => {
    retrievePassage();
  }, [retrievePassage]);

  return (
    <div className={`${classes["test-wrapper"]} ${theme}`}>
      <Caret />
      <input
        className={classes["test-input"]}
        onKeyDown={checkLetter}
        spellCheck={false}
      />
      <div
        ref={passageRef}
        className={classes["passage-wrapper"]}
        style={{ top: `${passageTop}rem` }}
      >
        {passageArray.map((word, index) => {
          return (
            <div className={classes.word} key={`${word + index}`}>
              {word.map((current, index) => {
                return (
                  <span
                    className={`${current.correct ? classes.correct : ""} ${
                      current.incorrect ? classes.incorrect : ""
                    }`}
                    key={`${current + index}`}
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
