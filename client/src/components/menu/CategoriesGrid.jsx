import { useEffect, useState } from "react";
import { SubCategoryGrid } from "./SubCategoryGrid";
import { Box, Text, Divider } from "@chakra-ui/layout";

export const CategoriesGrid = ({ products, category, table }) => {
    const [productsBySubategory, setProductsBySubategory] = useState({});

    useEffect(() => {
        const tempProducts = {};
        products.forEach((item) => {
            if (tempProducts[item?.subcategory[0]]) tempProducts[item?.subcategory[0]].push(item);
            else tempProducts[item?.subcategory[0]] = [item];
        });
        setProductsBySubategory(tempProducts);
    }, []);

    return (
        <>
            <Box ml={{ base: 4, md: 6, lg: 8 }} mr={{ base: 4, md: 6, lg: 8 }}>
                <Text fontSize="3xl" id={products.length ? products[0]?.category?.name : ""}>
                    {products.length > 0 ? products[0]?.category?.name : ""}
                </Text>
                <Divider />
            </Box>
            {Object.keys(productsBySubategory).map((key) => (
                <SubCategoryGrid key={key} products={productsBySubategory[key]} table={table} />
            ))}
        </>
    );
};
