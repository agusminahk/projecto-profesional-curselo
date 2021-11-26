import React from "react";
import {
  Box,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"

export const HomeCard = ({ mensaje, url, imgUrl = "https://cdn.pixabay.com/photo/2018/05/01/15/06/user-3365840_960_720.png" }) => {
  return (
      <Link to={url}
      
      >
        <Box
          boxShadow="md" p="6" rounded="md"
          minWidth="150px" 
          minHeight="150px"
          _hover={{boxShadow:"2xl"}}
          animation="ease-in-out"
          backgroundColor="gray.100"
          >
            <Image src={imgUrl}/>
            <Box w="100%" fontWeight="bold" color="#000" mt={3} textAlign="center">
              {mensaje}
            </Box>
        </Box>
      </Link>
  );
};