import React, { useState } from "react";
import {
  Tr,
  Text,
  Td,
  Switch,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { SeeProduct } from "../../components/admin/SeeProduct";

export const ManageStock = ({product}) => {
    const [Ndata, setNData] = useState(product);
    const toast = useToast();

    const handleSubmit = (id, state) => {
        axios.put(`api/admin/product/${id}`, { state: !state }).then((res) =>{
        setNData(res.data)
        toast({
            title: `Stock cambiado`,
            status: "info",
            isClosable: true,
          })}
        );
      };

    return (
        <Tr >
                <Td display={["none", "table-cell"]}>
                  <Image
                    w={10}
                    h={10}
                    fit="cover"
                    src={`${Ndata.image}`}
                    alt="logo"
                  />
                </Td>
                <Td>{Ndata.name}</Td>
                {Ndata.state ? (
                  <>
                    <Td color="black" display={["none", "table-cell"]}>
                      <Text> Hay Stock </Text>
                    </Td>
                  </>
                ) : (
                  <>
                    <Td color="black" display={["none", "table-cell"]}>
                      <Text> Sin Stock</Text>
                    </Td>
                  </>
                )}
                <Td>
                  <Switch
                    onChange={() => handleSubmit(Ndata._id, Ndata.state)}
                    size="lg"
                    isChecked={Ndata.state === true || false}
                  />
                </Td>
                <Td>
                  <SeeProduct product={Ndata} />
                </Td>
              </Tr>
    )
}