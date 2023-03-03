import classes from "./Caret.module.scss";

function Caret({ caretLeft, caretTop }) {
  return (
    <div
      className={classes.caret}
      style={{ left: `${caretLeft}rem`, top: `${caretTop}rem` }}
    />
  );
}

export default Caret;
