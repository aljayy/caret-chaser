import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestCtx from "../../context/testctx";
import classes from "./Timer.module.scss";

function Timer() {
  const [timer, setTimer] = useState(30);
  const [seconds, setSeconds] = useState(1);
  const { isTyping, calculateNetWPM } = useContext(TestCtx);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer === 0) {
      navigate("/results");
    }

    if (timer > 0 && isTyping) {
      var countDown = setTimeout(() => {
        setTimer((prev) => prev - 1);
        setSeconds((prev) => prev + 1);
        calculateNetWPM(seconds);
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
