import React, { useState } from 'react';
import { Flex, Text, Button, Box, Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@chakra-ui/react';
import { MinusIcon, AddIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { VscChromeClose } from 'react-icons/vsc';

const ActivateCard = ({
    resto: {
        name,
        URL,
        email,
        location: { city, country, direction, province },
    },
}) => {
    const [expanded, setExpanded] = useState(false);

    const settings = { fontWeight: '500', fontSize: '0.75rem', letterSpacing: '0.4px' };

    return (
        <AccordionItem boxShadow={'base'} borderRadius={'10px'} bg="gray.100">
            {({ isExpanded }) => {
                return (
                    <div>
                        <h2>
                            <AccordionButton boxShadow="md">
                                <Box flex="1" textAlign="center" fontWeight="500" letterSpacing={1}>
                                    {name}
                                </Box>
                                {isExpanded ? <MinusIcon fontSize="12px" /> : <AddIcon fontSize="12px" />}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} bg="gray.800" color="white" fontSize="0.7rem">
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Direccion: </span>
                                {direction}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Ciudad: </span>
                                {city}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Provincia: </span>
                                {province}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Pais: </span>
                                {country}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; URL: </span>
                                {URL}
                            </Text>

                            <Flex
                                display="flex"
                                flexDirection="row"
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                                pt="3"
                            >
                                <Button
                                    leftIcon={<BsFillPatchCheckFill />}
                                    h="1.9rem"
                                    fontWeight={'bold'}
                                    color="white"
                                    bg="teal.500"
                                    px="4"
                                    mx={4}
                                    transition="all 0.4s ease"
                                    _hover={{ bg: 'teal.100', color: 'teal.900' }}
                                >
                                    Activar
                                </Button>
                                <Button
                                    leftIcon={<VscChromeClose />}
                                    h="1.9rem"
                                    mx={4}
                                    color="white"
                                    bg="red.800"
                                    px="6"
                                    transition="all 0.4s ease"
                                    _hover={{ bg: 'red.100', color: 'red.900' }}
                                >
                                    Denegar
                                </Button>
                            </Flex>
                        </AccordionPanel>
                    </div>
                );
            }}
        </AccordionItem>
    );
};

export default ActivateCard;
