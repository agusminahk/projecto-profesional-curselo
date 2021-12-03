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
import useRegisterFormik from "../validators/register.validator";

export const Register = () => {
    const formik = useRegisterFormik()

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
                <FormControl id="firstname" isInvalid={formik.errors.firstname && formik.touched.firstname} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input 
                        id="firstname"
                        {...formik.getFieldProps("firstname")}
                        type="text" />
                    <FormErrorMessage>{formik.errors.firstname}</FormErrorMessage>
                </FormControl>
                <FormControl id="lastname" isInvalid={formik.errors.lastname && formik.touched.lastname} isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input 
                        id="lastname"
                        name="lastname"
                        {...formik.getFieldProps("lastname")}
                        type="text" />
                    <FormErrorMessage>{formik.errors.lastname}</FormErrorMessage>
                </FormControl>
                <FormControl id="telephone" isInvalid={formik.errors.telephone && formik.touched.telephone}>
                    <FormLabel>Número de telefono</FormLabel>
                    <InputGroup>
                        <InputLeftAddon children='+' />
                        <Input 
                            id="telephone"
                            name="telephone"
                            type="text"
                            {...formik.getFieldProps("telephone")}
                            />
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.telephone}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={formik.errors.password && formik.touched.password} isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                        autoComplete="new-password"
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