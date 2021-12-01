import { Heading, Stack } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  useColorModeValue,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

//components

import { CardMenu } from "./CardMenu";
import { CarrouselB } from "./CarrouselB";

import data from "../datos.json";

export const GridMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.800", "white");
  const color = useColorModeValue("white", "gray.800");
  console.log(data);
  return (
    <Box>
      {/* si esta en celi */}
      <Stack display={["flex", "none"]} m="25px">
        <Heading color={color} as="h4" size="lg">
          Cafeteria
        </Heading>
        <CarrouselB cards={data} />
        <Heading color={color} as="h4" size="lg">
          Postres
        </Heading>
        <CarrouselB cards={data} />
      </Stack>
      {/* si esta en web */}
      <Stack display={{ base: "none", md: "unset" }}>
        <SimpleGrid columns={[2, 3]} spacingY={5} spacingX={1}>
          {data.map((e) => {
            console.log(e);
            return (
              <Box onClick={onOpen}>
                <CardMenu imagen={e.imagen} nombre={e.name} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Stack>

      <Box></Box>
    </Box>
  );
};
