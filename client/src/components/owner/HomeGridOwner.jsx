import React from "react";
import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { HomeCard, HomeCardClose } from "../HomeCard";
import { GraphCard } from "../GraphCard";

export const HomeGridOwner = () => {
    return (
        <>
            <SimpleGrid minChildWidth="150px" m="20px" spacing={10}>
                <HomeCard mensaje="Editar staff" url="/admin/empleados" />
                <HomeCard mensaje="Editar menu" url="/admin/personalizar" />
                <HomeCard mensaje="Metricas" url="/admin/metricas" />
                <HomeCard mensaje="Settings" url="/admin/ajustes" />
                <HomeCard mensaje="Editar categorias" url="/admin/categories" />
                <HomeCard mensaje="Crear QR" url="/admin/codigo" />
                <HomeCard mensaje="Confirmar Ordenes" url="/admin/confirm-order" />
                <HomeCard mensaje="Cocina" url="/admin/cocina" />
                <HomeCardClose mensaje="Realizar cierre diario" url="/admin/metricas" />
            </SimpleGrid>
        </>
    );
};
