import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Flex,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  ListItem,
  UnorderedList,
  Td,
  Tbody,
  Heading ,
  useToast,
} from "@chakra-ui/react";

export const ConfirmOrder = () => {
  const data = useSelector((state) => state.restaurant.restaurant.orders);
  
  const header = ["Mesa", "Pedido", "Cantidad", ""];

  return (<>
  <Heading bgColor="gray.100" align="center" pt="20px">Lista de ordenes pendientes de confirmacion </Heading >
    <Flex bg="gray.100">
    <Flex
    m={2}
      w="full"
      bg="gray.100"
      alignItems="center"
      justifyContent="center"
    >
      <Table
      size="small"
        
        bg={"gray.100"}>
        <Thead >
          <Tr>
            {header.map((x) => (
              <Th key={x} fontSize="small" align="left"> {x}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((ord, i) => {
          return ord.confirmed? "" : <Ordered order={ord} key={i} />})}
        </Tbody>
      </Table>
    </Flex></Flex></>
  );
};

export const Ordered = (order) => {
const restaurant = useSelector((state) => state.restaurant.restaurant);
const toast = useToast()
  const handleOrder = (str) => {
      axios({
          method: str,
          url: `/api/admin/${str==="post"? "confirm" : "reject"}/order?id=${restaurant._id}&table=${order.order.table}`,
      }).then(()=> toast({
        title: `Orden ${str === "post" ? "confirmada": "rechazada"}`,
                status: "info",
                isClosable: true,
      }))
  }

  return (
    <Tr>
      <Td color="black" >{order.order.table}</Td>
      <Td color="gray.700" fontSize="md" fontWeight="hairline">
        <UnorderedList>
          {order.order?.products?.map((el) => (
            <ListItem>
              {el.name} 
            </ListItem>
          ))}
        </UnorderedList>
      </Td>
      <Td color="gray.700" fontSize="md" fontWeight="hairline" >
        <UnorderedList>
          {order.order?.products?.map((el) => (
            <ListItem>
              {el.units}
            </ListItem>
          ))}
        </UnorderedList>
      </Td>

      <Td paddingLeft="1px" paddingRight="1px" >
        <Button bgColor="green.300" size="xs" onClick={()=>handleOrder("post")}>Aceptar</Button>
        <br/>
        <Button bgColor="blue.300" size="xs" onClick={()=>handleOrder("delete")}>Cancelar</Button>
      </Td>
    </Tr>
  );
};
