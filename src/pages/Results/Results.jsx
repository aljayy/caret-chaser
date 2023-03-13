import React, { useContext, useEffect } from "react";
import TestCtx from "../../context/testctx";
import ThemeCtx from "../../context/themectx";
import Graph from "../../components/Graph/Graph";
import Loader from "../../components/UI/Loader";
import classes from "./Results.module.scss";

function Results() {
  const { calculateResults, secondaryResults, netWpm, isLoading } =
    useContext(TestCtx);

  useEffect(() => {
    calculateResults();
  }, [calculateResults]);

  const themeCtx = useContext(ThemeCtx);

  const theme = themeCtx.theme === "light" ? classes.light : classes.dark;

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && secondaryResults.length > 0 && (
        <div className={theme}>
          <div className={classes["main-data-wrapper"]}>
            <div className={classes["main-data"]}>
              <div>
                <h2>wpm</h2>
                <p>{netWpm[netWpm.length - 1].wpm}</p>
              </div>
              <div>
                <h2>acc</h2>
                <p>{secondaryResults[0].accuracy}</p>
              </div>
            </div>
            <Graph data={netWpm} />
          </div>
          <div className={classes["secondary-data-wrapper"]}>
            <div>
              <h3>gwpm</h3>
              <p>{secondaryResults[0].gwpm}</p>
            </div>
            <div>
              <h3>characters</h3>
              <p>
                <span>correct:</span>
                {secondaryResults[0].charsData.correct}
              </p>
              <p>
                <span>incorrect:</span>
                {secondaryResults[0].charsData.incorrect}
              </p>
              <p>
                <span>total:</span>
                {secondaryResults[0].charsData.total}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Results;
