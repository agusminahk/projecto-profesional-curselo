import { Box, Flex, Image, Button, useColorModeValue, useDisclosure, Input } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { FaShoppingBasket } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

// component
import { CarrouselCategorias } from "./CarrouselCategorias";
import { CarrouselB } from "./CarrouselB";
export const HeaderMenu = () => {
  const bg = useColorModeValue("gray.800", "white");
  const color = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    heigt: 2,
    width: 1,
  };
  const categorias = ["Cafeteria", "Dulces", "Sandwiches", "Postres", "Licuados", "Tortas"];
  return (
    <Box>
      <Flex
        bg="white"
        /* bg={useColorModeValue("white", "black")} */ position="relative"
        display={["none", "flex"]}
      >
        <Search2Icon position="absolute" />
        <Image
          w="full"
          src="https://blogdestinia.com/wp-content/uploads/2020/10/restaurantes-singulares-curiosos-portada-1170x550.jpg"
        />
      </Flex>
      {/* En celular */}

      <Flex
        bg="white"
        /* bg={useColorModeValue("white", "black")} */ display={["flex", "none"]}
        flexDirection="column"
      >
        <Flex h="8vh" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Search2Icon
            onClick={onOpen}
            color="black"
            /* color={useColorModeValue("black", "white")} */ ml="5vw"
            w={6}
            h={6}
          />
          <Link to="/checkout">
            <Box mr="5vw">
              <FaShoppingBasket color="black" /* color={useColorModeValue("black", "white")} */ size="10vw" />
            </Box>
          </Link>
        </Flex>

        <Image
          w="full"
          src="https://blogdestinia.com/wp-content/uploads/2020/10/restaurantes-singulares-curiosos-portada-1170x550.jpg"
        />
        <Box w="full" borderWidth="1px" borderRadius="md" boxShadow="md" px={0} py={0} color={color}>
          <CarrouselCategorias categorias={categorias} />
        </Box>
      </Flex>
      {/* Modal */}
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg={bg}>
            <ModalHeader>
              <Input border="2px" borderColor="gray.500" color="black" placeholder="Buscar" w="95%" />
            </ModalHeader>
            <ModalCloseButton />

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Buscar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};
