import React from "react";
import {useSelector} from "react-redux"
import {
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom"
import axios from "axios"

export const HomeCard = ({ mensaje, url, imgUrl = "https://cdn.pixabay.com/photo/2018/05/01/15/06/user-3365840_960_720.png" }) => {
  return (
      <Link to={url} >
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

export const HomeCardClose = ({ mensaje, url, imgUrl = "https://cdn.pixabay.com/photo/2018/05/01/15/06/user-3365840_960_720.png" }) => {
const restaurant = useSelector((state) => state.restaurant.restaurant)
const handleSubmit = () => {
axios.post(`/api/admin/confirm/dailyClosing?id=${restaurant._id}`).then(()=> console.log("FUNCIONA"))
}
const { isOpen, onOpen, onClose } = useDisclosure()

return (
      <>
        <Box
          onClick={onOpen}
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
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Desea relizar el cierre diario?
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No, cerrar
            </Button>
            <Button colorScheme='green' onClick={() => handleSubmit()} > <Link to={url}>Si</Link> </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  );
};
