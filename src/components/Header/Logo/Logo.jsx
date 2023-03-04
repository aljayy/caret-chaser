import { useContext } from "react";
import ThemeCtx from "../../../context/themectx";
import lightLogo from "../../../assets/cclightlogo.svg";
import darkLogo from "../../../assets/ccdarklogo.svg";
import classes from "./Logo.module.scss";

function Logo() {
  const { theme } = useContext(ThemeCtx);

  const logo = theme === "light" ? lightLogo : darkLogo;

  return (
    <div className={classes["logo-wrapper"]}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Logo;
