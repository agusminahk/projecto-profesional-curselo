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
      borderWidth="2px"
      borderRadius="3px"
      borderColor="#999"
      minWidth="150px" 
      minHeight="150px" 
  >
      <Box fontWeight="bold">
        Cardano
      </Box>
      <Box>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/d/db/English_dialects1997.svg"/>
      </Box>
  </Box>)
}