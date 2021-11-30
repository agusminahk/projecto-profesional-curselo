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
    FormErrorMessage
  } from "@chakra-ui/react";
import React from 'react';
import { useFormik } from 'formik';

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: values => {
            const errors = {}
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            }
            return errors
        },
        onSubmit: values => console.log(values)
    })

    return <>
    <Flex minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form
                onSubmit={formik.handleSubmit}
            >
                <FormControl id="email" isInvalid={formik.errors.email && formik.touched.email}>
                    <FormLabel>Email </FormLabel>
                    <Input 
                        id="email"
                        name="email"
                        {...formik.getFieldProps("email")}
                        type="email" />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={formik.errors.password && formik.touched.password}>
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
                        Login
                    </Button>
                </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    );
  </>
}