import React, { useContext, useEffect, useState } from "react";
import TestCtx from "../../context/testctx";
import classes from "./Timer.module.scss";

function Timer() {
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(1);
  const { isTyping, calculateWPM } = useContext(TestCtx);

  useEffect(() => {
    if (timer > 0 && isTyping) {
      var countDown = setTimeout(() => {
        setTimer((prev) => prev - 1);
        setSeconds((prev) => prev + 1);
        calculateWPM(seconds);
      }, 1000);
    }

    return () => {
      clearTimeout(countDown);
    };
  }, [timer, isTyping]);

  return (
    <div className={classes.timer}>
      <p>{timer}</p>
    </div>
  );
}

export default Timer;
