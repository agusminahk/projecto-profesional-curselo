import React from "react";

import { Tr, Td, Button, Input, HStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteProduct, updateProduct } from "../utils/localStorage";

export const TableBasket = ({ name, units, priceByUnit, _id, setBasketLocalStorage }) => {
    // ver la funcion localStorage en el ultimo parametro que se pasa poner el numero de la mesa

    const handleIncrement = (number, id) => {
        number > 0 && number < 20 && updateProduct(id, number + 1, 2, setBasketLocalStorage);
    };

    const handleDecrement = (number, id) => {
        number > 1 && updateProduct(id, number - 1, 2, setBasketLocalStorage);
    };

    const handleOnChange = (e, id) => {
        const value = parseInt(e.target.value);

        e.target.value >= 0 && e.target.value < 20 && updateProduct(id, value || "", 2, setBasketLocalStorage);
    };

    return (
        <Tr>
            <Td>{name}</Td>
            <Td>
                <HStack>
                    <Button _focus={{ outline: "none" }} onClick={() => handleIncrement(units, _id)}>
                        +
                    </Button>
                    <Input value={units} onChange={(e) => handleOnChange(e, _id)} />
                    <Button _focus={{ outline: "none" }} onClick={() => handleDecrement(units, _id)}>
                        -
                    </Button>
                </HStack>
            </Td>
            <Td>$ {priceByUnit * units}</Td>
            <Td>
                <Button
                    _focus={{ outline: "none" }}
                    leftIcon={<DeleteIcon />}
                    rounded={"full"}
                    fontWeight={"normal"}
                    colorScheme={"red"}
                    onClick={() => deleteProduct(_id, 2, setBasketLocalStorage)}
                >
                    Delete
                </Button>
            </Td>
        </Tr>
    );
};
