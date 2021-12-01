import React, {useEffect, useState} from 'react';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {
  Text,
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Image,
} from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";
import {data as datas} from "./data.json"

export const ProductsList = ({categor, subCategor}) => {
  const [data, setData] = useState(datas)
  let dataPorCategorias = {};
  let categorias;
  let newD;

  /* useEffect(()=>{
    axios
    .get(`/api/user/search?type=product`)
    .then(res => setData(res.data))
  }, []) */

  if (!subCategor && !categor) {newD = data 
  } else if (subCategor && categor) {newD = data.filter(dato => dato.subCategory.includes(subCategor))
  } else newD = data.filter(dato => dato.category === categor)

  for (let dato of newD) {
    // Si existe la categoria
    if (dataPorCategorias[dato.category]) {
      // Si existe la subCategoria
      if (dataPorCategorias[dato.category][dato.subCategory]) {
        dataPorCategorias[dato.category][dato.subCategory] = [
          ...dataPorCategorias[dato.category][dato.subCategory],
          dato,
        ];
      } else {
        // Existe la categoria pero no la sub
        dataPorCategorias[dato.category][dato.subCategory] = [dato];
      }
    } else {
      // No existe ni la categoria ni la sub
      dataPorCategorias[dato.category] = { [dato.subCategory]: [dato] };
    }
  } 
  
  categorias = Object.keys(dataPorCategorias);

  return (
        
    <>
      <Box
        w="full"
        align="center"
        pos="fixed"
        zIndex="2"
        backgroundColor={useColorModeValue("blue.600", "gray.900")}
        mt="56px"
      >
        <Input type="text" mt="10px" w="70%" placeholder="Buscar" bgColor="blue.50"/>
        <Flex
          pos="fixed"
          justify="space-between"
          boxShadow="lg"
          p={5}
          w="100%"
          backgroundColor={useColorModeValue("blue.600", "gray.900")}
        >
          {categorias.map((categoria, i) => (
            <a  href={`#${categoria}`}  >
              <Button ml={4}>{categoria}</Button>
            </a>
          ))}
        </Flex>
      </Box>
      <Box  ml={{ base: "0", md: "22%" }} h={{base:"77vh", md:"75vh"}} mt={{base:"30vh", md:"25vh"}} position="absolute" overflowY={"scroll"} >
        <List p={4} >
          {categorias.map((categoria, i) => {
            const subCategorias = Object.keys(dataPorCategorias[categoria]);
            return (
              <Box ml={{ base: 4, md: 8 }} mr={{ base: 4, md: 8 }}   >
                <Text fontSize="3xl" id={categoria} >
                  {categoria}
                </Text>
                <Divider />
                {subCategorias.map((subCategoria, i) => {
                  return (
                    <>
                      <Text fontSize="2xl" >
                        {subCategoria === "_null" ? null : subCategoria}
                      </Text>
                      <Divider />
                      {dataPorCategorias[categoria][subCategoria].map(
                        (item, i) => (
                          <>
                            <Flex
                              w={{ base: "full", md: "80%" }}
                              bg="gray.200"
                              key={i}
                              borderRadius="10px"
                              mb="2px"
                            >
                              <SimpleGrid
                                borderRadius="10px"
                                spacingY={3}
                                w={{ base:"60%", md: "70%" }}
                                bg="gray.100"
                                color="blue.900"
                                display="table-header-group"
                                textAlign="left"
                                align="center"
                                ml="4"
                              >
                                <chakra.span>{item.name} </chakra.span>
                                <Text fontSize="xs">{item.description}</Text>
                                <chakra.p> $ {item.price} </chakra.p>
                                <Box
                                  bg="blue.300"
                                  w="25px"
                                  h="25px"
                                  borderRadius="50px"
                                  align="center"
                                >
                                  <Box pt="7px">
                                    <MdAddShoppingCart size="15px" />
                                  </Box>
                                </Box>
                              </SimpleGrid>

                              <SimpleGrid w={{ base: 100, md: "30%" }}>
                                <Image
                                  src={item.image}
                                  fit="cover"
                                  h={{
                                    base: 40,
                                    md: "28",
                                  }} /* onClick={handleCart} */
                                />
                              </SimpleGrid>
                            </Flex>
                          </>
                        )
                      )}
                    </>
                  );
                })}
              </Box>
            );
          })}
        </List>
      </Box>
    </>
  );
};
