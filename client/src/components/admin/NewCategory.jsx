import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  chakra,
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { useToast } from "@chakra-ui/react";
import { setCategory } from "../../state/categorySlice";

export const NewCategory = ({ categories }) => {
  const toast = useToast();
  const user = useSelector((state) => state.user);
  const [newCateg, setNewCat] = useState("");
  const [errorMens, setErrorMens] = useState([]);
  const [newSubcat, setNewSubcat] = useState([]);
  const dispatch = useDispatch();

  const handleCategory = (value) => {
    if (value.length > 4)
      categories.category.forEach(
        (categ) => categ.name.includes(value) && setErrorMens.push(value)
      );
    setNewCat(value);
  };

  const handleSubcategory = (value) => {
    setNewSubcat(value.split(","));
  };

  const deleteSubCat = (value) => {
    let res = newSubcat.filter((el) => el !== value);
    setNewSubcat(res);
  };

  const handleSubmit = () => {
    axios
      .post("/api/admin/category", {
        name: newCateg,
        restaurantId: user.user.restaurantId,
        subcategory: newSubcat,
      })
      .then((res) => {
        dispatch(setCategory(res.data.categoriesId));
        toast({
          title: `Categoria y subcategoria/s agregada/s correctamente`,
          status: "success",
          isClosable: true,
        });
        setNewCat("");
        setNewSubcat([]);
      });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.50", "inherit")} p={10}>
        <Box>
          <SimpleGrid
            display={{ base: "initial", md: "grid" }}
            columns={{ md: 1 }}
            spacing={{ md: 6 }}
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]}>
                <Heading fontSize="2xl" fontWeight="md" lineHeight="6">
                  Editar categorias
                </Heading>
                <Text
                  mt={1}
                  fontSize={{ base: "sm", md: "md" }}
                  color={useColorModeValue("gray.600", "gray.400")}
                >
                  Cada categoria tiene sus propias subcategrias, cada producto
                  tiene una categoria y muchas subcategorias. El cliente podra
                  buscar por producto, categoria o subcategoria.
                </Text>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>

        <Box mt={[6, 0]}>
          <SimpleGrid
            display={{ base: "initial", md: "grid" }}
            columns={{ md: 2 }}
            spacing={{ md: 6 }}
          >
            <GridItem mt={[5, null, 0]} colSpan={{ base: 6, md: 2 }}>
              <chakra.form
                shadow="base"
                rounded={[null, "md"]}
                overflow={{ sm: "hidden" }}
              >
                <Stack
                  px={4}
                  py={5}
                  p={[null, 6]}
                  bg={useColorModeValue("white", "gray.700")}
                  spacing={6}
                >
                  <SimpleGrid columns={6} spacing={6}>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="md"
                        fontWeight="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                        mt="28px"
                      >
                        Categoria:
                      </FormLabel>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        value={newCateg}
                        onChange={(e) => handleCategory(e.target.value)}
                      />
                      <FormErrorMessage>
                        {errorMens.length
                          ? `La/s categoria/s ${errorMens.toString()} ya existen, desea guardarla/s`
                          : null}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl as={GridItem} colSpan={[6, 3]}>
                      <FormLabel
                        htmlFor="first_name"
                        fontSize="md"
                        fontWeight="md"
                        color={useColorModeValue("gray.700", "gray.50")}
                      >
                        Subcategorias:
                      </FormLabel>
                      <chakra.p fontSize="xs" mb="10px">
                        Escriba las categorias separadas por una coma
                      </chakra.p>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        autoComplete="given-name"
                        mt={1}
                        focusBorderColor="brand.400"
                        shadow="sm"
                        size="sm"
                        w="full"
                        rounded="md"
                        value={newSubcat}
                        onChange={(e) => handleSubcategory(e.target.value)}
                      />
                      <Box w="full">
                        {newSubcat.map((subcat, i) => (
                          <Button
                            m="3px"
                            key={i}
                            h="30px"
                            value={subcat}
                            onClick={(e) => deleteSubCat(e.target.value)}
                          >
                            {subcat} {<IoMdClose />}
                          </Button>
                        ))}
                      </Box>
                    </FormControl>
                  </SimpleGrid>
                </Stack>
                <Box
                  px={{ base: 4, sm: 6 }}
                  py={3}
                  bg={useColorModeValue("gray.50", "gray.900")}
                  textAlign="right"
                >
                  <Button
                    onClick={() => handleSubmit()}
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                    bgColor={newCateg ? "green.300":"grey.300"}
                  >
                    Guardar
                  </Button>
                </Box>
              </chakra.form>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};
