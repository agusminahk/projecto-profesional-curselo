import React from "react";
import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HomeCard } from "../HomeCard";
import { GraphCard } from "../GraphCard";

export const HomeGridAdmin = () => {
    return (
        <>
            <SimpleGrid minChildWidth="150px" m="20px" spacing={10}>
                <HomeCard mensaje="Confirmaciones pendientes" url="/admin/restaurants" />
                <HomeCard mensaje="Clientes" url="/admin/clientes" />
                <HomeCard mensaje="Metricas" url="/admin/metricas" />
                <HomeCard mensaje="Settings" url="/admin/ajustes" />
            </SimpleGrid>
        </>
    );
};
