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

export const ClientsView = ({ clients }) => {
    return (<>
        <Table>
            <Thead>
                <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th>Status</Th>
                    <Th>Pais</Th>
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