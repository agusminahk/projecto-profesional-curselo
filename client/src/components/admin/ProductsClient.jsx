import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Text,
  Checkbox,
  Td,
  Button,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalHeader,
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/hooks";

const data = [
  {
    name: "Segun Adebayo",
    stock: true,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
  {
    name: "Segun Adebayo",
    stock: false,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
  {
    name: "Segun Adebayo",
    stock: true,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
  {
    name: "Segun Adebayo",
    stock: true,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
  {
    name: "Segun Adebayo",
    stock: false,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
  {
    name: "Segun Adebayo",
    stock: false,
    descripcion: "addddddd",
    categoria: "scjsdn vkd b",
    subcategorias: "keeee",
    precio: 5625,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/17/f5/39/f7/fooood-at-the-food-department.jpg",
  },
];

export const ProductsClient = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [price, setPrice] = useState("");
  const [promocion, setPromocion] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

  const handleProductInfo = (product) => {
    setImage(product.image);
    setName(product.name);
    setDescription(product.descripcion);
    setCategory(product.categoria);
    setSubcategories(product.subcategorias);
    setPrice(product.precio);
    setImage(product.image);
  };

  return (
    <>
      <InputGroup w="96" display={{ base: "none", md: "flex" }}  m="30px auto">
        <InputLeftElement color="gray.500" children={<FiSearch />} />
        <Input placeholder="Search for articles..." />
      </InputGroup>

      <Table variant="simple">
        <TableCaption>Tabla de productos </TableCaption>
        <Thead>
          <Tr>
            <Th display={["none", "table-cell"]}>foto</Th>
            <Th>Producto</Th>
            <Th textAlign="right">Stock</Th>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight="bold">
          {data.map((product, i) => (
            <Tr>
              <Td display={["none", "table-cell"]}>
                <Image
                  w={10}
                  h={10}
                  fit="cover"
                  src={`${product.image}`}
                  alt="logo"
                />
              </Td>
              <Td>{product.name}</Td>
              {product.stock ? (
                <>
                  <Td color="black" display={["none", "table-cell"]}>
                    <Text > Hay Stock </Text>
                  </Td>
                  <Td>
                    <Image
                      bgColor="#69C9C9"
                      ml={2}
                      w={8}
                      h={8}
                      rounded="full"
                    />
                  </Td>
                </>
              ) : (
                <>
                  <Td color="black" display={["none", "table-cell"]}>
                    <Text > Sin Stock</Text>
                  </Td>
                  <Td>
                    <Image
                      bgColor="#E89BA7"
                      ml={2}
                      w={8}
                      h={8}
                      rounded="full"
                    />
                  </Td>
                </>
              )}
              <Td>
                <Box onClick={() => handleProductInfo(product)}>
                  <Button onClick={onOpen}> Ver </Button>
                </Box>
              </Td>
              <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Producto</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormControl mt={4}>
                        <FormLabel>Imagen</FormLabel>
                        <Input
                          value={image}
                          type="img"
                          onChange={(e) => handleChange(e, setImage)}
                        />
                      </FormControl>
                      <FormLabel>Nombre del producto</FormLabel>
                      <Input
                        value={name}
                        onChange={(e) => handleChange(e, setName)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Descripcion</FormLabel>
                      <Input
                        value={description}
                        type="text"
                        onChange={(e) => handleChange(e, setDescription)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Categoria</FormLabel>
                      <Input
                        value={category}
                        onChange={(e) => handleChange(e, setCategory)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Subcategorias</FormLabel>
                      <Input
                        value={subcategories}
                        onChange={(e) => handleChange(e, setSubcategories)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Precio</FormLabel>
                      <Input
                        value={price}
                        onChange={(e) => handleChange(e, setPrice)}
                      />
                    </FormControl>
                    <FormControl>
                      <Checkbox
                        defaultIsChecked
                        onChange={(e) => handleChange(e, setPromocion)}
                      >
                        Promocion
                      </Checkbox>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button mr={3}>Guardar</Button>
                    <Button onClick={onClose}>Cerrar</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Producto</Th>
            <Th textAlign="right">Stock</Th>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Editar</Th>
          </Tr>
        </Tfoot>
      </Table>
    </>
  );
};
