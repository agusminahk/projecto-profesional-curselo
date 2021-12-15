
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Activos', 'Inactivos'],
  datasets: [
    {
      label: '% medios de pago',
      data: [8565, 525],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    },
  ],
};


export const PieChartSuperadmin = () => {
    return  <Pie data={data} />
}