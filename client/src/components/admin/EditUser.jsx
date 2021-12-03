import React from "react"
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Box,
  Divider,
} from "@chakra-ui/react";
import "./editUser.css";

export function EditUser() {
  return (
    <Stack className="mobile" color="black" w="70vw" direction={{ base: "column", md: "row" }}>
      <Flex p={6} flex={1} align={"center"} justify="space-around">
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Editar Perfil</Heading>
          <FormControl id="email">
            <FormLabel>Email </FormLabel>
            <Input borderWidth="-moz-initial" borderColor="black" type="email" />
          </FormControl>

          <FormControl id="nombre">
            <FormLabel>Nombre</FormLabel>
            <Input borderWidth="-moz-initial" borderColor="black" type="nombre" />
          </FormControl>

          <FormControl id="apellido">
            <FormLabel>Apellido</FormLabel>
            <Input borderWidth="-moz-initial" borderColor="black" type="apellido" />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            ></Stack>
            <Button colorScheme={"blue"} variant={"solid"}>
              Cargar datos
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex display="flex" flexDirection="column" alignItems="center">
        <Box
          flexDirection="column"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
          marginBottom="25px"
        >
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw40RqD54BYg7g04mBOm0f2k24h2hhn8-gg&usqp=CAU"
            }
          />

          <Button
            _hover={{
              bg: "blackAlpha.300",
              color: "blue.600",
            }}
            color="blue.600"
            border="1px"
            borderColor="black"
          >
            Editar
          </Button>
        </Box>
      </Flex>
    </Stack>
  );
}
