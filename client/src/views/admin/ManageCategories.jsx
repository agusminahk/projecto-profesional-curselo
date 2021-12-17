import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Box,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Flex,
  Stack,
  useDisclosure,
  IconButton,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { NewCategory } from "../../components/admin/NewCategory";
import { useToast } from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, AddIcon } from "@chakra-ui/icons";
import { CategoriesForm } from "../../components/admin/CategoriesForm";

export const ManageCategories = () => {
  const [settedCat, setSettedCat] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`/api/admin/search?type=category&id=${user.user.restaurantId}`)
      .then((res) => {
        setSettedCat(res.data);
      });
  }, [user]);

  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} align="center">
      <NewCategory categories={settedCat} setSettedCat={setSettedCat}/>
      <Box>
        <Box>
          {settedCat?.map((cat, i) => (
            <ManageCat category={cat} key={i} setSettedCat={setSettedCat}/>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const ManageCat = ({ category, setSettedCat }) => {
  const toast = useToast();
  const [newCateg, setNewCat] = useState(category.name);
  const [editing, setEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitCategory = (str) => {
    axios({
      method: `${str}`,
      url: `/api/admin/category/${category._id}`,
      data: {
        name: newCateg,
      },
    }).then((res) => {
      console.log(res)
      setSettedCat(res.data.categoriesId)
      toast({
        title: `${
          str === "delete"
            ? `Categoria y subcategorias eliminadas con exito`
            : `Categoria editada con exito`
        }`,
        status: "success",
        isClosable: true,
      });
      setEditing(false);
      onClose();
    });
  };

  return (
    <Flex
      bg="gray.50"
      p={5}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box shadow="xl" bg="gray.100" px={8}  mx="auto">
        <SimpleGrid
          alignItems="center"
          columns={{ base: 1, lg: 3 }}
          spacingY={{ base: 1, lg: 10 }}
          spacingX={{ base: 1, lg: 10 }}
          mt={5}
        >
          <Box alignSelf="start">
            <Input
              disabled={!editing}
              fontSize="lg"
              fontWeight="bold"
              lineHeight="6"
              color="gray.900"
              value={newCateg}
              onChange={(e) => setNewCat(e.target.value)}
            ></Input>
          </Box>
          <Box>
            <Box  align="left" alignSelf="left">
          <IconButton
            m={1}
            colorScheme="teal"
            w={{base: "15px", md:"25px"}}
          h={{base: "38px", md:"30px"}}
            icon={editing ? <CheckIcon /> : <EditIcon />}
            editing={editing}
            onClick={() => (editing ? submitCategory("put") : setEditing(true))}
          />
          <IconButton
        
            m={1}
            colorScheme="teal"
            w={{base: "15px", md:"25px"}}
          h={{base: "38px", md:"30px"}}
            icon={<DeleteIcon />}
            onClick={onOpen}
          /></Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody>
                Seguro desea borrar esta categoria, sus subcategorias y los
                productos que la contengan?
              </ModalBody>
              <ModalCloseButton />
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  No, cerrar
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => submitCategory("delete")}
                >
                  Si, borrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          </Box>
          <GridItem colSpan={3}>
            <Stack
              spacing={{ base: 5, md: 0 }}
              display={{ md: "grid"}}
              gridTemplateColumns={{ md: "repeat(3,1fr)" }}
              gridColumnGap={{ md: 1 }}
              gridRowGap={{ md: 1 }}
            >
              {category?.subcategory?.map((subcat, i) => (
                <CategoriesForm title={subcat} key={i} id={category._id} />
              ))}
              <Flex >
                <NewSubcat categoryId={category._id}/>
              </Flex>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export const NewSubcat = ({categoryId}) => {
  const toast = useToast();
  const [newSubc, setNewSubcat] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitNewSubCat = () => {
    axios
      .post(`/api/admin/subcategory`, {
        categoryId: categoryId,
        name: newSubc,
      })
      .then((res) => {
        toast({
          title: `Subcategoria agregada con exito`,
          status: "success",
          isClosable: true,
        });
        onClose();
      });
  };
  return (
    <Flex w="full">
    <IconButton
                  w="full"
                  m={3}
                  mb={6}
                  mt={4}
                  colorScheme="teal"
                  aria-label="Call Segun"
                  size="lg"
                  icon={<AddIcon />}
                  onClick={onOpen}
                />
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Agregar nueva subcategoria</ModalHeader>
                    <ModalBody>
                      <Input
                        fontSize="lg"
                        fontWeight="bold"
                        lineHeight="6"
                        color={useColorModeValue("gray.900")}
                        value={newSubc}
                        onChange={(e) => setNewSubcat(e.target.value)}
                      ></Input>
                    </ModalBody>
                    <ModalCloseButton />
                    <ModalFooter>
                      <Button colorScheme="red" mr={3} onClick={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={(e) => submitNewSubCat()}
                      >
                        Guardar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
  </Flex>)
}