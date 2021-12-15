
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Efectivo', 'Debito', 'Credito', 'Transferencia'],
  datasets: [
    {
      label: '% medios de pago',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        /* 'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)', */
      ],
    },
  ],
};


export const PieChartAdmin = () => {
    return <Pie data={data} />
}