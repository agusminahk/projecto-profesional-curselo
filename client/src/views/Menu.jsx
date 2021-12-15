import axios from "axios"
import { useState, useEffect } from "react"
import { CategoriesGrid } from "../components/menu/CategoriesGrid"
import { HeaderMenu } from "../components/menu/HeaderMenu"
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { useLocation } from "react-router-dom"
import {
  Text,
  Box,
  Button,
  Flex,
  Input,
  SimpleGrid,
  useColorModeValue,
  chakra,
  Grid, GridItem,
  Image,
} from "@chakra-ui/react";
import { MdAddShoppingCart } from "react-icons/md";

export const Menu = () => {
    // Traer la data del restaurant
    const [products, setProducts] = useState([])
    const [productsByCategory, setProductsByCategory] = useState({})
    const [searchVal, setSearchVal] = useState("")
    const location = useLocation()

    useEffect(() => {
        const restaurantId = location.pathname.split("/")[2]

        axios({
            method: "GET",
            url: `/api/admin/search?id=${restaurantId}&type=product`
        })
        .then(({data}) => setProducts(data))
    }, [])

    useEffect(() => {
        const tempProducts = {}
        products.forEach(item => {
            if (tempProducts[item.category.name]) tempProducts[item.category.name].push(item)
            else tempProducts[item.category.name] = [item]
        })
        console.log("tmp", tempProducts)
        setProductsByCategory(tempProducts)
    }, [products])

    
    useEffect(() => {
        
    }, [])

    useEffect(() => console.log("ASHE", products), [products])


    return (
        <>
            <Box
                w="full"
                align="center"
                pos="fixed"
                zIndex="2"
                backgroundColor={useColorModeValue("blue.600", "gray.900")}
            >
                <Input type="text" mt="10px" w="70%" placeholder="Buscar" mb={2} value={searchVal} bgColor="blue.50" onChange={(e) => setSearchVal(e.target.value)}/>
                <Flex
                    pos="fixed"
                    justify="space-around"
                    boxShadow="lg"
                    p={5}
                    w="100%"
                    backgroundColor={useColorModeValue("blue.600", "gray.900")}
                >
                { Object.keys(productsByCategory).map((categoria, i) => (
                    <a  href={`#${categoria}`} key={i} >
                    <Button ml={4}>{categoria}</Button>
                    </a>
                ))}
                </Flex>
            </Box>
            <Box  w="full" h={{base:"75vh", md:"75vh"}} mt={{base:"15vh", md:"15vh", lg:"15vh"}} position="absolute" /*overflowY={"scroll"}*/ >
                <List p={4} >
                    {console.log("LOG2", productsByCategory)}
                {
                    Object.keys(productsByCategory).map((key, i) => <CategoriesGrid key={i} products={productsByCategory[key]}/>)
                }
                </List>
            </Box>
        </>
    )
}