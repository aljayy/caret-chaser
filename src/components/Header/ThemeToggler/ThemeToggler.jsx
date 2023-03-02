import lighticon from "../../../assets/lightmodeicon.svg";
import classes from "./ThemeToggler.module.scss";

function ThemeToggler() {
  return (
    <button className={classes.toggler}>
      <div>
        <img src={lighticon} alt={"current theme icon"} />
      </div>
    </button>
  );
}

export default ThemeToggler;
