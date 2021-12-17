import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { IconButton, Table, Thead, Tbody, Tfoot, Tr, Th, Td, Text, useColorModeValue } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { getTotal } from "../utils/getTotal";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { TableBasket } from "../components/TableBasket";
import NavbarMenu from "../components/menu/NavbarMenu";

export const Basket = () => {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [basketLocalStorage, setBasketLocalStorage] = useState([]);
    const { id, table } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem("basket")) || { table: table, products: [], total: 0 };

        const totalCarrito = carrito.products.length > 0 ? getTotal(carrito.products) : 0;

        setBasket(carrito.products);

        setTotal(totalCarrito);

        carrito.total = totalCarrito;

        localStorage.setItem("basket", JSON.stringify(carrito));
    }, [basketLocalStorage]);

    const handleConfirm = () => {
        const carrito = JSON.parse(localStorage.getItem("basket")) || { table: table, products: [], total: 0 };

        axios.post(`/api/client/order/${id}`, carrito).then((res) => {
            localStorage.removeItem("basket");
            navigate(`/menu/${id}/${table}`);
        });
    };

    return (
        <Box w="full" pos="fixed" zIndex="2" backgroundColor={useColorModeValue("blue.600", "gray.900")}>
            <NavbarMenu restaurant={restaurant} id={id} table={table} />
            <Box>
                <Table
                    size="small"
                    variant="striped"
                    colorScheme="gray"
                    mt={{ base: "2vh", md: "2vh", lg: "2vh" }}
                    position="absolute"
                >
                    <Thead>
                        <Tr>
                            <Th>
                                <Text fontSize="sm">Producto</Text>
                            </Th>
                            <Th>
                                <Text fontSize="sm">Cantidad</Text>
                            </Th>
                            <Th>
                                <Text fontSize="sm">Precio</Text>
                            </Th>
                            <Th>
                                <Text fontSize="sm"></Text>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {basket?.map((e) => (
                            <TableBasket {...e} setBasketLocalStorage={setBasketLocalStorage} table={table} />
                        ))}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th></Th>
                            <Th isNumeric={true}>Confirmar:</Th>
                            <Td>$ {total}</Td>
                            <Td>
                                {" "}
                                <IconButton
                                    _focus={{ outline: "none" }}
                                    icon={<CheckIcon />}
                                    rounded={"full"}
                                    fontWeight={"normal"}
                                    colorScheme={"green"}
                                    onClick={() => handleConfirm()}
                                />
                            </Td>
                        </Tr>
                    </Tfoot>
                </Table>
            </Box>
        </Box>
    );
};
