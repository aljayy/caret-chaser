import { useContext, useState } from "react";
import TestCtx from "../../../context/testctx";
import ThemeCtx from "../../../context/themectx";
import lightgear from "../../../assets/lightsettingsicon.svg";
import darkgear from "../../../assets/darksettingsicon.svg";
import classes from "./MobileTestSettings.module.scss";

function MobileTestSettings() {
  const themeCtx = useContext(ThemeCtx);
  const { settings, setSettings } = useContext(TestCtx);
  const [showMenu, setShowMenu] = useState(true);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;
  const gear = themeCtx.theme === "light" ? lightgear : darkgear;
  const menuTheme =
    themeCtx.theme === "light" ? classes["menu-light"] : classes["menu-dark"];
  const menuActiveTheme =
    themeCtx.theme === "light"
      ? classes["category-active-light"]
      : classes["category-active-dark"];
  const menuInactiveTheme =
    themeCtx.theme === "dark"
      ? classes["category-inactive-dark"]
      : classes["category-inactive-light"];

  function toggleMenu() {
    setShowMenu((prev) => !prev);
  }

  function selectSettings(setState, array, i) {
    setState((prev) => {
      let updated = [...prev];
      updated[array].map((category, index) => {
        if (index === i) return (category.active = true);
        else return (category.active = false);
      });

      return updated;
    });
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
            className={`${classes["mobile-menu"]} ${menuTheme}`}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {settings[0].map((category, index) => {
                return (
                  <li
                    className={`${
                      category.active ? menuActiveTheme : menuInactiveTheme
                    }`}
                    onClick={() => selectSettings(setSettings, 0, index)}
                  >
                    {category.test}
                  </li>
                );
              })}
            </ul>
            <ul>
              {settings[1].map((category, index) => {
                return (
                  <li
                    className={`${
                      category.active ? menuActiveTheme : menuInactiveTheme
                    }`}
                    onClick={() => selectSettings(setSettings, 1, index)}
                  >
                    {category.settings}
                  </li>
                );
              })}
            </ul>
          </menu>
        </div>
      )}
    </>
  );
}

export default MobileTestSettings;
