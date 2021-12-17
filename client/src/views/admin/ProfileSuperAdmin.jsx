import React, {useState} from 'react'
import {useSelector} from "react-redux"
import {
    Box,
    useColorModeValue,
    SimpleGrid,
    GridItem,
    Heading,
    Stack,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    InputGroup,
    FormErrorMessage
  } from "@chakra-ui/react";
  import { useFormik } from "formik";
  import axios from "axios";


export const ProfileSuperAdmin =() => {

    const user = useSelector((state) => state.user.user)

    const validate = (values) => {
        const errors = {};
        if (!values.firstname) errors.firstname = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.firstname)) errors.firstname = "Ingrese solo letras y números";
        if (!values.lastname) errors.lastname = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.lastname)) errors.lastname = "Ingrese solo letras y números";
        if (!values.email) errors.email = "Required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = "Email invalido";
        return errors;
    };
      
    
      const formik = useFormik({
        initialValues: {
          firstname: user?.firstname || "",
          lastname: user?.lastname || "",
          email: user?.email || "",
          telephone: user?.telephone || "",
        },
        validate,
        onSubmit: (values) => {
           /*  axios({
              method: "put",
              url: ``,
              data: {
                "firstname": values.firstname,
                "lastname":values.lastname,
                "email": values.email,
                "telephone": values.telephone,
              }
            })
            .then(({data}) => console.log(data)); */
        }
        });

    return (
        <Box mt={[10, 0]}>
        <SimpleGrid display={{ base: "initial", md: "grid" }} columns={{ md: 3 }} spacing={{ md: 6 }}>
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6" ml="15px">
                Informacion Personal
              </Heading>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <form
              onSubmit={formik.handleSubmit}
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4} py={5} p={[null, 6]} bg={useColorModeValue("white", "gray.700")} spacing={6}>
                <SimpleGrid columns={6} spacing={6}>
                  <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={formik.errors.firstname && formik.touched.firstname}>
                    <FormLabel htmlFor="name" fontSize="sm" fontWeight="md" color={useColorModeValue("gray.700", "gray.50")} >
                      Nombre 
                    </FormLabel>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="given-name"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
                    </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={6}
                    isInvalid={formik.errors.lastname && formik.touched.lastname}
                  >
                    <FormLabel
                      htmlFor="lastname"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Apellido
                    </FormLabel>
                    <Input
                      type="text"
                      name="lastname"
                      id="lastname"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                    />
                    <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    as={GridItem}
                    colSpan={[3, 2]}
                    isInvalid={formik.errors.email}
                  >
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email de atencion al cliente
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        type="email"
                        name="email"
                        placeholder="ejemplo@gmail.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <FormHelperText>
                        {formik.errors.email ? formik.errors.email : null}
                      </FormHelperText>
                    </InputGroup>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Telefono publico del restaurante
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        type="telephone"
                        name="telephone"
                        placeholder="+54 3492 685742"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
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
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  bgColor={formik.isValid ? "green.300" : "gray.300"}
                >
                  Guardar
                </Button>
              </Box>
            </form>
          </GridItem>
        </SimpleGrid>
      </Box>
    ) 
}