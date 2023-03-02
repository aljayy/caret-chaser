import Logo from "./Logo/Logo";
import MobileTestSettings from "../TestSettings/MobileTestSettings/MobileTestSettings";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import classes from "./Header.module.scss";

function Header() {
  return (
    <>
      <div className={classes.top}>
        <Logo />
        <ThemeToggler />
      </div>
      <MobileTestSettings />
    </>
  );
}

export default Header;
