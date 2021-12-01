import React, { useReducer } from "react";
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
  Text,
  useDisclosure,
  Button,
  Input,
  Image,
} from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Heading,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { useState } from "react";

export function ListCarrito() {
  const bg = useColorModeValue("gray.800", "white");
  const color = useColorModeValue("white", "black");
  const header = ["Nombre", "Cantidad", "Valor"];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = [
    { name: "Daggy", cant: 4, total: "$2500" },
    { name: "Daggy", cant: 4, total: "$2500" },
    { name: "Daggy", cant: 4, total: "$2500" },
    { name: "Daggy", cant: 4, total: "$2500" },
  ];

  const [cant, setCant] = useState(0);

  const remove = (dato) => {
    let opcion = "realmente desea eliminar el producto?";
  };
  return (
    <Flex>
      <Table
        bg={bg}
        display={{
          base: "full",
          md: "table",
        }}
      >
        <Thead border="1px" display="flex" alignItems="center" justifyContent="flex-start">
          <Tr>
            {header.map((x) => (
              <Th color={color} p="16px" key={x}>
                {x}
              </Th>
            ))}
          </Tr>
        </Thead>
        {data.map((e) => (
          <Tbody
            display="flex"
            color={color}
            borderBottom="1px"
            borderColor={color}
            justifyContent="space-evenly"
          >
            <Th color={color} mt="10px">
              {e.name}
            </Th>
            <Th color={color} mt="10px">
              {e.cant}
            </Th>
            <Th color={color} mt="10px">
              {e.total}
            </Th>
            <Td>
              <ButtonGroup variant="solid" size="sm" spacing="2px">
                <IconButton onClick={onOpen} colorScheme="green" mr="10px" icon={<AiFillEdit />} />
                <IconButton
                  borderColor="red"
                  color="rgb(255, 0, 0)"
                  variant="outline"
                  icon={<BsFillTrashFill />}
                />
              </ButtonGroup>
            </Td>
          </Tbody>
        ))}
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent color={color} bg={bg}>
          <ModalHeader>
            <Image src="https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_500977_bannerPic_1711.jpg" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack maxW="320px">
              <Button onClick={() => setCant(cant - 1)}>-</Button>
              <Heading>{cant}</Heading>
              <Button onClick={() => setCant(cant + 1)}>+</Button>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="black" bg="green.200" mr={3} onClick={onClose}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
