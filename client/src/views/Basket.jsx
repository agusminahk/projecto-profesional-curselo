import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Button } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { getTotal } from "../utils/getTotal";
import axios from "axios";

import { TableBasket } from "../components/TableBasket";

export const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [total, setTotal] = useState(0);
    const [basketLocalStorage, setBasketLocalStorage] = useState([]);

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem("basket")) || { table: 2, products: [], total: 0 };

        const totalCarrito = carrito.products.length > 0 ? getTotal(carrito.products) : 0;

        setBasket(carrito.products);
        
        setTotal(totalCarrito);

        carrito.total = totalCarrito;

        localStorage.setItem("basket", JSON.stringify(carrito));
    }, [basketLocalStorage]);

    const handleConfirm = () => {
        const carrito = JSON.parse(localStorage.getItem("basket")) || { table: 2, products: [], total: 0 };

        axios.post(`/api/client/order/id`, carrito).then((res) => console.log(res)); // falta agregar el id del restaurant
    };

    return (
        <Box align={"center"}>
            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Producto</Th>
                        <Th>Cantidad</Th>
                        <Th>Precio</Th>
                        <Th>Eliminar</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {basket?.map((e) => (
                        <TableBasket {...e} setBasketLocalStorage={setBasketLocalStorage} />
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th></Th>
                        <Th isNumeric={true}>Confirmar</Th>
                        <Td>$ {total}</Td>
                        <Td>
                            {" "}
                            <Button
                                _focus={{ outline: "none" }}
                                leftIcon={<CheckIcon />}
                                rounded={"full"}
                                fontWeight={"normal"}
                                colorScheme={"green"}
                                onClick={() => handleConfirm()}
                            >
                                Confirm
                            </Button>
                        </Td>
                    </Tr>
                </Tfoot>
            </Table>
        </Box>
    );
};
