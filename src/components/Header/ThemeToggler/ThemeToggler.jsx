import { useContext } from "react";
import ThemeCtx from "../../../context/themectx";
import lighticon from "../../../assets/lightmodeicon.svg";
import classes from "./ThemeToggler.module.scss";

function ThemeToggler() {
  const themeCtx = useContext(ThemeCtx);

  return (
    <button className={classes.toggler} onClick={themeCtx.toggleTheme}>
      <div>
        <img src={lighticon} alt={"current theme icon"} />
      </div>
    </button>
  );
}

export default ThemeToggler;
