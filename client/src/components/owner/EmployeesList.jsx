import {
    Tr,
    Th,
    Table,
    Thead,
    Tbody,
  } from "@chakra-ui/react";
import { Employee } from "./Employee";

import { createBreakpoints } from "@chakra-ui/theme-tools"

// This is the default breakpoint
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

export const EmployeesList = () => {
    const employees = [
        {
            firstName: "Patricio",
            lastName: "Anastacio",
            email: "patricioanastacio01@gmail.com",
            rol: "Cocina",
            telephone: "+54 381 579-6366"
        },
        {
            firstName: "Mateo",
            lastName: "Moreno",
            email: "mateo@mail.com",
            rol: "Salon",
            telephone: "+54 381 123-4567"
        },
        {
            firstName: "Maru",
            lastName: "Guerrero",
            email: "maru@mail.com",
            rol: "Caja",
            telephone: "+54 381 795-9842"
        },
        {
            firstName: "Leandro",
            lastName: "Caiguara",
            email: "lean@mail.com",
            rol: "Admin",
            telephone: "+54 381 784-6748"
        },
        {
            firstName: "Agustin",
            lastName: "Minahk",
            email: "agus@mail.com",
            rol: "Cocina",
            telephone: "+54 381 266-7794"
        },
    ]

    return (
        <Table variant="striped" w="100%" m="auto" mt="50px" size="sm">
            {console.log(window)}
            <Thead>
                <Tr>
                    <Th>Nombre</Th>
                    <Th display={["none", "none"]}>Rol</Th>
                    <Th display={["none", "none", "none", "table-cell"]}>Email</Th>
                    <Th display={["none", "none", "table-cell"]}>Número de telefono</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    employees.map((employee, index) => (
                        <Employee key={index} employee={employee}/>
                    ))
                }
                <Employee employee={{}} createRow={true}/>
            </Tbody>
        </Table>
    )
}