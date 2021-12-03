import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
  useDisclosure,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";

export const CardMenu = ({ imagen, nombre }) => {
  return (
    <Flex
      display="flex"
      bg={useColorModeValue("#F9FAFB", "white")}
      p={2}
      w={["full", "30vw"]}
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="xs"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          _hover={{
            opacity: "0.7",
          }}
          w="full"
          h="full"
          fit="cover"
          src={imagen}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link display="block" color={useColorModeValue("gray.800", "white")} fontWeight="bold">
            {nombre}
          </Link>
          <chakra.span fontSize="sm" color={useColorModeValue("gray.700", "gray.200")}></chakra.span>
        </Box>
      </Box>
    </Flex>
  );
};
