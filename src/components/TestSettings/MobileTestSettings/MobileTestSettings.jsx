import { useContext } from "react";
import ThemeCtx from "../../../context/themectx";
import lightgear from "../../../assets/lightsettingsicon.svg";
import darkgear from "../../../assets/darksettingsicon.svg";
import classes from "./MobileTestSettings.module.scss";

function MobileTestSettings() {
  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;
  const gear = themeCtx.theme === "light" ? lightgear : darkgear;

  return (
    <button className={`${classes["mobile-settings"]} ${theme}`}>
      <div className={classes.icon}>
        <img src={gear} alt={"settings icon"} />
      </div>
      <h2>Test Settings</h2>
    </button>
  );
}

export default MobileTestSettings;
