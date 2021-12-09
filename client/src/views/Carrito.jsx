import React from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { ArrowLeftIcon, ChevronLeftIcon, CheckIcon } from "@chakra-ui/icons";
import { useSpring } from "react-spring";
//components
import { ListCarrito } from "../components/ListCarrito";

export const Carrito = () => {
  const bg = useColorModeValue("gray.800", "white");
  const color = useColorModeValue("white", "black");

  return (
    <Box h="100vh ">

      <Flex
        bg={bg}
        h="full"
        color={color}
        display={["flex"]}
        alignItems={{base:"center", md:"left"}}
        flexDirection="column"
        position="relative" 
      >
        <Box
          color={color}
          w="full"
          h="50px"
          display="flex"
          justifyContent="space-between"
          alignItems={{base:"center", md:"left"}}
          borderBottom="1px"
        >
          <a href="javascript:history.back()">
            <ChevronLeftIcon w={8} h={8} />
          </a>

          <Heading color={color} mr="10px" size="lg">
            $2500
          </Heading>
        </Box>
        <Heading mt="10px" mb="10px" color={color}>
          Tu Pedido
        </Heading>
        <ListCarrito />
        <Box w="full" mt="25px" mb="25px" maxH="65vh" minH="15vh" display="flex" justifyContent="center">
          <Heading>Total:$2500</Heading>
        </Box>
        <Box bg="green.300" width="full" display="fixed" h="65px" justifyContent="center" alignItems="center">
          <Text>Confirmar Pedido</Text>

          <CheckIcon ml="5px" mb="4px" />
        </Box>
      </Flex>
      <Flex display={["none", "flex"]}></Flex>
    </Box>
  );
};
