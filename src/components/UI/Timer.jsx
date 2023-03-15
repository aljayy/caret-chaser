import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestCtx from "../../context/testctx";
import ThemeCtx from "../../context/themectx";
import classes from "./Timer.module.scss";

function Timer() {
  const { isTyping, calculateNetWPM, setIsTyping, timeLimit } =
    useContext(TestCtx);
  const [timer, setTimer] = useState();
  const [seconds, setSeconds] = useState(1);
  const themeCtx = useContext(ThemeCtx);
  const navigate = useNavigate();

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  useEffect(() => {
    setTimer(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (timer === 0) {
      navigate("/results");
      setIsTyping(false);
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
    <div className={`${classes.timer} ${theme}`}>
      <p>{timer}</p>
    </div>
  );
}

export default Timer;
