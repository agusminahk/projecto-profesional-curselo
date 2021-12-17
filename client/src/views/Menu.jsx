import axios from "axios";
import { useState, useEffect } from "react";
import { CategoriesGrid } from "../components/menu/CategoriesGrid";
import List from "@material-ui/core/List";
import { useParams } from "react-router-dom";
import { Box, Button, Flex, useColorModeValue } from "@chakra-ui/react";

import NavbarMenu from "../components/menu/NavbarMenu";

export const Menu = () => {
    const [products, setProducts] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const { id, table } = useParams();

    useEffect(() => {
        axios({
            method: "GET",
            url: `/api/client/search/${id}?type=allProducts`,
        }).then(({ data }) => {
            setProducts(data);
        });
    }, []);

    useEffect(() => {
        const tempProducts = {};
        products.forEach((item) => {
            if (tempProducts[item?.category?.name]) tempProducts[item?.category?.name].push(item);
            else tempProducts[item?.category?.name] = [item];
        });
        setProductsByCategory(tempProducts);
    }, [products]);

    return (
        <>
            <Box w="full" align="center" pos="fixed" zIndex="2" backgroundColor={useColorModeValue("blue.600", "gray.900")}>
                <NavbarMenu id={id} table={table} />
                <Flex
                    pos="fixed"
                    justify="space-around"
                    boxShadow="lg"
                    p={5}
                    w="100%"
                    backgroundColor={useColorModeValue("blue.600", "gray.900")}
                >
                    {Object.keys(productsByCategory).map((categoria, i) => {
                        return (
                            <a href={`#${categoria}`} key={i}>
                                <Button ml={4}>{categoria || "Otros"}</Button>
                            </a>
                        );
                    })}
                </Flex>
            </Box>
            <Box w="full" h={{ base: "75vh", md: "75vh" }} mt={{ base: "15vh", md: "15vh", lg: "15vh" }} position="absolute">
                <List p={4}>
                    {Object.keys(productsByCategory).map((key, i) => (
                        <CategoriesGrid key={i} products={productsByCategory[key]} table={table} />
                    ))}
                </List>
            </Box>
        </>
    );
};
