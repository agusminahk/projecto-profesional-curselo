import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Heading, Text, Box, Flex, Divider, Grid, GridItem } from "@chakra-ui/react";
import { ChartAdmin } from "../../components/admin/ChartAdmin";
import { TableAdmin } from "../../components/owner/TableAdmin";
import { PieChartAdmin } from "../../components/owner/PieChartAdmin";

export const AdminMetrics = () => {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const [metrics, setMetrics] = useState("");
    const [obj, setObj] = useState({});
    const [fin, setFin] = useState({});
    const date = new Date();

    useEffect(() => {
        axios.get(`/api/admin/search?type=metrics&id=${restaurant._id}`).then((res) => {
            console.log(res);
            setMetrics(res.data);
            setObj({});
            const lastYearData = res.data.filter((el) => {
                let elDate = new Date(el.date);
                return elDate - date > -31536000000;
            });
            lastYearData.forEach((el) => {
                let elD = new Date(el.date);
                let month = elD.toString().substring(4, 7);
                return (obj[month] = (obj[month] || 0) + el.dailySale);
            });
            setFin(obj);
        });
    }, []);

    return (
        <Box m={3}>
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
                {`Metricas de    `}
                <Flex display="inline-flex" fontWeight="bold">
                    {restaurant.name}
                </Flex>
            </Heading>
            <Text color="gray" fontSize="sm">
                Ganancias del dia
            </Text>
            <Text fontWeight="bold" fontSize="2xl">
                {metrics[0] ? metrics.pop().dailySale : null}
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
                        <ChartAdmin actualData={fin} />
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
            </Grid>
        </Box>
    );
};
