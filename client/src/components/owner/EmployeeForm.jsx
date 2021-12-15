import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../state/restaurantSlice";
import { useToast } from "@chakra-ui/react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";

export const EmployeeForm = ({ editing, employee, createRow, close }) => {
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  const users = useSelector((state) => state.restaurant.users);
  const { firstname, lastname, role, telephone, email } = employee;
  const [firstNameStaff, setFirstName] = useState(firstname);
  const [lastNameStaff, setLastName] = useState(lastname);
  const [rolStaff, setRole] = useState(role);
  const [tel, setTel] = useState(telephone);
  const [emailStaff, setEmail] = useState(email);
  const [passwordStaff, setPass] = useState("");
  const toast = useToast();
  const dispatch = useDispatch();
  const handleSubmit = (str) => {
    const obj = {
      firstname: firstNameStaff,
      lastname: lastNameStaff,
      email: emailStaff,
      role: rolStaff,
      restaurantId: restaurant._id,
      telephone: tel,
      password: passwordStaff,
    };

    axios({
      method: str,
      url: employee?.email
        ? `/api/admin/staff/${employee._id}`
        : `/api/auth/register`,
      data: obj,
    }).then((res) => {
      if (str === "post") dispatch(setUsers([...users, res.data.user]));
      else {
        const newUsers = users.filter((el) => el._id !== employee._id);
        str === "put"
          ? dispatch(setUsers([...newUsers, res.data]))
          : dispatch(setUsers([...newUsers]));
      }
      toast({
        title: `Usuario ${
          str === "post" ? "agregado" : str === "put" ? "editado" : "eliminado"
        } con exito`,
        status: "success",
        isClosable: true,
      });
      close();
    });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={0} mx={"auto"} w={"xl"} py={0} px={6}>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")}>
          <Stack spacing={4}>
            <FormControl id="firstname">
              <FormLabel>Nombre </FormLabel>
              <Input
                variant="filled"
                _hover={editing ? null : { backgroundColor: "gray.100" }}
                _disabled={{ opacity: "1" }}
                defaultValue={firstname}
                type="text"
                disabled={!editing}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>Apellido </FormLabel>
              <Input
                variant="filled"
                _hover={editing ? null : { backgroundColor: "gray.100" }}
                _disabled={{ opacity: "1" }}
                defaultValue={lastname}
                type="text"
                disabled={!editing}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email </FormLabel>
              <Input
                variant="filled"
                _hover={editing ? null : { backgroundColor: "gray.100" }}
                _disabled={{ opacity: "1" }}
                defaultValue={email}
                type="email"
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Telefono</FormLabel>
              <Input
                variant="filled"
                _hover={editing ? null : { backgroundColor: "gray.100" }}
                _disabled={{ opacity: "1" }}
                defaultValue={telephone}
                type="text"
                disabled={!editing}
                onChange={(e) => setTel(e.target.value)}
              />
            </FormControl>
            <FormControl id="rol">
              <FormLabel>Rol</FormLabel>
              <Select
                variant="filled"
                _hover={editing ? null : { backgroundColor: "gray.100" }}
                _disabled={{ opacity: "1" }}
                defaultValue={employee.email ? role : "Seleccione un rol"}
                disabled={!editing}
                onChange={(e) => setRole(e.target.value)}
                icon={editing ? "c" : false}
              >
                <option value="Admin">Admin</option>
                <option value="Cocina">Cocina</option>
                <option value="Caja">Caja</option>
                <option value="Salon">Salon</option>
              </Select>
            </FormControl>
            {createRow ? (
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  variant="filled"
                  value={passwordStaff}
                  type="password"
                  disabled={!editing}
                  onChange={(e) => setPass(e.target.value)}
                />
              </FormControl>
            ) : null}
            <Stack spacing={10} mt="20px">
              {employee.email && !editing ? null : employee.email ? (
                <>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => handleSubmit("put")}
                  >
                    Actualizar
                  </Button>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    _hover={{
                      bgColor: "red.500",
                    }}
                    onClick={() => handleSubmit("delete")}
                  >
                    Eliminar
                  </Button>
                </>
              ) : (
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => handleSubmit("post")}
                >
                  Crear
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
