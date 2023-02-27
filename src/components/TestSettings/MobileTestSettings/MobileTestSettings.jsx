import gear from "../../../assets/lightsettingsicon.svg";
import classes from "./MobileTestSettings.module.scss";

function MobileTestSettings() {
  return (
    <button className={classes["mobile-settings"]}>
      <div className={classes.icon}>
        <img src={gear} />
      </div>
      <h2>Test Settings</h2>
    </button>
  );
}

export default MobileTestSettings;
