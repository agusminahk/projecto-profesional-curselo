import React from "react"
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { data } from "./data.json"
import { ListItemText } from '@material-ui/core';
import {
  Text,
  Box,
  Button,
  Flex,
  Input
} from "@chakra-ui/react";

export const ProductsList = () => {
    let dataPorCategorias = {}

    for (let dato of data) {
        // Si existe la categoria
        if (dataPorCategorias[dato.category]) {
            // Si existe la subCategoria
            if (dataPorCategorias[dato.category][dato.subCategory]) {
                dataPorCategorias[dato.category][dato.subCategory] = [...dataPorCategorias[dato.category][dato.subCategory], dato]
            } else {
                // Existe la categoria pero no la sub
                dataPorCategorias[dato.category][dato.subCategory] = [dato]
            }
        } else {
            // No existe ni la categoria ni la sub
            dataPorCategorias[dato.category] = {[dato.subCategory]: [dato]}
        }

        
    }

    const categorias = Object.keys(dataPorCategorias)

    return (
        <>
            <Box align="center" position="fixed" w="100%" mt="-140px" style={{zIndex: 200, backgroundColor: "#FFF"}}>
                <Input type="text" w="70%" mt="20px" placeHolder="Buscar"/>
                <Flex justify="space-between" boxShadow="lg" p={5} display="flex">
                    {
                        categorias.map((categoria) => (
                            <a href={`#${categoria}`}>
                            <Button ml={4}>
                                {categoria}
                            </Button>
                            </a>
                        ))
                    }
                </Flex>
            </Box>
            <Box mt="140px" z-index="1">
                <List p={4}>
                
                    {
                        categorias.map((categoria) => {
                            const subCategorias = Object.keys(dataPorCategorias[categoria])
                            return (
                                <Box ml={3}>
                                    <Text fontSize="5xl" id={categoria}>{categoria}</Text>
                                    <Divider />
                                    {
                                        subCategorias.map((subCategoria) => {
                                            return (
                                                <>
                                                    <Text fontSize="3xl">{subCategoria === "_null" ? null : subCategoria}</Text>
                                                    <Divider />
                                                    {
                                                        dataPorCategorias[categoria][subCategoria].map((item) => (
                                                        <>
                                                            <ListItem>
                                                                <ListItemText>
                                                                    {item.name}
                                                                    <br />
                                                                    ${item.price}
                                                                </ListItemText>
                                                                <hr/>
                                                            </ListItem>
                                                            <Divider component="li" />
                                                        </>
                                                        ))
                                                    }

                                                </>
                                            )
                                        })
                                    }
                                </Box>
                            )
                        })
                    }
                </List>
            </Box>
        </>
    )
}