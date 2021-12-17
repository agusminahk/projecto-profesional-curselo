import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
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

const date = new Date()
const actualMonth = date.getMonth()+1

export const ChartAdmin = ({actualData}) => {
const months = {
    "Ene": actualData.Jan || 0,
    "Feb": actualData.Feb || 0, 
    "Mar": actualData.Mar || 0,
    "Abr": actualData.Apr || 0,
    "May": actualData.May || 0,
    "Jun": actualData.Jun || 0,
    "Jul": actualData.Jul || 0,
    "Ago": actualData.Aug || 0,
    "Sep": actualData.Sep || 0,
    "Oct": actualData.Oct || 0,
    "Nov": actualData.Nov || 0,
    "Dic": actualData.Dec || 0,
  };
  const date = new Date()
const actualMonth = date.getMonth()+1
const bro = Object.keys(months).slice(0,actualMonth).map(key => ({[key]:months[key]}))
const atr = Object.keys(months).slice(actualMonth, 12).map(key => ({[key]:months[key]}))
let final = {}
bro.forEach(el => 
  final = {...final, ...el}
)
atr.forEach(el => 
  final = {...final, ...el}
)

const data = {
  labels: Object.keys(final) ,
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
      data: Object.values(final),
    },
  ],
};


  return <Line options={options} data={data} />;
};
