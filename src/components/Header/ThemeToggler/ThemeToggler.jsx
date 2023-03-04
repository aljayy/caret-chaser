import { useContext } from "react";
import ThemeCtx from "../../../context/themectx";
import darkicon from "../../../assets/darkmodeicon.svg";
import lighticon from "../../../assets/lightmodeicon.svg";
import classes from "./ThemeToggler.module.scss";

function ThemeToggler() {
  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;
  const icon = themeCtx.theme === "light" ? lighticon : darkicon;

  return (
    <button
      className={`${classes.toggler} ${theme}`}
      onClick={themeCtx.toggleTheme}
    >
      <div>
        <img src={icon} alt={"current theme icon"} />
      </div>
    </button>
  );
}

export default ThemeToggler;
