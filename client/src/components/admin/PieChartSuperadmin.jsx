import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartSuperadmin = () => {
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
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        label: "% medios de pago",
        data: [activeClient.length, inactiveClient.length],
        backgroundColor: ["#AEC695", "#DF0165"],
        borderColor: ["#86A960", "#8D0140"],
      },
    ],
  };

  return <Pie data={data} />;
};
