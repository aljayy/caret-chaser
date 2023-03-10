import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Passage from "./components/Passage/Passage";
import Results from "./pages/Results/Results";
import ThemeCtx from "./context/themectx";
import classes from "./App.module.scss";

function App() {
  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <div className={theme}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to={"/test"} />} />
        <Route path="/test" element={<Passage />} />
        <Route path="/results" element={<Results />}/>
      </Routes>
    </div>
  );
}

export default App;
