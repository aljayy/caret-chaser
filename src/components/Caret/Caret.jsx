import { useContext } from "react";
import ThemeCtx from "../../context/themectx";
import TestCtx from "../../context/testctx";
import classes from "./Caret.module.scss";

function Caret() {
  const themeCtx = useContext(ThemeCtx);
  const { caretLeft, caretTop } = useContext(TestCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <div
      className={`${classes.caret} ${theme}`}
      style={{ left: `${caretLeft}rem`, top: `${caretTop}rem` }}
    />
  );
}

export default Caret;
