import React, { useState, useEffect, useRef } from "react";
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
  Image,
  Select,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import validateImage from "../../hook/validateHook";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { IoMdClose } from "react-icons/io";
import FormData from "form-data";

export const AddProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [restaurantId, setRestId] = useState("61a57344c4f0675184e3e87d");
  const toast = useToast();
  const [settedCategories, setSettedCat] = useState([]);
  const [settedSubCateg, setSettedSubCat] = useState([]);
  const [preview, setPreview] = useState([]);

const fileInputRef = useRef()

  useEffect(() => {
    axios
      .get(`api/admin/search?type=category&id=${restaurantId}`)
      .then((res) => {
        setSettedCat(res.data);
      });
  }, []);

  useEffect(() => {
    if(image){
    const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
    reader.readAsDataURL(image);
  } else {
    setPreview(null);
  }
  }, [image])
  
  const handleSubmit = () => {
    const obj = {
      name: name,
      restaurantId: restaurantId,
      description: description,
      category: category,
      subcategory: subcategories,
      price: parseInt(price),
    };

    let data = new FormData();
    data.append("image", image);

    axios
      .post(`/api/admin/product`, obj)
      .then((res) => {
        const prodId = res.data.productsId.pop();
        axios
          .put(
            `/api/admin/images/${restaurantId}?type=product&key=${prodId}`,
            data,
            {
              headers: {
                "Accept-Language": "en-US,en;q=0.8",
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() =>{
            toast({
              title: `Producto agregado exitosamente`,
              status: "success",
              isClosable: true,
            })
            setImage("")
            setName("")
            setDescription("")
            setCategory("")
            setSubcategories([])
            setPrice("")
          })
      })
      .catch((err) => err);
  };
  const handleChange = (e, fn, img) => {
    if (typeof img === "string" && e.target.files[0].type.substr(0,5) === "image") {
      validateImage(img, toast);
      return fn(e.target.files[0]);
    }
    if (typeof img === "function") {
      const [subc] = settedCategories.filter(
        (el) => el._id === e.target.value
      );
      setSettedSubCat(subc.subcategory);
      setSubcategories([]);
    }
    fn(e.target.value);
  };
  const handleArray = (e) => {
    !subcategories.includes(e.target.value) &&
      setSubcategories([...subcategories, e.target.value]);
  };
  const deleteCat = (e) => {
    let res = subcategories.filter((el) => el !== e.target.value);
    setSubcategories(res);
  };

  return (
    <>
      <Box align="center" mb="20px">
        <Button onClick={onOpen}> Agregar Producto </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Producto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormControl mt={4}>
                <FormLabel>Imagen</FormLabel>
                <Image src={preview} float="left"
                    ml={{ base: "none", md: "15%" }}/>
                 <Button onClick={(e)=> {e.preventDefault(); fileInputRef.current.click()}} float="right"
                    ml={{ base: "none", md: "15%" }}> Agregar imagen </Button>
                <Input
                style={{display: "none"}}
                ref={fileInputRef}
                accept="image/*"
                  name="productImage"
                  type="file"
                  id="addImage"
                  onChange={(e) => handleChange(e, setImage, "addImage")}
                />
              </FormControl>
              <FormLabel mt="110px">Nombre del producto</FormLabel>
              <Input value={name} onChange={(e) => handleChange(e, setName)} />
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
              <Select
                placeholder="Select option"
                onChange={(e) => handleChange(e, setCategory, setSettedSubCat)}
              >
                {settedCategories.map((cat, i) => (
                  
                  <option value={cat._id} key={i}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Subcategorias</FormLabel>
              <Box h="30px" w="full">
                {subcategories.map((cat, i) => (
                  <Button
                    key={i}
                    h="20px"
                    bgColor="red"
                    value={cat}
                    onClick={(e) => deleteCat(e)}
                  >
                    {cat}
                    <IoMdClose />
                  </Button>
                ))}
              </Box>
              <Select
                placeholder="Select option"
                onChange={(e) => handleArray(e)}
              >
                {settedSubCateg.map((cat, i) => (
                  <option value={cat} key={i}>
                    {cat}
                  </option>
                ))}
              </Select>
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
            <Button mr={3} onClick={() => handleSubmit()}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
