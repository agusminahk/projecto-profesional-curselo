import React, { useState } from "react";
import axios from "axios";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Flex,
  useColorModeValue,
  useDisclosure,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export const CategoriesForm = ({ title, id }) => {
  const toast = useToast();
  const [editSub, setEditSub] = useState(title);
  const [editing, setEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitSubcat = (str) => {
    axios({
      method: `${str}`,
      url: `/api/admin/subcategory/${id}/${title}`,
      data: {
        name: editSub,
      },
    }).then(() => {
      toast({
        title: `${
          str === "delete"
            ? `Subcategoria eliminada con exito`
            : `Subcategoria editada con exito`
        }`,
        status: "success",
        isClosable: true,
      });
      setEditing(false);
      onClose();
    });
  };

  return (
    <Flex>
      <Flex shrink={0}>
        <Icon
          boxSize={5}
          mt={1}
          color={useColorModeValue("brand.500", "brand.300")}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </Icon>
      </Flex>
      <Box ml={1} mb={3}>
        <Input
          disabled={!editing}
          fontSize="lg"
          fontWeight="bold"
          lineHeight="6"
          color={useColorModeValue("gray.900")}
          value={editSub}
          onChange={(e) => setEditSub(e.target.value)}
        ></Input>
        <Box align="right" alignSelf="right">
          <IconButton
            m={1}
            colorScheme="teal"
            w={{ base: "15px", md: "25px" }}
            h={{ base: "38px", md: "30px" }}
            icon={editing ? <CheckIcon /> : <EditIcon />}
            editing={editing}
            value={title}
            onClick={(e) => (editing ? submitSubcat("put") : setEditing(true))}
          />
          <IconButton
            m={1}
            colorScheme="teal"
            aria-label="Call Segun"
            w={{ base: "15px", md: "25px" }}
            h={{ base: "38px", md: "30px" }}
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>Seguro desea borrar esta subcategoria?</ModalBody>
              <ModalCloseButton />
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  No, cerrar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={(e) => submitSubcat("delete")}
                >
                  Si, borrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
    </Flex>
  );
};
