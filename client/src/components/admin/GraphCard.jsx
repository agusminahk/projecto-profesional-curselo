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
    borderWidth="1px" 
  >
      <Box fontWeight="bold">
        Cardano
      </Box>
      <Box>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/d/db/English_dialects1997.svg"/>
      </Box>
  </Box>)
}