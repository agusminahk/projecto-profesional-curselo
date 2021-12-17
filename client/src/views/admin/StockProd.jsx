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
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState("")
  const user = useSelector((state) => state.user);
  //61a57344c4f0675184e3e87d
  useEffect(() => {
    axios
      .get(`/api/admin/search?type=product&id=${user.user.restaurantId}`)
      .then((res) => {setData(res.data); setNData(res.data)});
  }, [user]);
  

  const handleSearch = (value) => {
    setSearchVal(value)
    if(searchVal === "" || searchVal === " ") setNData(data)
    let newData = data.filter(el => el.name.toLowerCase().includes(searchVal.toLowerCase()))
    
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
          {console.log(Ndata)}
          {Ndata.length > 0 &&
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

