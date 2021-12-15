import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Flex,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChartAdmin } from "../../components/admin/ChartAdmin";
import { TableAdmin } from "../../components/owner/TableAdmin";
import { PieChartAdmin } from "../../components/owner/PieChartAdmin";
import { setMetrics } from "../../state/restaurantSlice"

export const AdminMetrics = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const metrics = useSelector((state) => state.restaurant.metrics)

useEffect(()=>{
axios.get(`/api/admin/search?type=metrics&id=${restaurant._id}`)
.then((res)=> dispatch(setMetrics(res.data)))
}, [restaurant])

console.log(metrics)

  return (
    <Box m={3}>
      <Heading fontWeight="normal" mb={4} letterSpacing="tight">
        Metricas de
        <Flex display="inline-flex" fontWeight="bold">
          {restaurant.name}
        </Flex>
      </Heading>
      <Text color="gray" fontSize="sm">
        Ganancias del dia de ayer
      </Text>
      <Text fontWeight="bold" fontSize="2xl">
        $674565
      </Text>
      <Divider mt={3} mb={3} />
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}>
        <GridItem w="100%">
          <Flex p="3%" flexDir="column" overflow="auto" display={"flex"}>
            <Text fontWeight="bold" fontSize="xl">
              Ganancias ultimos meses
            </Text>
            <Text color="gray" fontSize="sm">
              Ganancias
            </Text>
            <ChartAdmin />
          </Flex>
          <Divider display={{ md: "none" }} mt={3} mb={3} />
        </GridItem>
        <GridItem w="100%">
          <Flex pt="3%" flexDir="column" overflow="auto" display={"flex"}>
            <Text fontWeight="bold" fontSize="xl">
              Productos mas vendidos de este mes
            </Text>
            <TableAdmin />
          </Flex>
          <Divider display={{ md: "none" }} mt={3} mb={3} />
        </GridItem>
        <GridItem w="100%">
          <Flex p="10%" flexDir="column" overflow="auto" display={"flex"}>
            <Text fontWeight="bold" fontSize="xl">
              Metodos de pago mas utilizados
            </Text>
            <PieChartAdmin />
          </Flex>
          <Divider display={{ md: "none" }} mt={3} mb={3} />
        </GridItem>
      </Grid>
    </Box>
  );
};
