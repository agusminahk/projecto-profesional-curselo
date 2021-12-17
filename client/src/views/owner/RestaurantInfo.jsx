import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../state/userSlice";
import { setRestaurant } from "../../state/restaurantSlice";
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
    Button,
    Select,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useFormik } from "formik";

export const RestaurantInfo = ({ restaurant }) => {
    // const restaurant = useSelector((state) => state.restaurant.restaurant);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = {};
        if (!values.name) errors.name = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.name)) errors.name = "Ingrese solo letras y números";
        if (!values.country) errors.country = "Campo requerido";
        if (!values.direction) errors.direction = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.direction)) errors.direction = "Ingrese solo letras y números";
        if (!values.city) errors.city = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.city)) errors.city = "Ingrese solo letras y números";
        if (!values.province) errors.province = "Campo requerido";
        else if (/[!"#$%&'()+,-./:;<=>?@[\]^_`{|}~]/.test(values.province)) errors.province = "Ingrese solo letras y números";
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: restaurant?.name || "",
            country: restaurant?.location?.country || "",
            direction: restaurant?.location?.direction || "",
            city: restaurant?.location?.city || "",
            province: restaurant?.location?.province || "",
        },
        validate,
        onSubmit: (values) => {
            axios({
                method: `${user.restaurantId ? "put" : "post"}`,
                url: `/api/admin/restaurant${user.restaurantId ? `/${user.restaurantId}` : ""}`,
                data: {
                    name: values.name,
                    location: {
                        country: values.country,
                        province: values.province,
                        city: values.city,
                        direction: values.direction,
                    },
                },
            })
                .then(({ data }) => {
                    // updatear user
                    axios({
                        method: "get",
                        url: "/api/auth/me",
                    })
                        .then(({ data }) => dispatch(setUser(data)))
                        .catch(console.log);
                    // updatear restaurant
                    dispatch(setRestaurant(data));
                })
                .catch(console.log);
        },
    });

    return (
        <Box mt={[10, 0]}>
            <SimpleGrid display={{ base: "initial", md: "grid" }} columns={{ md: 3 }} spacing={{ md: 6 }}>
                <GridItem colSpan={{ md: 1 }}>
                    <Box px={[4, 0]}>
                        <Heading fontSize="lg" fontWeight="medium" lineHeight="6">
                            Informacion Restaurant
                        </Heading>
                    </Box>
                </GridItem>
                <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
                    <form onSubmit={formik.handleSubmit} shadow="base" rounded={[null, "md"]} overflow={{ sm: "hidden" }}>
                        <Stack px={4} py={5} p={[null, 6]} bg={useColorModeValue("white", "gray.700")} spacing={6}>
                            <SimpleGrid columns={6} spacing={6}>
                                <FormControl as={GridItem} colSpan={[6, 3]} isInvalid={formik.errors.name && formik.touched.name}>
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
                                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    as={GridItem}
                                    colSpan={[6, 3]}
                                    isInvalid={formik.errors.country && formik.touched.country}
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
                                    <FormErrorMessage>{formik.errors.country}</FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    as={GridItem}
                                    colSpan={6}
                                    isInvalid={formik.errors.direction && formik.touched.direction}
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
                                    <FormErrorMessage>{formik.errors.direction}</FormErrorMessage>
                                </FormControl>

                                <FormControl
                                    as={GridItem}
                                    colSpan={[6, 6, null, 2]}
                                    isInvalid={formik.errors.city && formik.touched.city}
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
                                    <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                                </FormControl>
                                <FormControl
                                    as={GridItem}
                                    colSpan={[6, 3, null, 2]}
                                    isInvalid={formik.errors.province && formik.touched.province}
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
                                    <FormErrorMessage>{formik.errors.province}</FormErrorMessage>
                                </FormControl>
                            </SimpleGrid>
                        </Stack>
                        <Box px={{ base: 4, sm: 6 }} py={3} bg={useColorModeValue("gray.50", "gray.900")} textAlign="right">
                            <Button type="submit" colorScheme="blue" _focus={{ shadow: "" }} fontWeight="md">
                                {user.restaurantId ? "Guardar" : "Crear"}
                            </Button>
                        </Box>
                    </form>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
};
