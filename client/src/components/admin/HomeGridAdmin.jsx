import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HomeCard } from "../HomeCard";
import { GraphCard } from "../GraphCard";

export const HomeGridAdmin = () => {
  return (
    <>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}> 
            <HomeCard mensaje="Añadir usuario" url="/nuevousuario"/>
            <HomeCard mensaje="Clientes" url="/clientes"/>
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
