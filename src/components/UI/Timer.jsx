import React, { useEffect, useState } from "react";
import classes from "./Timer.module.scss";

function Timer() {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      var countDown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(countDown);
    };
  }, [timer]);

  return (
    <div className={classes.timer}>
      <p>{timer}</p>
    </div>
  );
}

export default Timer;
