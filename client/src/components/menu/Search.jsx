import React, { useState } from "react";
import NavbarMenu from "./NavbarMenu";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, useColorModeValue, Grid } from "@chakra-ui/react";
import ListProducts from "./ListProducts";
import { useEffect } from "react";
import axios from "axios";

function Search() {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const [product, setProduct] = useState([]);
    const { type, name, id, table } = useParams();

    useEffect(() => {
        axios.get(`/api/client/search/${id}?type=${type}&name=${name}`).then(({ data }) => {
            if (type === "category") {
                setProduct(data[0].productId);
            } else {
                setProduct(data);
            }
        });
    }, [name, type]);
    
    return (
        <Box>
            <NavbarMenu restaurant={restaurant} id={id} table={table} />
            <Box>
                <Grid mt={2} templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(5, 1fr)" }}>
                    {product.map((e) => (
                        <ListProducts item={e} id={id} table={table} />
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Search;
