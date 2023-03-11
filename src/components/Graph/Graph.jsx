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

const labels = [
  { seconds: 1, wpm: 80 },
  { seconds: 2, wpm: 76 },
  { seconds: 3, wpm: 78 },
  { seconds: 4, wpm: 60 },
  { seconds: 5, wpm: 68 },
  { seconds: 6, wpm: 52 },
  { seconds: 7, wpm: 66 },
  { seconds: 8, wpm: 72 },
  { seconds: 9, wpm: 80 },
  { seconds: 10, wpm: 82 },
  { seconds: 11, wpm: 88 },
  { seconds: 12, wpm: 104 },
  { seconds: 13, wpm: 98 },
  { seconds: 14, wpm: 99 },
  { seconds: 15, wpm: 105 },
  { seconds: 16, wpm: 92 },
  { seconds: 17, wpm: 80 },
  { seconds: 18, wpm: 93 },
  { seconds: 19, wpm: 90 },
  { seconds: 20, wpm: 96 },
  { seconds: 21, wpm: 94 },
  { seconds: 22, wpm: 108 },
  { seconds: 23, wpm: 101 },
  { seconds: 24, wpm: 105 },
  { seconds: 25, wpm: 104 },
  { seconds: 26, wpm: 104 },
  { seconds: 27, wpm: 104 },
  { seconds: 28, wpm: 103 },
  { seconds: 29, wpm: 105 },
  { seconds: 30, wpm: 107 },
];

const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Seconds",
      },
    },
    y: {
      title: {
        display: true,
        text: "WPM",
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

let data = {
  labels: labels.map((data) => data.seconds),
  datasets: [
    {
      data: labels.map((data) => data.wpm),
      borderColor: "#ff6700",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

function Graph() {
  return <Line data={data} options={options} className={classes.graph} />;
}

export default Graph;
