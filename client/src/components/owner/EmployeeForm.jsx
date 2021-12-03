import React from "react"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Select
  } from "@chakra-ui/react";

export const EmployeeForm = ({ editing, employee, createRow }) => {
    
    return (
        <Flex align={"center"} justify={"center"}>
          <Stack spacing={0} mx={"auto"} w={"xl"} py={0} px={6}>
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
              <Stack spacing={4}>
                <FormControl id="firstname">
                  <FormLabel>Nombre </FormLabel>
                  <Input variant="filled" _hover={editing ? null : {backgroundColor: "gray.100"}} _disabled={{opacity: "1"}} defaultValue={employee.firstName} type="text" disabled={!editing}/>
                </FormControl>
                <FormControl id="lastname">
                  <FormLabel>Apellido </FormLabel>
                  <Input variant="filled" _hover={editing ? null : {backgroundColor: "gray.100"}} _disabled={{opacity: "1"}} defaultValue={employee.lastName} type="text" disabled={!editing}/>
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email </FormLabel>
                  <Input variant="filled" _hover={editing ? null : {backgroundColor: "gray.100"}} _disabled={{opacity: "1"}} defaultValue={employee.email} type="email" disabled={!editing}/>
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Telefono</FormLabel>
                  <Input variant="filled" _hover={editing ? null : {backgroundColor: "gray.100"}} _disabled={{opacity: "1"}} defaultValue={employee.telephone} type="text" disabled={!editing}/>
                </FormControl>  
                <FormControl id="rol">
                  <FormLabel>Rol</FormLabel>
                  <Select 
                    variant="filled" 
                    _hover={editing ? null : {backgroundColor: "gray.100"}} _disabled={{opacity: "1"}} 
                    defaultValue={employee.email ? employee.rol : "Seleccione un rol"} 
                    disabled={!editing}
                    icon={editing ? "c" : false}>
                      <option value="Admin">Admin</option>
                      <option value="Cocina">Cocina</option>
                      <option value="Caja">Caja</option>
                      <option value="Salon">Salon</option>
                  </Select>
                </FormControl>
                {
                    createRow ? (
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input variant="filled" defaultValue={employee.rol} type="password" disabled={!editing}/>
                        </FormControl>
                    ) : null
                }
                <Stack spacing={10} mt="20px">
                    {
                        employee.email && !editing ? null : 
                        employee.email ? (
                            <Button
                            bg={"blue.400"}
                            color={"white"}
                            _hover={{
                            bg: "blue.500",
                            }}
                            >
                                Actualizar
                            </Button>
                        ) : <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                        bg: "blue.500",
                        }}
                        >
                            Crear
                        </Button>
                    }
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
    )
}