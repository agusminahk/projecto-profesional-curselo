import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
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
import { setCategory } from "../../state/categorySlice";

export const ManageCategories = () => {
  const settedCatt = useSelector((state) => state.category);

  return (
    <Box bg={useColorModeValue("gray.50", "inherit")} align="center">
      <NewCategory categories={settedCatt} />
      <Box>
        <Box>
          {settedCatt?.category?.map((cat, i) => (
            <ManageCat category={cat} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const ManageCat = ({ category }) => {
  const toast = useToast();
  const [newCateg, setNewCat] = useState(category.name);
  const [editing, setEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const submitCategory = (str) => {
    axios({
      method: `${str}`,
      url: `/api/admin/category/${category._id}`,
      data: {
        name: newCateg,
      },
    }).then((res) => {
      if (str === "delete") {
        dispatch(setCategory(res.data.categoriesId));
      }
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
      <Box shadow="xl" bg="gray.100" px={8} mx="auto" w="auto">
        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacingY={{ base: 1, lg: 10 }}
          spacingX={{ base: 1, lg: 10 }}
          mt={5}
        >
          <Box>
            <Input
              w="auto"
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
            <Box align="left" alignSelf="left">
              <IconButton
                m={1}
                colorScheme={editing ? "green.300" : "teal"}
                w={{ base: "15px", md: "25px" }}
                h={{ base: "38px", md: "30px" }}
                icon={editing ? <CheckIcon /> : <EditIcon />}
                color="white"
                editing={editing}
                onClick={() =>
                  editing ? submitCategory("put") : setEditing(true)
                }
              />
              <IconButton
                m={1}
                colorScheme="teal"
                w={{ base: "15px", md: "25px" }}
                h={{ base: "38px", md: "30px" }}
                icon={<DeleteIcon />}
                onClick={onOpen}
              />
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader></ModalHeader>
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
              display={{ md: "grid" }}
              gridTemplateColumns={{ md: "repeat(3,1fr)" }}
              gridColumnGap={{ md: 1 }}
              gridRowGap={{ md: 1 }}
            >
              {category?.subcategory?.map((subcat, i) => (
                <CategoriesForm title={subcat} key={i} id={category._id} />
              ))}
            </Stack>
            <Box display="flex">
              <NewSubcat categoryId={category._id} />
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

export const NewSubcat = ({ categoryId }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [newSubc, setNewSubcat] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const settedCatt = useSelector((state) => state.category);

  const submitNewSubCat = () => {
    axios
      .post(`/api/admin/subcategory`, {
        categoryId: categoryId,
        name: newSubc,
      })
      .then((res) => {
        let newCat = settedCatt.category.filter(
          (el) => el._id !== res.data._id
        );
        dispatch(setCategory([...newCat, res.data]));
        toast({
          title: `Subcategoria agregada con exito`,
          status: "success",
          isClosable: true,
        });
        setNewSubcat("");
        onClose();
      });
  };
  return (
    <Flex w="full">
      <Button
        w="full"
        m={3}
        mb={6}
        mt={4}
        colorScheme="teal"
        aria-label="Call Segun"
        size="lg"
        onClick={onOpen}
      >
        <AddIcon /> Agregar subcategoria
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
          Agregar nueva subcategoria
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
            <Button colorScheme="blue" onClick={(e) => submitNewSubCat()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
