import { useEffect, useState } from "react"
import { Box, Button, Input, Text, Grid, InputGroup, InputRightAddon } from "@chakra-ui/react"
import axios from "axios"
import React from "react";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";



export const CodigoQr = ({ restaurantId }) => {
    const [numberOfTables, setNumberOfTables] = useState(1)

    const saveGeneral = () => {
        const doc = new jsPDF();
            doc.text("Codigo qr", 15, 15)
            doc.addImage({ 
                imageData: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/menu/${restaurantId}`, 
                x: 15,
                y: 20,
                width: 100,
                height: 100
            })
        doc.save("CodigoQR.pdf")
    };
    // hola

    const saveTables = () => {
        const doc = new jsPDF();
        // Cada numero inpar tiene que cambiar de hoja
        for (let table = 1; table <= numberOfTables; table++) {
            if (table % 2 === 1 && table > 1) doc.addPage("a4") 
            let offset = table % 2 === 1 ? 0 : 120 
            doc.text(`Mesa n${table}`, 15, 15 + offset)
            doc.addImage({ 
                imageData: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:3000/menu/${restaurantId}/++${table}`, 
                x: 15,
                y: 20 + offset,
                width: 100,
                height: 100
            })
        }
        doc.save("CodigoQR")
    }

    useEffect(() => {
        
    }, [])

    return (
        <Grid gap={2} padding={5} margin="30px 100px">
          <Text fontSize='4xl'>Genera tus codigos QR</Text>
          <Text color="gray.600" fontSize='2xl'>Los codigos QR llevaran a tus clientes al menu del restaurant, luego de escanearlos con sus telefonos. Generarlos descargara un pdf con todos los codigos deseados, a partir de ahi podes imprimirlos.</Text>
          <br/>
          <Box display="flex" padding={5} border="1px solid black" borderRadius="5px">
              <Box w="50%">
                <Text mb={12}>El codigo QR general llevara a tus clientes al mismo link independientemente de la mesa, ideal si no usaras la funcion de pedidos por medio de la app.</Text>
                <Button colorScheme="blue" onClick={saveGeneral}>General</Button>
              </Box>
              <Box w="50%">
                <Text mb={5}>Si queres generar un codigo por cada mesa para poder hacer uso del sistema de pedidos, ingresa el numero de mesas deseadas y se generaran tantos codigos como mesas. Asegurate de que cada codigo permanezca en la mesa que le corresponde.</Text>
                <Box display="flex">
                    <InputGroup>
                        <Input w="20%" mb={5} type="number" onChange={(e) => setNumberOfTables(e.target.value)} value={numberOfTables}/>
                        <InputRightAddon color="gray.500" children="mesas"/>
                        <Button ml={10} onClick={saveTables} colorScheme="blue" variant="outline">Por mesa</Button>
                    </InputGroup>
                </Box>
              </Box>
          </Box>
        </Grid>
      );
}