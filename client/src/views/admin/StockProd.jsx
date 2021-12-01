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
  TableCaption,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useDisclosure } from "@chakra-ui/hooks";
import {useSelector} from 'react-redux'
import {data} from "../../components/menu/data.json"
import { AddProduct } from "../../components/admin/AddProduct"
import validateImage from "../../hook/validateHook"
import { useToast } from "@chakra-ui/react";
import {SeeProduct} from "../../components/admin/SeeProduct"

export const StockProd = () => {
    const [Ndata, setNData] = useState(data);
    const [isActive, setIsActive] = useState(data.isActive)
    const toast = useToast();
    const user = useSelector((state) => state.user);

    /* useEffect(()=>{
      axios
      .get(`/api/admin/search?type=product`)
      .then(res => setNData(res.data))
    }) */
  

    const handleChange = (e, fn, img) => {
        img &&  validateImage(img, toast)
        /* user.role === "admin" && fn(e.target.value)*/
        fn(e.target.value);
    };
  

    const handleStock = (value) => {
        setIsActive(value);
    }

    const handleSearch = (value) => {
        let newData = data.filter(prod => prod.name.toLowerCase().includes(value.toLowerCase()))
        setNData(newData)
    }

  
    return (
      <Box mt="100px" alignItems="center">
        <InputGroup w={{base:"80%", md: "40%"}} display="flex" m="30px auto">
          <InputLeftElement color="gray.500" children={<FiSearch />} />
          <Input placeholder="Search for articles..." onChange={(e)=> handleSearch(e.target.value)}/>
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
            {Ndata.map((product, i) => (
              <Tr key={i}>
                <Td display={["none", "table-cell"]}>
                  <Image
                    w={10}
                    h={10}
                    fit="cover"
                    src={`${product.image}`}
                    alt="logo"
                  />
                </Td>
                <Td>{product.name}</Td>
                {product.isActive ? (
                  <>
                    <Td color="black" display={["none", "table-cell"]}>
                      <Text > Hay Stock </Text>
                    </Td>
                    <Td onClick={() => handleStock(false)}>
                      <Image
                        bgColor="#69C9C9"
                        ml={2}
                        w={8}
                        h={8}
                        rounded="full"
                      />
                    </Td>
                  </>
                ) : (
                  <>
                    <Td color="black" display={["none", "table-cell"]} onClick={() => handleStock(false)}>
                      <Text > Sin Stock</Text>
                    </Td>
                    <Td>
                      <Image
                        bgColor="#E89BA7"
                        ml={2}
                        w={8}
                        h={8}
                        rounded="full"
                      />
                    </Td>
                  </>
                )}
                <Td>
                    <SeeProduct product={product}/>
                  </Td>
              </Tr>
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


 