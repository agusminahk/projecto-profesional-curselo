import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import validateImage from "../../hook/validateHook"
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

export const AddProduct = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategories, setSubcategories] = useState(""); 
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const toast = useToast();

    const handleSubmit=()=>{
        axios
        .post(`api/admin/products`, {
          name: name,
          description: description,
          category: category,
          subCategory: subcategories,
          price: price,
        })
    }
    const handleChange = (e, fn, img) => {
        img &&  validateImage(img, toast)
        fn(e.target.value);
    };
   
    return (
        <>
        <Box align="center" mb="20px" >
                    <Button onClick={onOpen} > Agregar Producto </Button>
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
                          <Input
                            value={image}
                            type="img"
                            id="addImage"
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
                    </ModalBody>
  
                    <ModalFooter>
                     <Button mr={3} type="submit">Guardar</Button>
                      <Button onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                </>
    )
}