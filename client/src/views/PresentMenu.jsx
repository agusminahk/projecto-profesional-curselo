import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Image,
  SearchIcon,
  Heading,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Text,
  Stack,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, Search2Icon } from "@chakra-ui/icons";

//components

import { CardMenu } from "../components/menu/CardMenu";
import { GridMenu } from "../components/menu/GridMenu";
import { HeaderMenu } from "../components/menu/HeaderMenu";
import { Footer } from "../components/menu/Footer";

export function PresentMenu() {
  const bg = useColorModeValue("gray.800", "white");

  return (
    <Box bg={bg}>
      <HeaderMenu />
      <GridMenu />
      <Footer />
    </Box>
  );
}
