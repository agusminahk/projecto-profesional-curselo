import { useEffect, useState } from "react"
import { SubCategoryGrid } from "./SubCategoryGrid"
import { Box, Text, Divider } from "@chakra-ui/layout"

export const CategoriesGrid = ({ products, category }) => {
    const [productsBySubategory, setProductsBySubategory] = useState({})

    useEffect(() => {
        const tempProducts = {}
        products.forEach(item => {
            if (tempProducts[item.subcategory[0]]) tempProducts[item.subcategory[0]].push(item)
            else tempProducts[item.subcategory[0]] = [item]
        })
        console.log("tmp sub", tempProducts)
        setProductsBySubategory(tempProducts)
    }, [])

    return (<>
        <Box ml={{ base: 4, md: 6, lg: 8 }} mr={{ base: 4, md: 6, lg: 8 }}   >
            
            <Text fontSize="3xl" id={products[0] ? products[0].category.name : ""} >
                {products[0] ? products[0].category.name : ""}
            </Text>
        <Divider />
        </Box>
        {
            Object.keys(productsBySubategory).map(key => <SubCategoryGrid key={key} products={productsBySubategory[key]}/>)
        }
    </>)
}