import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Tr, Th, Table, Thead, Tbody } from "@chakra-ui/react";

export const TableAdmin = () => {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const [data, setData] = useState([]);
    const [tableC, setTableC] = useState({});
    const [newF, setNewF] = useState({});
    const date = new Date();
    const objPru = [];

    useEffect(() => {
        axios.get(`/api/admin/search?type=metrics&id=${restaurant._id}`).then((res) => {
            setTableC({});
            const lastMonthData = res.data.filter((el) => {
                let elDate = new Date(el.date);
                return elDate - date > -2592000176;
            });
            lastMonthData.forEach((el) => {
                el.productsId.forEach((e) => {
                    return (tableC[e._id] = (tableC[e._id] || 0) + parseInt(e.units || 0));
                });
            });
            setNewF(tableC);
        });
    }, []);

    useEffect(() => {
        axios.get(`/api/admin/search?type=product&id=${restaurant._id}`).then((res) => setData(res.data));
    }, []);

    data?.forEach((el, i) => {
        if (Object.keys(newF).includes(el._id)) {
            objPru.push({ name: el.name, value: newF[el._id] });
        }
    });
    let nopueser = objPru?.sort((a, b) => b.value - a.value);
    let products = nopueser.slice(0, 10);
    return (
        <Table variant="striped" w="100%" m="auto" mt="10px" size="sm">
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Cantidad</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products?.map((prod, index) => {
                    return (
                        <Tr>
                            <Th>{prod.name}</Th>
                            <Th>{prod.value}</Th>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};
