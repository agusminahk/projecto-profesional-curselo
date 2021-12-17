import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartAdmin = () => {
  const user = useSelector((state) => state.user.user);
  const [activeClient, setActiveClient] = useState([]);
  const [inactiveClient, setInactiveClient] = useState([]);
  const date = new Date()
  useEffect(() => {
    axios.get(`/api/superAdmin/clients`).then((res) => {
      const lastYearData = res.data.filter(el => {
        let elDate = new Date(el.createdDate)
        return (elDate - date > -31536000000)
      })
      const activ = lastYearData.filter((el) => el.state === true);
      const inactiv = lastYearData.filter((el) => el.state === false);
      setActiveClient(activ);
      setInactiveClient(inactiv);
    });
  }, [user]);

  const data = {
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



    return <Pie data={data} />
}