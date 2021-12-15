import React, { useEffect } from "react"
import {
    Tr,
    Th,
    Table,
    Thead,
    Tbody,
  } from "@chakra-ui/react";

export const TableAdmin = () => {

    const products = [
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
        {name: "nachos", units: 10},
    ]

    return (
        <Table variant="striped" w="100%" m="auto" mt="10px" size="sm">
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Cantidad</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products?.map((prod, index) => (
                    <Tr>
                        <Th>{prod.name}</Th>
                        <Th>{prod.units}</Th>
                    </Tr>
                    ) )
                }
            </Tbody>
        </Table>
    )
}