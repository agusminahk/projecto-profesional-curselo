import { Box, useColorModeValue } from "@chakra-ui/react";
import { RestaurantInfo } from "./RestaurantInfo";

export const CreateRestaurant = () => {
    return (
        <>
        <Box
        bg={useColorModeValue("gray.50", "inherit")}
        p={10}
        w={{ base: "full", md: "78%", xl: "82%" }}
        ml={{ base: "0", md: "22%", xl: "18%" }}
        >
            <Box fontSize="3xl">Crear restaurant</Box>
            <br/>
            <RestaurantInfo />
        </Box>
        </>
    )
}