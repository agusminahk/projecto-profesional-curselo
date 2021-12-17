import { Text, Box, Flex, SimpleGrid, Grid, GridItem, Image, Divider, Button } from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";
import { addProduct } from "../../utils/localStorage";

export const SubCategoryGrid = ({ products, table }) => {
    return (
        <>
            <Text ml={2} fontSize="2xl">
                {products[0].subcategory === "_null" || products[0].subcategory === "" ? null : products[0].subcategory}
            </Text>
            <Divider />
            <Grid mt={2} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}>
                {products.map((item, i) => {
                    return (
                        <GridItem colSpan={1} mt={2}>
                            <Flex w="full" bg="gray.200" key={i} borderRadius="10px" mb="2px">
                                <SimpleGrid
                                    borderRadius="10px"
                                    spacingY={3}
                                    w={{ base: "60%", md: "70%" }}
                                    bg="gray.200"
                                    color="blue.900"
                                    display="table-header-group"
                                    textAlign="left"
                                    align="center"
                                    ml="4"
                                >
                                    <Text fontSize="xl" color="black">
                                        {item.name}
                                    </Text>
                                    <Text fontSize="xs" mt="3">
                                        Descripcion: {item.description}
                                    </Text>
                                    <Box display="flex" mt="30%">
                                        <Text width="70%" mt="3" color="black">
                                            $ {item.price}
                                        </Text>
                                        <Button onClick={() => addProduct(item, table)}>
                                            <MdAddShoppingCart size="15px" />
                                        </Button>
                                    </Box>
                                </SimpleGrid>

                                <SimpleGrid w={{ base: 200, md: "40%" }}>
                                    <Image
                                        src={`data:image/png;base64,${
                                            item?.img?.data && Buffer.from(item.img.data.data, " ").toString("base64")
                                        }`}
                                        fit="cover"
                                        h={{
                                            base: 40,
                                            md: "28",
                                        }}
                                        pr={1}
                                    />
                                </SimpleGrid>
                            </Flex>
                        </GridItem>
                    );
                })}
            </Grid>
        </>
    );
};
