import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { CardAdmin } from "./CardAdmin";
import { GraphCard } from "./GraphCard";

export const HomeGridAdmin = () => {
  return (
    <>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}> 
            <CardAdmin mensaje="Añadir usuario"/>
            <CardAdmin mensaje="Clientes"/>
            <CardAdmin mensaje="Metricas"/>
            <CardAdmin mensaje="Settings"/>
        </SimpleGrid>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}>
            <GraphCard />   
            <GraphCard />   
        </SimpleGrid>
    </>
  );
};
