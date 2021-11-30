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
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "white")}
      p={2}
      w="30vw"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        onClick={onOpen}
        w="xs"
        bg={useColorModeValue("white", "gray.50")}
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
          h="15vw"
          fit="cover"
          src={imagen}
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link display="block" 
          // color={useColorModeValue("gray.800", "white")} 
          fontWeight="bold">
            {nombre}
          </Link>
          <chakra.span fontSize="sm" 
          // color={useColorModeValue("gray.700", "gray.200")}
          >
            $340
          </chakra.span>
        </Box>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent 
            // bg="black"
            >
              <ModalHeader>
                <Heading as="h4" color="white" size="md">
                  {nombre}
                </Heading>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody color="white">
                Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ex nisi repellendus
                quisquam rerum officiis aut aliquid magni rem sit, sed delectus maiores assumenda cupiditate
                tempora itaque nostrum reiciendis commodi.
              </ModalBody>
              <Box ml="2vw">$450</Box>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Flex>
  );
};
