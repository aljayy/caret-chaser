import React from "react";
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

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "sec",
      },
    },
    y: {
      title: {
        display: true,
        text: "wpm",
      },
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

function Graph({ data }) {
  let results = {
    labels: data.map((data) => data.seconds),
    datasets: [
      {
        data: data.map((data) => data.wpm),
        borderColor: "#080909",
        pointBackgroundColor: "#99947f",
      },
    ],
  };
  return <Line data={results} options={options} className={classes.graph} />;
}

export default Graph;
