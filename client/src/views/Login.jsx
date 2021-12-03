import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Link as ChakraLink,
    useColorModeValue,
    useToast,
    FormErrorMessage
  } from "@chakra-ui/react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import useLoginFormik from "../validators/login.validator";

export const Login = () => {
    const [error, setError] = useState("")

    const formik = useLoginFormik(setError)

    return <>
    <Flex minH={"100vh"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
        <Stack align={"center"} justify="center">
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <form
                onSubmit={formik.handleSubmit}
            >
                <FormControl id="email" isInvalid={(formik.errors.email && formik.touched.email) || error} isRequired>
                    <FormLabel>Email </FormLabel>
                    <Input 
                        id="email"
                        name="email"
                        {...formik.getFieldProps("email")}
                        type="email" />
                </FormControl>
                <FormControl id="password" isInvalid={(formik.errors.password && formik.touched.password) || error} isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                        id="password"
                        type="password"
                        {...formik.getFieldProps("password")}
                        />
                    <FormErrorMessage>{error}</FormErrorMessage>
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
            <Box>Nuevo? <Link to="/admin/register"><ChakraLink color="teal.500">Registrate</ChakraLink></Link></Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  </>
}