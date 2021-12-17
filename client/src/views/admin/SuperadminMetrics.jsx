import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChartSuperadmin } from "../../components/owner/ChartSuperadmin";
import { PieChartSuperadmin } from "../../components/admin/PieChartSuperadmin";

export const SuperadminMetrics = () => {
  const user = useSelector((state) => state.user.user);
  const [obj, setObj] = useState({})
  const [fin, setFin] = useState({})
  const date = new Date()
  let actualMonth = date.toString().substring(4,7)

  useEffect(() => {
    axios.get(`/api/superAdmin/clients`).then((res) => {
      setObj({})
      const lastYearData = res.data.filter(el => {
        let elDate = new Date(el.createdDate)
        return (elDate - date > -31536000000)
      })
      lastYearData.forEach(el=>{
        let elD = new Date(el.createdDate)
        let month = elD.toString().substring(4,7)
        return obj[month] = (obj[month] || 1) +1
      })
      setFin(obj)
    });
  }, []);

  return (
    <Box m={3}>
      <Heading fontWeight="bold">Metricas</Heading>
      <Text color="gray" fontSize={{ base: "sm", md: "xl" }}>
        Numero de nuevos clientes este mes
      </Text>
      <Text fontWeight="bold" fontSize="2xl">
        {fin[actualMonth]}
      </Text>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
        <GridItem w="100%" mt="10px">
          <Text color="gray" fontSize={{ base: "sm", md: "xl" }} mt="10px">
            Nuevos clientes
          </Text>
          <Box  w="90%">
            <ChartSuperadmin actualData={fin}/>
          </Box>
        </GridItem>
        <GridItem w="100%" mt="10px" align="center" >
          <Text color="gray" fontSize={{ base: "sm", md: "xl" }} mt="10px">
            Clientes activos e inactivos del ultimo año
          </Text>
          <Box  w={["100%", "100%", "60%", "60%", "40%"]}>
            <PieChartSuperadmin />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
