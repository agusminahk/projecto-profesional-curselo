import React, { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { chakra, SimpleGrid, Stat, StatLabel, StatNumber, HStack, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";

function StatsCard({ title, stat, table, id }) {
    const navigate = useNavigate();
    return (
        <Stat
            px={{ base: 4, md: 8 }}
            py={"5"}
            shadow={"xl"}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.800", "gray.500")}
            rounded={"lg"}
        >
            <StatLabel fontWeight={"medium"} isTruncated>
                {title}
            </StatLabel>
            <HStack spacing={10}>
                <StatNumber minW="170px" fontSize={"2xl"} fontWeight={"medium"}>
                    {stat}
                </StatNumber>
                <Button colorScheme="blue" onClick={() => navigate(`/menu/search/category/${title}/${id}/${table}`)}>
                    Buscar
                </Button>
            </HStack>
        </Stat>
    );
}

function Categories() {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const { id, table } = useParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/api/client/search/${id}?type=allCategory`).then(({ data }) => setCategories(data));
    }, []);

    return (
        <Box>
            <NavbarMenu restaurant={restaurant} id={id} table={table} />
            <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    {categories.length > 0 &&
                        categories.map((e) => {
                            console.log(e);
                            return (
                                <StatsCard
                                    table={table}
                                    id={id}
                                    title={e.name}
                                    stat={`${e?.productId?.length || 0} Productos`}
                                />
                            );
                        })}
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export default Categories;
