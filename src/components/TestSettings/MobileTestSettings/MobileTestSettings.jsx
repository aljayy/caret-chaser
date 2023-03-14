import { useContext, useState } from "react";
import ThemeCtx from "../../../context/themectx";
import lightgear from "../../../assets/lightsettingsicon.svg";
import darkgear from "../../../assets/darksettingsicon.svg";
import classes from "./MobileTestSettings.module.scss";

function MobileTestSettings() {
  const themeCtx = useContext(ThemeCtx);
  const [showMenu, setShowMenu] = useState(false);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;
  const gear = themeCtx.theme === "light" ? lightgear : darkgear;

  function toggleMenu(e) {
    setShowMenu((prev) => !prev);
  }

  return (
    <>
      {!showMenu && (
        <button
          onClick={toggleMenu}
          className={`${classes["mobile-settings"]} ${theme}`}
        >
          <div className={classes.icon}>
            <img src={gear} alt={"settings icon"} />
          </div>
          <h2>Test Settings</h2>
        </button>
      )}
      {showMenu && (
        <div className={classes.overlay} onClick={toggleMenu}>
          <menu
            className={classes["mobile-menu"]}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li>test</li>
              <li>quotes</li>
            </ul>
            <ul>
              <li>15</li>
              <li>30</li>
              <li>60</li>
            </ul>
          </menu>
        </div>
      )}
    </>
  );
}

export default MobileTestSettings;
