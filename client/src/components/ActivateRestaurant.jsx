import React from 'react';
import { Flex, Text, Button, Box, Accordion, Wrap, Divider } from '@chakra-ui/react';

import useActivate from '../hook/useActivate';
import ActivateCard from '../common/ActivateCard';

const ActivateRestaurant = () => {
    const { restaurants } = useActivate();
    console.log(restaurants);

    return (
        <Flex
            bg="white"
            color="gray.800"
            display="flex"
            direction="column"
            maxW="98vw"
            minW="98vw"
            margin="0 auto"
            top="12vw"
            position="relative"
            style={{ maxHeight: 'calc(100vh-12vw)' }}
        >
            <Box
                fontSize="1.3rem"
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
                    ? restaurants.map((resto) => {
                          return (
                              <Accordion allowToggle w="full" margin="0 auto" textAlign="center">
                                  <ActivateCard resto={resto} />
                              </Accordion>
                          );
                      })
                    : null}
            </Wrap>
        </Flex>
    );
};

export default ActivateRestaurant;
