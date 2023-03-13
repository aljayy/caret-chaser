import Logo from "./Logo/Logo";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import classes from "./Header.module.scss";

function Header() {
  return (
    <>
      <div className={classes.top}>
        <Logo />
        <ThemeToggler />
      </div>
    </>
  );
}

export default Header;
