import { useContext } from "react";
import ThemeCtx from "../../context/themectx";
import classes from "./Caret.module.scss";

function Caret({ caretLeft, caretTop }) {
  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <div
      className={`${classes.caret} ${theme}`}
      style={{ left: `${caretLeft}rem`, top: `${caretTop}rem` }}
    />
  );
}

export default Caret;
