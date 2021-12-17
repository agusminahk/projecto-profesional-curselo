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
  Grid, GridItem,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux"
import { MdAddShoppingCart } from "react-icons/md";

export const ProductsList = ({categor, subCategor}) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([])
  const [newData, setNewData] = useState([])
  const [searchVal, setSearchVal] = useState("")
  
  let dataPorCategorias = {};
  let categorias;
  let newD;

 useEffect(()=>{
    axios
    .get(`/api/admin/search?type=product&id=${user.user.restaurantId}`)
    .then(res => {setData(res.data); setNewData(res.data)})
  }, [user]) 



  const handleSearch = (value) => {
    setSearchVal(value)
    if(value === "" || value === " ") setNewData(data)
    const searched = data.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
    setNewData(searched)
  }
 

  if (!subCategor && !categor) {newD = newData 
  } else if (subCategor && categor) {newD = newData.filter(dato => dato.subCategory.includes(subCategor))
  } else newD = newData.filter(dato => dato.category === categor)

if (newD.length)  {for (let dato of newD) {
    // Si existe la categoria
    if (dataPorCategorias[dato.category?.name]) {
      // Si existe la subCategoria
      if (dataPorCategorias[dato.category.name][dato.subcategory]) {
        dataPorCategorias[dato.category.name][dato.subcategory] = [
          ...dataPorCategorias[dato.category.name][dato.subcategory],
          dato,
        ];
      } else {
        // Existe la categoria pero no la sub
        dataPorCategorias[dato.category.name][dato.subcategory] = [dato];
      }
    } else {
      // No existe ni la categoria ni la sub
      dataPorCategorias[dato.category?.name] = { [dato.subcategory[0]]: [dato] };
    }
  } }
  
  categorias = Object.keys(dataPorCategorias);

  return (   
    <>
      <Box
        w="full"
        align="center"
        pos="fixed"
        zIndex="2"
        backgroundColor={useColorModeValue("blue.600", "gray.900")}
      >
        <Input type="text" mt="10px" w="70%" placeholder="Buscar" mb={2} value={searchVal} bgColor="blue.50" onChange={(e) => handleSearch(e.target.value)}/>
        <Flex
          pos="fixed"
          justify="space-between"
          boxShadow="lg"
          p={5}
          w="100%"
          backgroundColor={useColorModeValue("blue.600", "gray.900")}
        >
          {categorias.map((categoria, i) => (
            <a  href={`#${categoria}`} key={i} >
              <Button ml={4}>{categoria}</Button>
            </a>
          ))}
        </Flex>
      </Box>
      <Box  w="full" h={{base:"75vh", md:"75vh"}} mt={{base:"30vh", md:"25vh", lg:"20hv"}} position="absolute" overflowY={"scroll"} >
        <List p={4} >
          {categorias.map((categoria, i) => {
            const subCategorias = Object.keys(dataPorCategorias[categoria]);
            return (
              <Box ml={{ base: 4, md: 6, lg: 8 }} mr={{ base: 4, md: 6, lg: 8 }}   >
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
                      <Grid mt={2} templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(5, 1fr)'}} >
                      {dataPorCategorias[categoria][subCategoria].map(
                        (item, i) => (
                          <GridItem colSpan={1} >
                            <Flex
                              w="full"
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

                              <SimpleGrid w={{ base: 100, md: "40%" }}>
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
                          </GridItem>
                        )
                      )}
                        </Grid>
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
