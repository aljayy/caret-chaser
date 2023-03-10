import React, { useContext } from "react";
import ThemeCtx from "../../context/themectx";
import classes from "./Loader.module.scss";

function Loader() {
  const themeCtx = useContext(ThemeCtx);
  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;
  return <div className={`${classes.loader} ${theme}`} />;
}

export default Loader;
