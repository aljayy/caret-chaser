import React, { useContext } from "react";
import ThemeCtx from "../../context/themectx";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import classes from "./Graph.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph({ data }) {
  const themeCtx = useContext(ThemeCtx);

  const lineTheme =
    themeCtx.theme === "light"
      ? { borderColor: "#080909", pointBackgroundColor: "#99947f" }
      : { borderColor: "#a1a1a1", pointBackgroundColor: "#383e42" };

  const gridTheme =
    themeCtx.theme === "light"
      ? { grid: { color: "#d3cfc1" } }
      : { grid: { color: "#383e42" } };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "sec",
        },
        ...gridTheme,
      },
      y: {
        title: {
          display: true,
          text: "wpm",
        },
        ...gridTheme,
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  let results = {
    labels: data.map((data) => data.seconds),
    datasets: [
      {
        data: data.map((data) => data.wpm),
        ...lineTheme,
      },
    ],
  };
  return <Line data={results} options={options} className={classes.graph} />;
}

export default Graph;
