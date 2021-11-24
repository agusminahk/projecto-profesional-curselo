import React from "react";
import {
  Box,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"

export const CardAdmin = ({ mensaje, url }) => {
  return (
      <Link to={url}>
        <Box
          borderWidth="2px"
          borderRadius="3px"
          borderColor="#999"
          minWidth="150px" 
          minHeight="150px" 
          >
            <Image src="https://cdn.pixabay.com/photo/2018/05/01/15/06/user-3365840_960_720.png"/>
            <Box fontWeight="bold">
              {mensaje}
            </Box>
        </Box>
      </Link>
  );
};
/*
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={0}
      w="full"
      h="200px"
      mt="40px"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="xs"
        bg={useColorModeValue("white", "gray.800")}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        mx="auto"
      >
        <Image
          w="full"
          
          objectFit="cover"
          fit="cover"
          src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="avatar"
        />

        <Box py={5} textAlign="center">
          <Link
            
            display="block"
            fontSize="2xl"
            color={useColorModeValue("gray.800", "white")}
            fontWeight="bold"
          >
            John Doe
          </Link>
          <chakra.span
            fontSize="sm"
            color={useColorModeValue("gray.700", "gray.200")}
          >
            Software Engineer
          </chakra.span>
        </Box>
      </Box>
    </Flex>
*/