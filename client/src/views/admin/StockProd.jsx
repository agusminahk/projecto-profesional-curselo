import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  Text,
  Td,
  Switch,
  TableCaption,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/hooks";
import { useSelector } from "react-redux";
import { data } from "../../components/menu/data.json";
import { AddProduct } from "../../components/admin/AddProduct";
import validateImage from "../../hook/validateHook";
import { useToast } from "@chakra-ui/react";
import { SeeProduct } from "../../components/admin/SeeProduct";
import { ManageStock } from "../../components/admin/ManageStock"

export const StockProd = () => {
  const [Ndata, setNData] = useState([]);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState([data.isActive]);
  const toast = useToast();
  const user = useSelector((state) => state.user);
  //user.restaurantId
  useEffect(() => {
    axios
      .get(`/api/admin/search?type=product&id=61a57344c4f0675184e3e87d`)
      .then((res) => {setData(res.data); setNData(res.data)});
  }, []);
  

  const handleSearch = (value) => {
    if(value === "") setNData(data)
    let newData = data.filter((prod) =>
      prod.name.toLowerCase().includes(value.toLowerCase())
    );
    setNData(newData);
  };

  return (
    <Box mt="100px" alignItems="center">
      <InputGroup w={{ base: "80%", md: "40%" }} display="flex" m="30px auto">
        <InputLeftElement color="gray.500" children={<FiSearch />} />
        <Input
          placeholder="Search for articles..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </InputGroup>
      <AddProduct />
      <Table variant="simple">
        <TableCaption>Tabla de productos </TableCaption>
        <Thead>
          <Tr>
            <Th display={["none", "table-cell"]}>foto</Th>
            <Th>Producto</Th>
            <Th textAlign="right">Stock</Th>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody fontWeight="bold">
          {Ndata.length &&
            Ndata.map((product, i) => (
              <ManageStock product={product} key={i}/>
            ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Producto</Th>
            <Th textAlign="right">Stock</Th>
            <Th display={["none", "table-cell"]}></Th>
            <Th>Editar</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  );
};
