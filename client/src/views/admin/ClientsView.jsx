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
            country: "Argentina"
        },
        {
            name: "etcetcetc",
            status: "active",
            country: "Argentina"
        },
        {
            name: "otr nombre",
            status: "active",
            country: "Argentina"
        },
        {
            name: "burguer king",
            status: "inactive",
            country: "Argentina"
        },
        {
            name: "taco bells",
            status: "active",
            country: "Argentina"
        },
        {
            name: "KFC",
            status: "inactive",
            country: "Argentina"
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