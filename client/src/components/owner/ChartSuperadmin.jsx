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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderDash: [3, 3],
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
const months = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const date = new Date()
const actualMonth = date.getMonth()+1
const labels = [...months.slice(actualMonth, 12), ...months.slice(0, actualMonth)]

export const data = {
  labels,
  datasets: [
    {
      label: "Ganancia mensual",
      fill: false,
      lineTension: 0,
      backgroundColor: "#db86b2",
      borderColor: "#B57295",
      borderCapStyle: "butt",
      borderDashOffset: 0.0,
      borderJoinStyle: "#B57295",
      pointBorderColor: "#B57295",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#B57295",
      pointHoverBorderColor: "#B57295",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [500, 300, 400, 500, 800, 650, 700, 690, 1000, 1200, 1050, 1300],
    },
  ],
};

export const ChartSuperadmin = () => {
  return <Line options={options} data={data} />;
};
