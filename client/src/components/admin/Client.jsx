import {
    Tr,
    Th,
    Image,
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
    Checkbox
  } from "@chakra-ui/react";

export const Client = ({ client }) => {
    const { name, status, country } = client
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(client)
    return (
        <>
            <Tr onClick={onOpen}>
                <Th>
                    <Image maxH="30px" src="https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png"></Image>
                </Th>
                <Th>{name}</Th>
                <Th>{status}</Th>
                <Th>{country}</Th>
            </Tr>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Image maxH="60px" src="https://paseolibertad.com.ar/wp-content/uploads/2020/07/BURGER-KING.png"></Image>
                <br />
                <UnorderedList>
                    <ListItem>Email: email@mail.com</ListItem>
                    <ListItem>Telefono: +54 3815796366</ListItem>
                    <ListItem>Pais: Argentina</ListItem>
                    <ListItem>Provincia: Tucuman</ListItem>
                    <ListItem>Dirección: Santa Fe 1980</ListItem>
                    <ListItem>Codigo postal: 4000</ListItem>
                    <ListItem>Activo / inactivo: <Checkbox defaultChecked={client.status == "active"}>status</Checkbox></ListItem>
                </UnorderedList>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}