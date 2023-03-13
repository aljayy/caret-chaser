import { useContext } from "react";
import { Link } from "react-router-dom";
import ThemeCtx from "../../../context/themectx";
import lightLogo from "../../../assets/cclightlogo.svg";
import darkLogo from "../../../assets/ccdarklogo.svg";
import classes from "./Logo.module.scss";

function Logo() {
  const { theme } = useContext(ThemeCtx);

  const logo = theme === "light" ? lightLogo : darkLogo;

  return (
    <Link to={"/"} className={classes["logo-wrapper"]}>
      <img src={logo} alt="Logo" />
    </Link>
  );
}

export default Logo;
