import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Input,
    Image,
    useDisclosure,
    DrawerOverlay,
    Drawer,
    DrawerHeader,
    DrawerContent,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton,
    Stack,
    useColorModeValue,
    Select,
    InputGroup,
    InputRightElement,
    FormLabel,
} from "@chakra-ui/react";
import { setRestaurant } from "../../state/restaurantSlice";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { BsHouseDoor, BsHeadset, BsSearch } from "react-icons/bs";
import { MdFastfood } from "react-icons/md";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

function NavbarMenu({ id, table }) {
    const dispatch = useDispatch();
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const [searchVal, setSearchVal] = useState("");
    const [type, setType] = useState("category");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenSearch, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();
    const [placement, setPlacement] = useState("top");
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "GET",
            url: `/api/client/search/${id}?type=restaurant`,
        }).then(({ data }) => dispatch(setRestaurant(data)));
    }, []);

    const handleSearchOnClick = (e, history) => {
        e.preventDefault();
        setSearchVal("");
        setType("category");

        if (type === "category") {
            searchVal !== ""
                ? history(`/menu/search/category/${searchVal}/${id}/${table}`)
                : history(`/menu/category/${id}/${table}`);
        } else {
            searchVal !== "" && history(`/menu/search/product/${searchVal}/${id}/${table}`); //errorToast(toast, "Please type your search");
        }
    };

    return (
        <Box display="flex" w="full" h="60px" zIndex="2" backgroundColor={useColorModeValue("blue.600", "gray.900")}>
            <Box align="left">
                <Button mt="10px" ml={1} onClick={onOpen}>
                    <HamburgerIcon />
                </Button>
            </Box>
            <Box align="right" w="95%">
                <Button mt="10px" ml={1} onClick={onOpenSearch}>
                    <BsSearch />
                </Button>
                <Link to={`/menu/checkout/${id}/${table}`}>
                    <Button mt="10px" ml={2} mr={1}>
                        <FiShoppingCart />
                    </Button>
                </Link>
            </Box>

            <Drawer placement={placement} onClose={onCloseSearch} isOpen={isOpenSearch}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton _focus={{ outline: "none" }} />
                    <DrawerHeader borderBottomWidth="1px">Buscar productos, categorias</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={5}>
                            <form id="my-form" onSubmit={(e) => handleSearchOnClick(e, navigate)}>
                                <Box>
                                    <FormLabel htmlFor="type">Select Type</FormLabel>
                                    <Select onChange={(e) => setType(e.target.value)} id="type" defaultValue="category">
                                        <option value="category">Categorias</option>
                                        <option value="products">Productos</option>
                                    </Select>
                                </Box>
                                <Box>
                                    <FormLabel htmlFor="search">Search</FormLabel>
                                    <InputGroup>
                                        <Input
                                            id="search"
                                            placeholder="Please type your search"
                                            onChange={(e) => setSearchVal(e.target.value)}
                                        />
                                        <InputRightElement children={<MdFastfood />} pointerEvents="none" />
                                    </InputGroup>
                                </Box>
                            </form>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Button
                            w="80px"
                            _focus={{ outline: "none" }}
                            variant="outline"
                            colorScheme="red"
                            mr={3}
                            onClick={onCloseSearch}
                        >
                            Salir
                        </Button>
                        <Button
                            w="80px"
                            _focus={{ outline: "none" }}
                            type="submit"
                            form="my-form"
                            variant="outline"
                            onClick={onCloseSearch}
                            colorScheme="teal"
                        >
                            Buscar
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <Image
                        src={
                            restaurant?.banner?.data
                                ? `data:image/png;base64,${Buffer.from(restaurant?.banner?.data, " ").toString("base64")}`
                                : "https://media.istockphoto.com/photos/healthy-breakfast-food-banner-with-bottom-border-of-fruits-yogurt-picture-id1199983654"
                        }
                    />
                    <DrawerHeader borderBottomWidth="1px">{restaurant.name && restaurant.name}</DrawerHeader>
                    <DrawerBody>
                        <Stack>
                            <Link to={`/menu/${id}/${table}`} width="100%">
                                <Button width="100%" leftIcon={<BsHouseDoor />} onClick={onClose}>
                                    Inicio
                                </Button>
                            </Link>
                            <Link to={`/menu/category/${id}/${table}`} width="100%">
                                <Button width="100%" leftIcon={<MdFastfood />} onClick={onClose}>
                                    Cateogorias
                                </Button>
                            </Link>
                            <Link to={`/menu/contact/${id}/${table}`}>
                                <Button width="100%" leftIcon={<BsHeadset />} onClick={onClose}>
                                    Contactos
                                </Button>
                            </Link>
                            <Link to={`/menu/checkout/${id}/${table}`}>
                                <Button width="100%" leftIcon={<FiShoppingCart />} onClick={onClose}>
                                    Carrito
                                </Button>
                            </Link>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

export default NavbarMenu;
