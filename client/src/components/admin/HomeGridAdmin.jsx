import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { CardAdmin } from "./CardAdmin";
import { GraphCard } from "./GraphCard";

export const HomeGridAdmin = () => {
  return (
    <>
        <SimpleGrid minChildWidth="150px" m="20px" spacing={10}> 
            <CardAdmin mensaje="Añadir usuario" url="/nuevousuario"/>
            <CardAdmin mensaje="Clientes" url="/clientes"/>
            <CardAdmin mensaje="Metricas" url="/metricas"/>
            <CardAdmin mensaje="Settings" url="/settings"/>
        </SimpleGrid>
        <SimpleGrid minChildWidth="150px" m="20px" mt="40px" spacing={10}>
            <GraphCard />   
            <GraphCard />   
        </SimpleGrid>
    </>
  );
};
