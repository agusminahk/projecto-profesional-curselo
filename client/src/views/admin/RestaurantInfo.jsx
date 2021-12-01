import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  chakra,
  Box,
  useColorModeValue,
  FormHelperText,
  SimpleGrid,
  GridItem,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";

export const RestaurantInfo = () => {
   // const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [direction, setDirection] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
/* 
  useEffect (() => {
    axios
    .get(`api/admin/search?type=restaurant&id=${user.restaurantId}`)
    .then(res => res.data)
    .then(data => {
      setName(data.name)
      setEmail(data.email)
      setCountry(data.location.country)
      setDirection(data.location.direction)
      setCity(data.location.city)
      setProvince(data.location.province)
    })
  }) */
  const validate = (values) => {
    const errors = {};
    if (!values.name || values.name.length > 1) {
      errors.name = "Campo requerido";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email invalido";
    }
    if (!values.country) {
      errors.country = "Campo requerido";
    }
    if (!values.direction) {
      errors.direction = "Campo requerido";
    }
    if (!values.city) {
      errors.city = "Campo requerido";
    }
    if (!values.province) {
      errors.province = "Campo requerido";
    }
    if (!values.codigo) {
      errors.codigo = "Campo requerido";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      email: email,
      country: country,
      direction: direction,
      city: city,
      province: province,
    },
    validate,
    onSubmit: (values) => {
      /*   axios
        .put(`api/admin/restaurant/${user.restaurantId}`, values)
        .then(()=>{
           toast({
        title: `Guardado`,
        status: "success",
        isClosable: true,
      });
        }) */
    },
  });

  const noValUser = /[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/;
  const valEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    return (
        <Box mt={[10, 0]}>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                Informacion Personal
              </Heading>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              onSubmit={formik.handleSubmit}
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
                  <FormControl
                    as={GridItem}
                    colSpan={[6, 3]}
                    isInvalid={noValUser.test(formik.values.name)}
                  >
                    <FormLabel
                      htmlFor="name"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Nombre del restaurante
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
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText color="red">
                      {noValUser.test(formik.values.name)
                        ? "Solo se permiten letras y numeros"
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={[6, 4]}
                    isInvalid={!valEmail.test(formik.values.email) && formik.values.email.length > 2}
                  >
                    <FormLabel
                      htmlFor="email"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email
                    </FormLabel>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="email"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText color="red">
                      {!valEmail.test(formik.values.email) && formik.values.email.length > 2
                        ? "Email invalido"
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={[6, 3]}
                    isInvalid={formik.values.country === ""}
                  >
                    <FormLabel
                      htmlFor="country"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Pais
                    </FormLabel>
                    <Select
                      id="country"
                      name="country"
                      autoComplete="country"
                      placeholder="Select option"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                    >
                      <option>Argentina</option>
                    </Select>
                    <FormHelperText color="red">
                      {formik.values.country === "" ? "Campo requerido" : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={6}
                    isInvalid={noValUser.test(formik.values.direction)}
                  >
                    <FormLabel
                      htmlFor="direction"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Direccion del restaurante
                    </FormLabel>
                    <Input
                      type="text"
                      name="direction"
                      id="direction"
                      autoComplete="street-address"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.direction}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText color="red">
                      {noValUser.test(formik.values.direction)
                        ? "Solo se permiten letras y numeros"
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={[6, 6, null, 2]}
                    isInvalid={noValUser.test(formik.values.city)}
                  >
                    <FormLabel
                      htmlFor="city"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Ciudad
                    </FormLabel>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="city"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText color="red">
                      {noValUser.test(formik.values.city)
                        ? "city invalida"
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <FormControl
                    as={GridItem}
                    colSpan={[6, 3, null, 2]}
                    isInvalid={noValUser.test(formik.values.province)}
                  >
                    <FormLabel
                      htmlFor="province"
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Provincia
                    </FormLabel>
                    <Input
                      type="text"
                      name="province"
                      id="province"
                      autoComplete="state"
                      mt={1}
                      focusBorderColor="brand.400"
                      shadow="sm"
                      size="sm"
                      w="full"
                      rounded="md"
                      value={formik.values.province}
                      onChange={formik.handleChange}
                    />
                    <FormHelperText color="red">
                      {noValUser.test(formik.values.province)
                        ? "Solo se permiten letras y numeros"
                        : null}
                    </FormHelperText>
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
                  bgColor="gray.300"
                >
                  Guardar
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
    )
}