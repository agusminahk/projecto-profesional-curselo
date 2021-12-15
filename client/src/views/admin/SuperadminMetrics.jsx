import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChartSuperadmin } from "../../components/owner/ChartSuperadmin";
import { setMetrics } from "../../state/userSlice";
import { PieChartSuperadmin } from "../../components/admin/PieChartSuperadmin";

export const SuperadminMetrics = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const metrics = useSelector((state) => state.user.metrics);

  useEffect(() => {
    axios
      .get(`/api/superAdmin/metrics`)
      .then((res) => dispatch(setMetrics(res.data)));
  }, [user]);

  console.log(metrics);

  /* useEffect(() => {
    axios.get(`/api/superAdmin/clients`).then((res) => console.log(res.data));
  }, [user]); */

  return (
    <Box m={3}>
      <Heading fontWeight="bold">Metricas</Heading>
      <Text color="gray" fontSize={{ base: "sm", md: "xl" }}>
        Numero de nuevos clientes este mes
      </Text>
      <Text fontWeight="bold" fontSize="2xl">
        800
      </Text>

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
        <GridItem w="100%" mt="10px">
          <Text color="gray" fontSize={{ base: "sm", md: "xl" }} mt="10px">
            Nuevos clientes
          </Text>
          <Box display="rigth" w="90%">
            <ChartSuperadmin />
          </Box>
        </GridItem>
        <GridItem w="100%" mt="10px">
          <Text color="gray" fontSize={{ base: "sm", md: "xl" }} mt="10px">
            Clientes activos
          </Text>
          <Box display="rigth" w={["100%", "100%", "60%", "60%", "40%"]}>
            <PieChartSuperadmin />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
