import logo from "../../../assets/cclogo.svg";
import classes from "./Logo.module.scss";

function Logo() {
  return (
    <div className={classes["logo-wrapper"]}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Logo;
