import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    FormErrorMessage,
    InputLeftAddon,
    InputGroup
  } from "@chakra-ui/react";
import React from 'react';
import { useFormik } from 'formik';

export const Register = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {}
            if (!values.email) errors.email = 'Campo requerido'
            else if (!/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i.test(values.email)) {
                errors.email = 'Direccion de email no valida';
            }
            if (!values.firstName) errors.firstName = 'Campo requerido';
            else if (!/^[A-Za-z ]*$/.test(values.firstName)) errors.firstName = "Ingrese solo letras y espacios"
            if (!values.lastName) errors.lastName = 'Campo requerido';
            else if (!/^[A-Za-z ]*$/.test(values.lastName)) errors.lastName = "Ingrese solo letras y espacios"
            if (!values.password) errors.password = 'Campo requerido';
            else {
                if (!/^.{8,}$/.test(values.password)) errors.password = "Debe ser de 8 de largo"
                else if (!/[a-zA-Z]/.test(values.password)) errors.password = "Debe contener al menos una letra"
                else if (!/\d/.test(values.password)) errors.password = "Debe contener al menos un número"
            }
            if (values.phone !== "" 
                && (
                    !/\(?\+{0,1}[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?$/.test(values.phone)
                    || values.phone.length > 18)
                ) errors.phone = "Número de telefono no valido"
            return errors
        },
        onSubmit: values => {
                        
        }
    })

    return <>
    <Flex minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form
                onSubmit={formik.handleSubmit}
            >
                <FormControl id="email" isInvalid={formik.errors.email && formik.touched.email} isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                        id="email"
                        {...formik.getFieldProps("email")}
                        type="email" />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="firstName" isInvalid={formik.errors.firstName && formik.touched.firstName} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                        id="firstName"
                        {...formik.getFieldProps("firstName")}
                        type="text" />
                    <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl id="lastName" isInvalid={formik.errors.lastName && formik.touched.lastName} isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                        id="lastName"
                        name="lastName"
                        {...formik.getFieldProps("lastName")}
                        type="text" />
                    <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                </FormControl>
                <FormControl id="phone" isInvalid={formik.errors.phone && formik.touched.phone}>
                    <FormLabel>Número de telefono</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='+' />
                        <Input 
                            id="phone"
                            name="phone"
                            type="number"
                            {...formik.getFieldProps("phone")}
                            />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={formik.errors.password && formik.touched.password} isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                        id="password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        />
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                    <br />
                    <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                            bg: "blue.500",
                        }}
                        type="submit"
                        >
                        Register
                    </Button>
                </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  </>
}