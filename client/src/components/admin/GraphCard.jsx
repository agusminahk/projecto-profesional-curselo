import React from "react";
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

export const GraphCard = () => {
    return (<Box
      boxShadow="md" p="6" rounded="md"
      minWidth="150px" 
      minHeight="150px"
      _hover={{boxShadow:"2xl"}}
      animation="ease-in-out"
  >
      <Box fontWeight="bold">
        Cardano
      </Box>
      <Box>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/d/db/English_dialects1997.svg"/>
      </Box>
  </Box>)
}