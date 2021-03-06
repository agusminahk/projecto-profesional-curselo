import React, { useState, useEffect, useRef } from "react";
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
    Select,
    ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/hooks";
import { useSelector, useDispatch } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import validateImage from "../../hook/validateHook";
import { useToast } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import FormData from "form-data";
import { Buffer } from "buffer";
 
export const SeeProduct = ({ product, setNData }) => {
    let prodd = product.img?.data ? `data:image/jpeg;base64,${Buffer.from(product.img.data.data, " ").toString("base64")}` : "";

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [price, setPrice] = useState("");
    const [promocion, setPromocion] = useState("");
    const [actualImg, setActualImg] = useState("");
    const [image, setImage] = useState("");
    const toast = useToast();
    const user = useSelector((state) => state.user);
    const settedCategories = useSelector((state) => state.category.category)
    const [settedSubCateg, setSettedSubCat] = useState([]);
    const [preview, setPreview] = useState([]);

    const fileInputRef = useRef();


    const handleProductInfo = (product) => {
        setActualImg(prodd);
        let cat = product.category ? product.category._id : "";
        setCategory(cat);
        setName(product.name);
        setDescription(product.description);
        setSubcategories(product.subcategory);
        setPrice(product.price);
    };

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(null);
        }
        setActualImg("");
    }, [image]);

    const handleSubmit = () => {
        let data = new FormData();
        data.append("image", image);
        let obj = {
            name: name,
            restaurantId: user.user.restaurantId,
            description: description,
            category: category || null,
            subcategory: subcategories || null,
            price: parseInt(price),
        };

        axios
            .put(`/api/admin/product/${product._id}`, obj)
            .then((res) => {
                if (preview) {
                    axios
                        .put(`/api/admin/images/${user.user.restaurantId}?type=productUpdate&key=${product._id}`, data, {
                            headers: {
                                "Accept-Language": "en-US,en;q=0.8",
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((resp) => {
                            setNData(resp.data);
                        });
                } else {
                    setNData(res.data);
                }
            })
            .then(() => {
                toast({
                    title: `Producto editado correctamente`,
                    status: "success",
                    isClosable: true,
                });
                setPreview(null);
                onClose();
            });
    };

    const handleChange = (e, fn, img) => {
        if (user.user.role !== "admin") return;
        if (typeof img === "string" && e.target.files[0].type.substr(0, 5) === "image") {
            validateImage(img, toast);
            return fn(e.target.files[0]);
        }
        if (typeof img === "function") {
            const [subc] = settedCategories.filter((el) => el._id === e.target.value);
            setSettedSubCat(subc.subcategory);
            setSubcategories([]);
        }

        fn(e.target.value);
    };

    const handleArray = (e) => {
        !subcategories.includes(e.target.value) && setSubcategories([...subcategories, e.target.value]);
    };
    const deleteCat = (e) => {
        let res = subcategories.filter((el) => el !== e.target.value);
        setSubcategories(res);
    };

    const handleDeleteProduct = () => {
        axios.delete(`/api/admin/product/${product._id}`).then(() => {
            toast({
                title: `Producto eliminado con exito`,
                status: "success",
                isClosable: true,
            });
            onClose()
        });
    };

    return (
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
                        <FormControl onSubmit={() => handleSubmit}>
                            <FormControl mt={4}>
                                <FormLabel>Imagen</FormLabel>
                                {actualImg !== "" && <Image src={actualImg} float="left" mb={10} />}
                                <Image maxW="130px" maxH="130px" src={preview} float="left" ml={{ base: "none", md: "15%" }} />
                                {user.user.role === "admin" && (
                                    <>
                                        <Button
                                            mr={{ base: "none", md: "15%" }}
                                            float="right" 
                                            mt="10px"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                fileInputRef.current.click();
                                            }}
                                        >
                                            Editar imagen
                                        </Button>
                                        <Input
                                            style={{ display: "none" }}
                                            ref={fileInputRef}
                                            accept="image/*"
                                            name="productImage"
                                            type="file"
                                            id="addImage"
                                            onChange={(e) => handleChange(e, setImage, "addImage")}
                                        />
                                    </>
                                )}
                            </FormControl>

                            <Input value={name} onChange={(e) => handleChange(e, setName)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input value={description} type="text" onChange={(e) => handleChange(e, setDescription)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            {user.user.role === "admin" ? (
                                <Select
                                    placeholder={product.category?._id ? product.category.name : "Sin categoria"}
                                    onChange={(e) => handleChange(e, setCategory, setSettedSubCat)}
                                >
                                    {settedCategories.map((cat, i) => (
                                        <option value={cat._id} key={i}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Select>
                            ) : (
                                <Box>{product.category ? product.category.name : "Sin categoria"}</Box>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Subcategorias</FormLabel>
                            <Box h="30px" w="full">
                                {subcategories.map((cat, i) => (
                                    <Button key={i} h="20px" bgColor="red" value={cat} onClick={(e) => deleteCat(e)}>
                                        {cat}
                                        {user.user.role === "admin" && <IoMdClose />}
                                    </Button>
                                ))}
                            </Box>
                            {user.user.role === "admin" && (
                                <Select
                                    placeholder={product.subcategory ? product.subcategory.join(" ") : "Sin subcategorias"}
                                    onChange={(e) => handleArray(e)}
                                >
                                    {settedSubCateg.map((cat, i) => (
                                        <option value={cat} key={i}>
                                            {cat}
                                        </option>
                                    ))}
                                </Select>
                            )}
                        </FormControl>
                        <FormControl>
                            <FormLabel>Precio</FormLabel>
                            <Input value={price} onChange={(e) => handleChange(e, setPrice)} />
                        </FormControl>
                        <FormControl>
                            <Checkbox onChange={(e) => handleChange(e, setPromocion)}>Promocion</Checkbox>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {user.user.role === "admin" && (
                            <>
                                <Button colorScheme='green' mr={3} onClick={() => handleSubmit()}>
                                    Guardar
                                </Button>
                                <Button mr={3} colorScheme="red" onClick={() => handleDeleteProduct()}>
                                    Eliminar <IoTrashOutline />
                                </Button>
                            </>
                        )}

                        <Button colorScheme='blue' onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
