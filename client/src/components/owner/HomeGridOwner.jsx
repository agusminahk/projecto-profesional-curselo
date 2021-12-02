import React from "react"
import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HomeCard } from "../HomeCard";
import { GraphCard } from "../GraphCard";

export const HomeGridOwner = () => {
  return (
    <>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}> 
            <HomeCard mensaje="Editar staff" url="/empleados"/>
            <HomeCard mensaje="Editar menu" url="/personalizar"/>
            <HomeCard mensaje="Metricas" url="/metricas"/>
            <HomeCard mensaje="Settings" url="/ajustes"/>
        </SimpleGrid>
        <SimpleGrid minChildWidth="150px" m="20px" mt="40px" spacing={10}>
            <GraphCard />   
            <GraphCard />   
        </SimpleGrid>
    </>
  );
};