import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalHeader,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/hooks";
import {useSelector} from 'react-redux'
import {data} from "../../components/menu/data.json"
import { IoTrashOutline } from "react-icons/io5";
import validateImage from "../../hook/validateHook"
import { useToast } from "@chakra-ui/react";

export const SeeProduct = ({product}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategories, setSubcategories] = useState(""); 
    const [price, setPrice] = useState("");
    const [promocion, setPromocion] = useState("");
    const [image, setImage] = useState("");
    const [isActive, setIsActive] = useState("");
    const toast = useToast();
    const user = useSelector((state) => state.user);

    const handleChange = (e, fn, img) => {
        img &&  validateImage(img, toast)
        /* user.role === "admin" && fn(e.target.value)*/
        fn(e.target.value);
    };
  
    const handleProductInfo = (product) => {
      setImage(product.image);
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setSubcategories(product.subCategory);
      setPrice(product.price);
      setIsActive(product.isActive);
    };
    const handleSubmit = () => {
        axios
        .put(`api/admin/product/${product._id}`, {
            image: image,
            name: name,
            description: description,
            category: category,
            subCategory: subcategories,
            price: price,
            isActive: isActive
        })
        .then(()=> toast({
            title: `producto editado correctamente`,
            status: "success",
            isClosable: true,
          }))
    }

    return(
<>

<Box onClick={() => handleProductInfo(product)}>
                    <Button onClick={onOpen}> Ver </Button>
                  </Box>

                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl onSubmit={()=>handleSubmit}>
                        <FormControl mt={4}>
                          <FormLabel>Imagen</FormLabel>
                          <Image
                          maxW="130px"
                          maxH="130px"
                          src={`${image}`}
                          />
                          <Input
                            value={image}
                            type="img"
                            id="productImg"
                            onChange={(e) => handleChange(e, setImage, "productImg")}
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
                      {/* {user.role === "admin" && <Button mr={3} type="submit">Guardar</Button>} */}
                        <Button mr={3} bgColor="red" type="submit">Eliminar <IoTrashOutline/></Button>
                      <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </>
    )
}
