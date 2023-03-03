import { useContext } from "react";
import Header from "./components/Header/Header";
import Passage from "./components/Passage/Passage";
import ThemeCtx from "./context/themectx";
import classes from "./App.module.scss";

function App() {
  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <div className={theme}>
      <Header />
      <Passage />
    </div>
  );
}

export default App;
