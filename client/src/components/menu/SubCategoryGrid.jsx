import {
    Text,
    Box,
    Button,
    Flex,
    Input,
    SimpleGrid,
    useColorModeValue,
    chakra,
    Grid, 
    GridItem,
    Image,
    Divider
  } from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";


export const SubCategoryGrid = ({ products }) => {
    return (
        <>
            { console.log(products) }
            { console.log(products[0].subcategoria) }
            <Text fontSize="2xl" >
                { products[0].subcategory === "_null" || products[0].subcategory === "" ? null : products[0].subcategory }
            </Text>
            <Divider />
            <Grid mt={2} templateColumns={{base:'repeat(1, 1fr)', md:'repeat(3, 1fr)', lg:'repeat(5, 1fr)'}} >
            {
                products.map(
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
                                bg="gray.200"
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
                                  src={"https://t2.rg.ltmcdn.com/es/images/4/9/8/img_milanesa_de_carne_11894_orig.jpg"}
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
    )
}