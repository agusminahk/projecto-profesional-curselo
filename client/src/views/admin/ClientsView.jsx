import {
    Table,
    TableCaption,
    Tr,
    Th,
    Thead,
    Image,
    Tbody
  } from "@chakra-ui/react";
import { Client } from "../../components/admin/Client"

export const ClientsView = () => {
    const clients = [
        {
            name: "Nombre bastante largo",
            status: "active",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
        {
            name: "etcetcetc",
            status: "active",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
        {
            name: "otr nombre",
            status: "active",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
        {
            name: "burguer king",
            status: "inactive",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
        {
            name: "taco bells",
            status: "active",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
        {
            name: "KFC",
            status: "inactive",
            country: "Argentina",
            provincia: "Tucuman",
            email: "example@mail.com",
            phone: "+54 381 579-6366",
            direction: "Santafe 1980",
            postalCode: "400"
        },
    ]

    return (<>
        <Table>
            <Thead>
                <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Pais</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    clients.map((client, index) => (
                        <Client key={index} client={client}/>
                    ))
                }
            </Tbody>
        </Table>
    </>)
}