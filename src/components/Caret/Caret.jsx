import { useState } from "react";
import classes from "./Caret.module.scss";

function Caret({ caretX }) {
  console.log(caretX);
  return <div className={classes.caret} style={{ left: `${caretX}rem` }}></div>;
}

export default Caret;
