import React, { useContext, useEffect } from "react";
import TestCtx from "../../context/testctx";
import Loader from "../../components/UI/Loader";
import classes from "./Results.module.scss";

function Results() {
  // const { calculateResults, secondaryResults, netWpm, isLoading } =
  //   useContext(TestCtx);

  // useEffect(() => {
  //   calculateResults();
  // }, [calculateResults]);

  // console.log(secondaryResults);

  const { isLoading } = useContext(TestCtx);

  let netWpm = [{ wpm: 100 }];
  let secondaryResults = [
    {
      accuracy: 99,
    },
  ];
  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && secondaryResults.length > 0 && (
        <div className={classes.wrapper}>
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
            <div className={classes["main-data-graph"]}>GRAPH</div>
          </div>
          <div className={classes["secondary-data-wrapper"]}>
            <div>
              <h3>gwpm</h3>
              <p>104</p>
            </div>
            <div>
              <h3>characters</h3>
              <p>
                <span>correct:</span> 99
              </p>
              <p>
                <span>incorrect:</span> 1
              </p>
              <p>
                <span>total:</span> 100
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Results;
