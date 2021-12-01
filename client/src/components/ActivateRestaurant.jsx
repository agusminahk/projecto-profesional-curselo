import React from 'react';
import { Flex, Text, Box, Accordion, Wrap } from '@chakra-ui/react';

import useActivate from '../hook/useActivate';
import ActivateCard from '../common/ActivateCard';

const ActivateRestaurant = () => {
    const { restaurants, setRestaurants } = useActivate();

    return (
        <Flex
            bg="white"
            color="gray.800"
            display="flex"
            direction="column"
            maxW="98vw"
            minW="98vw"
            minH="90vh"
            margin="0 auto"
            top="10vh"
            position="relative"
            style={{ maxHeight: 'calc(100vh-12vw)' }}
        >
            <Box
                fontSize="2rem"
                boxShadow="base"
                h="3rem"
                justifyContent="space-between"
                display="flex"
                flexDirection="column"
            >
                <span />
                <Text ml="2" fontWeight="600" textShadow={'0px 1px 1px rgba(0,0,0, 0.3)'}>
                    Activar Clientes
                    <Text maxH="0.2px" w="43vw" mt="-1"></Text>
                </Text>
            </Box>

            <Wrap spacing="5px" justifyContent="center" maxW={'98vw'} py={5}>
                {restaurants.length
                    ? restaurants.map((resto, idx) => {
                          return (
                              <Accordion allowToggle w="full" h="full" margin="0 auto" textAlign="center" key={idx}>
                                  <ActivateCard resto={resto} restaurants={restaurants} setRest={setRestaurants} />
                              </Accordion>
                          );
                      })
                    : null}
            </Wrap>
        </Flex>
    );
};

export default ActivateRestaurant;
