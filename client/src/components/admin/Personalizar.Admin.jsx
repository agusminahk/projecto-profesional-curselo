import React from "react";

import { Box, Button, chakra, Flex, SimpleGrid, useColorModeValue, Image } from "@chakra-ui/react";

export function PersonalizarAdmin() {
  return (
    <Box shadow="xl" bg="white" px={8} py={20} mx="auto">
      <SimpleGrid
        alignItems="start"
        columns={{ base: 1, md: 2 }}
        mb={24}
        spacingY={{ base: 10, md: 32 }}
        spacingX={{ base: 10, md: 24 }}
      >
        <Box>
          <chakra.h2
            mb={4}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{ base: "center", md: "left" }}
            color={useColorModeValue("white", "black")}
            lineHeight={{ md: "shorter" }}
          >
            Modo Uno
          </chakra.h2>
          <chakra.p
            mb={5}
            textAlign={{ base: "center", sm: "left" }}
            // color={useColorModeValue("black", "black")}
            fontSize={{ md: "lg" }}
          >
            En este Modo vas a tener todo Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus suscipit doloribus a
          </chakra.p>
          <Button
            w={{ base: "full", sm: "auto" }}
            size="lg"
            // bg={useColorModeValue("gray.900", "gray.700")}
            // _hover={{ bg: useColorModeValue("gray.700", "gray.600") }}
            // color={useColorModeValue("gray.100", "gray.200")}
            as="a"
          >
            Elegir Modo
          </Button>
        </Box>
        <Box w="full" h="full" py={3} bg={useColorModeValue("gray.200", "gray.700")}>
          <Image
            m="auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjmkowJSMO64qvA-ogkeDYvHIngQgdS--2LLFEBcTGu39xvBwPryfW0yzHDn1Euma3YU&usqp=CAU"
          />
        </Box>
      </SimpleGrid>
      <SimpleGrid
        borderTop="2px"
        borderColor="black"
        alignItems="center"
        columns={{ base: 1, md: 2 }}
        flexDirection="column-reverse"
        mb={24}
        spacingY={{ base: 10, md: 32 }}
        spacingX={{ base: 10, md: 24 }}
      >
        <Box order={{ base: "none", md: 2 }}>
          <chakra.h2
            mt="30px"
            mb={4}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{ base: "center", md: "left" }}
            
            lineHeight={{ md: "shorter" }}
          >
            Modo Dos
          </chakra.h2>
          <chakra.p
            mb={5}
            textAlign={{ base: "center", sm: "left" }}
            
            fontSize={{ md: "lg" }}
          >
            Gracias a es modo se podran destacar ...Next to our ready-made and free plugins you can use our
            expansive yet simple API; decide how you integrate Payments and build advanced and reliable
            products yourself from scratch.
          </chakra.p>
          <Button
            w={{ base: "full", sm: "auto" }}
            size="lg"
            // bg={useColorModeValue("white", "black")}
            // _hover={{ bg: useColorModeValue("gray.700", "gray.600") }}
            // color={useColorModeValue("gray.100", "gray.200")}
            as="a"
          >
            Elegir Modo
          </Button>
        </Box>

        <Box w="full" h="full" mt="30px" py={3} bg={useColorModeValue("gray.200", "gray.700")}>
          <Image
            m="auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjmkowJSMO64qvA-ogkeDYvHIngQgdS--2LLFEBcTGu39xvBwPryfW0yzHDn1Euma3YU&usqp=CAU"
          />
        </Box>
      </SimpleGrid>

      <SimpleGrid
        borderTop="2px"
        borderColor="black"
        alignItems="start"
        columns={{ base: 1, md: 2 }}
        mb={24}
        spacingY={{ base: 10, md: 32 }}
        spacingX={{ base: 10, md: 24 }}
      >
        <Box>
          <chakra.h2
            mt="40px"
            mb={4}
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="extrabold"
            letterSpacing="tight"
            textAlign={{ base: "center", md: "left" }}
            // color={useColorModeValue("white", "black")}
            lineHeight={{ md: "shorter" }}
          >
            Modo Tres
          </chakra.h2>
          <chakra.p
            mb={5}
            textAlign={{ base: "center", sm: "left" }}
            // color={useColorModeValue("white", "black")}
            fontSize={{ md: "lg" }}
          >
            En este modo tu menu va a resaltar handle your subscriptions and transactions efficiently with the
            clear overview in Dashboard. Features like the smart search option allow you to quickly find any
            data you’re looking for.
          </chakra.p>
          <Button
            w={{ base: "full", sm: "auto" }}
            size="lg"
            // bg={useColorModeValue("gray.900", "gray.700")}
            // _hover={{ bg: useColorModeValue("gray.700", "gray.600") }}
            // color={useColorModeValue("gray.100", "gray.200")}
            as="a"
          >
            Elegir Modo
          </Button>
        </Box>
        <Box w="full" mt="30px" h="full" py={3} bg={useColorModeValue("gray.200", "gray.700")}>
          <Image
            m="auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjmkowJSMO64qvA-ogkeDYvHIngQgdS--2LLFEBcTGu39xvBwPryfW0yzHDn1Euma3YU&usqp=CAU"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
