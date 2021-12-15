import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Box,
  Tr,
  Th,
  TableCaption,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/hooks";
import { useSelector } from "react-redux";
import { AddProduct } from "../../components/admin/AddProduct";
import { ManageStock } from "../../components/admin/ManageStock"

export const StockProd = () => {
  const [Ndata, setNData] = useState([]);
  const [searchVal, setSearchVal] = useState("")
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);

useEffect( () => {
  setNData(products)
}, [products])

  const handleSearch = (value) => {
    setSearchVal(value)
    if(searchVal === "" || searchVal === " ") setNData(products)
    let newData = products.filter(el => el.name.toLowerCase().includes(searchVal.toLowerCase()))
    
    setNData(newData);
  };

  return (
    <Box mt="100px" alignItems="center">
      <InputGroup w={{ base: "80%", md: "40%" }} display="flex" m="30px auto">
        <InputLeftElement color="gray.500" children={<FiSearch />} />
        <Input
          placeholder="Search for articles..."
          value={searchVal}
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
          {products?.map((product, i) => (
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

