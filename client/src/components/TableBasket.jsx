import React from "react";

import { Tr, Td, Button,  HStack, IconButton, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteProduct, updateProduct } from "../utils/localStorage";

export const TableBasket = ({ name, units, priceByUnit, _id, setBasketLocalStorage, table }) => {
    const handleIncrement = (number, id, tableNumber) => {
        number >= 0 && number < 20 && updateProduct(id, number + 1, tableNumber, setBasketLocalStorage);
    };

    const handleDecrement = (number, id, tableNumber) => {
        number > 1 && updateProduct(id, number - 1, tableNumber, setBasketLocalStorage);
    };

    return (
        <Tr>
            <Td>{name}</Td>
            <Td>
                <HStack>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        _focus={{ outline: "none" }}
                        onClick={() => handleIncrement(units, _id, table)}
                    >
                        +
                    </Button>
                    <Text>{units || 0}</Text>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        _focus={{ outline: "none" }}
                        onClick={() => handleDecrement(units, _id, table)}
                    >
                        -
                    </Button>
                </HStack>
            </Td>
            <Td>$ {priceByUnit * units}</Td>
            <Td>
                <IconButton
                    _focus={{ outline: "none" }}
                    icon={<DeleteIcon />}
                    rounded={"full"}
                    fontWeight={"normal"}
                    colorScheme={"red"}
                    onClick={() => deleteProduct(_id, table, setBasketLocalStorage)}
                ></IconButton>
            </Td>
        </Tr>
    );
};
