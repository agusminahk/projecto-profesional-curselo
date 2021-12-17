import React from "react"
import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HomeCard, HomeCardClose } from "../HomeCard";
import { GraphCard } from "../GraphCard";

export const HomeGridOwner = () => {
  return (
    <>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}> 
            <HomeCard mensaje="Editar staff" url="/admin/empleados"/>
            <HomeCard mensaje="Editar menu" url="/admin/personalizar"/>
            <HomeCard mensaje="Metricas" url="/admin/metricas"/>
            <HomeCard mensaje="Settings" url="/admin/ajustes"/>
            <HomeCard mensaje="Editar categorias" url="/admin/categories"/>
            <HomeCardClose mensaje="Realizar cierre diario" url="/admin/metricas"/>
        </SimpleGrid>
        <SimpleGrid minChildWidth="150px" m="20px" mt="40px" spacing={10}>
            <GraphCard />   
            <GraphCard />   
        </SimpleGrid>
    </>
  );
};