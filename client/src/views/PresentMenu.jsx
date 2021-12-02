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
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon, Search2Icon } from "@chakra-ui/icons";
import { CarrouselMenu } from "../components/carrouselMenu";
import { CardMenu } from "../components/CardMenu";

export function PresentMenu() {
  const bg = useColorModeValue("white", "gray.50");
  const mobileNav = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <React.Fragment color="white">
      <chakra.header w="full" shadow="md">
        <Flex alignItems="center" bg="white" justifyContent="space-between" mx="auto">
          <Flex>
            <Box>
              <chakra.header w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
                <Search2Icon
                  onClick={onOpen}
                  _hover={{
                    bg: "blackAlpha.300",
                    color: "blue.600",
                  }}
                />
              </chakra.header>

              <Image
                h="30vw"
                w="100vw"
                src="https://blogdestinia.com/wp-content/uploads/2020/10/restaurantes-singulares-curiosos-portada-1170x550.jpg"
              />
            </Box>
          </Flex>
        </Flex>
      </chakra.header>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Input placeholder="Buscar" w="95%" />
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Buscar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box>
        <Box
          cursor="pointer"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          _checked={{
            bg: "teal.600",
            color: "white",
            borderColor: "teal.600",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          px={5}
          py={3}
        >
          <Button mr="30px">
            Destacados
          </Button>
          <Button>Promociones</Button>
        </Box>

        <Heading ml="5vw" mt="2vw" bg="white" color="black" as="h4" size="lg">
          Destacados
        </Heading>
        <CarrouselMenu />
      </Box>
      <Box bg="white">
        <Heading ml="5vw" mt="2vw" color="black" bg="white" as="h4" size="lg">
          Bebidas
        </Heading>
        <SimpleGrid bg="white " columns={3} spacing="10px">
          <CardMenu
            nombre={"IPA"}
            imagen={
              "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_16422_bannerPic_2587.jpg"
            }
          />
          <CardMenu
            nombre={"Scotch"}
            imagen={
              "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_16424_bannerPic_5790.jpg"
            }
          />
          <CardMenu
            nombre={"Fernet"}
            imagen={
              "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_16423_bannerPic_9361.jpg"
            }
          />
        </SimpleGrid>
      </Box>
      <Box bg="white">
        <Heading ml="5vw" mt="2vw" color="black" as="h4" bg="white" size="lg">
          Promociones
        </Heading>
        <CarrouselMenu />
      </Box>
    </React.Fragment>
  );
}
