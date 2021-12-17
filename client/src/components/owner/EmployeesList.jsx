import React, { useEffect } from "react"
import {
    Tr,
    Th,
    Table,
    Thead,
    Tbody,
  } from "@chakra-ui/react";
import { Employee } from "./Employee";
import axios from "axios";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../../state/restaurantSlice";

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

export const EmployeesList = () => {
    const users = useSelector((state) => state.restaurant.users);
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(`/api/admin/search?type=user&id=${restaurant._id}`)
        .then((res)=> dispatch(setUsers(res.data)))
    }, [restaurant]);

    return (
        <Table variant="striped" w="100%" m="auto" mt="50px" size="sm">
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th>Rol</Th>
                    <Th display={["none", "none", "table-cell"]}>Número de telefono</Th>
                    <Th display={["none", "none", "none", "table-cell"]}>Email</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users[0] && 
                    users?.map((employee, index) =>   <Employee key={index} employee={employee}/>)
                }
                <Employee employee={{}} createRow={true}/>
            </Tbody>
        </Table>
    )
}