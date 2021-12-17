import React, {useState} from "react";
import {
  Tr,
  Th,
  Image,
  Box,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Button,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  UnorderedList,
  ListItem,
  Checkbox,
  useToast
} from "@chakra-ui/react";
import axios from "axios";

export const Client = ({ client, setClients, clients }) => {
  const { name, state, logo, email, telephone, location, _id } = client;
const [newState, setNewState] = useState(state)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  let logoClient = logo?.data
    ? `data:image/jpeg;base64,${Buffer.from(logo?.data.data, " ").toString(
        "base64"
      )}`
    : "";

  const handleClient = (str) => {
    axios({
      method: str,
      url: `/api/superAdmin/${
        str === "put" && state
          ? "disable"
          : str === "delete"
          ? "delete"
          : "enable"
      }/${_id}`,
    }).then((res) => {
        let index;
       let updatedClients = clients.filter((el, i) => {
           if (el._id === _id) index = i
           return(el._id !== _id)})
       if (str === "put"){
            updatedClients[index] = res.data
            setClients(updatedClients)
            setNewState(!newState)
        }
       else {
           setClients(updatedClients)
           onClose()
           toast({
            title: `Usuario eliminado con exito`,
            status: "success",
            isClosable: true,
           })
        }

    });
  };

  return (
    <>
      <Tr onClick={onOpen}>
        <Th>
          <Image maxH="30px" src={logoClient} rounded="full"></Image>
        </Th>
        <Th>{name}</Th>
        <Th display={["none", "table-cell", "table-cell"]}>
          {location.country}
        </Th>
        <Th display={["none", "none", "table-cell"]}>{newState? "Activado": "Desactivado"}</Th>
      </Tr>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image maxH="60px" src={logoClient}></Image>
            <br />
            <UnorderedList>
              <ListItem>Email: {email}</ListItem>
              <ListItem>Telefono: {telephone}</ListItem>
              <ListItem>Pais: {location.country}</ListItem>
              <ListItem>Provincia: {location.province}</ListItem>
              <ListItem>Dirección: {location.direction}</ListItem>
              <ListItem>
                <Box bgColor={newState ? "green.400" : "gray.400"}>
                  {newState ? "Activo" : "Inactivo"}
                </Box>
              </ListItem>
              <ListItem>
                <Button
                  colorScheme="blue"
                  display="let"
                  size="sm"
                  onClick={() => handleClient("put")}
                >
                  {newState ? "Desactivar" : "Activar"}
                </Button>
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => handleClient("delete")}
            >
              Eliminar
            </Button>

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
