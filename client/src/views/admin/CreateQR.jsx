
import React, { useState } from "react";
import { useSelector } from "react-redux"
import {
  chakra,
  Box,
  Button,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Icon,
  Input,
  Image,
} from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import axios from "axios"


export const CreateQR = () => {
const user = useSelector((state) => state.user);
const [settedQr, setSettedQr] = useState('')
const handleQR = () => {
    for (let i = 0; i < settedQr; i++) {
       axios.get(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Table${i}`)
    }
    
}


  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0}>
      <Flex bg="brand.400">
          <Box>
      
        <Image
          src="https://www.cevagraf.coop/blog/wp-content/uploads/2019/04/qr-imprenta-cevagraf.png"
          alt="QR code"
          fit="cover"
          w="full"
          h={{ base: 64, md: "full" }}
          bg="gray.100"
          loading="lazy"
          opacity={0.4}
        />
        <chakra.h3
        textAlign="center"
        fontSize={{ base: "1xl", md: "1xl", lg: "2xl" }}
        fontWeight="bold"
        >Ejemplo de QR</chakra.h3>
        </Box>
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, md: 8, lg: 20 }}
        py={24}
        zIndex={3}
      >
        <chakra.h1
          mb={4}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Generar codigos QR
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          Seleccione la cantidad que necesita, cada codigo va a corresponder a un carrito.
        </chakra.p>
        <Input
        placeholder="Escriba un numero"
        type="number"
        value={settedQr}
        onChange={(e) => setSettedQr(e.target.value)}
        ></Input>
        <Box display="inline-flex" rounded="md" shadow="md">
          <Button
            mt={2}
            py={8}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px={5}
            border="solid transparent"
            fontWeight="bold"
            w="full"
            rounded="md"
            color="black"
            bg={"brand.500"}
            _hover={{
              bg: "brand.700",
            }}
            onClick={() => handleQR()}
          >
            Generar codigos
            <Icon as={FiExternalLink} ml={2} />
          </Button>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

