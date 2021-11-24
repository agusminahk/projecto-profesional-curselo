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
  } from "@chakra-ui/react";
  
  export const NewClient = () => {
    return (
      <>
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Datos del nuevo cliente</Heading>
            </Stack>
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username </FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email </FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Agregar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </>
    );
  };