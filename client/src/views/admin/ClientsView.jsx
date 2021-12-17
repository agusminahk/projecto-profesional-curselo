import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
    Table,
    Tr,
    Th,
    Thead,
    Tbody,
    InputGroup, 
    InputLeftElement,
    Input,
  } from "@chakra-ui/react";
  import {AiOutlineSearch} from "react-icons/ai";
import { Client } from "../../components/admin/Client";

export const ClientsView = () => {
    const user = useSelector((state) => state.user.user)
    const [clients, setClients] = useState([])
    const [searchVal, setSearchVal] = useState("")
    const [newData, setNewData] = useState([])

    useEffect(()=>{
        axios.get(`/api/superAdmin/clients`).then((res)=> {setClients(res.data); setNewData(res.data)})
    }, [user])

    const handleSearch = (value) => {
    setSearchVal(value)
    if(value === "" || value === " ") setNewData(clients)
    const searched = clients.filter(el => el.name.toLowerCase().includes(value.toLowerCase()))
    setNewData(searched)
    }
    return (<>
     <InputGroup alignItems={"center"} w="full" m={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineSearch />}
              />
              <Input type="text" placeholder="Search..." w={{base: "90%", md:"60%"}} onChange={(e)=> handleSearch(e.target.value)}/>
            </InputGroup>
        <Table>
            <Thead>
                <Tr>
                    <Th>Image</Th>
                    <Th>Name</Th>
                    <Th display={["none", "table-cell", "table-cell"]}>Pais</Th>
                    <Th display={["none", "none", "table-cell"]}>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    newData?.map((client, index) => (
                        <Client key={index} client={client} setClients={setClients} clients={clients}/>
                    ))
                }
            </Tbody>
        </Table>
    </>)
}