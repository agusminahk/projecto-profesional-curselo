import React from 'react';
import {
    Flex,
    Text,
    Button,
    useDisclosure,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Modal,
    ModalFooter,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalContent,
} from '@chakra-ui/react';
import { BsFillPatchCheckFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { VscChromeClose } from 'react-icons/vsc';
import 'animate.css';

import useActivate from '../hook/useActivate';
import { useState } from 'react';

const settings = { fontWeight: '500', fontSize: '0.75rem', letterSpacing: '0.4px' };

const activeBtn = {
    leftIcon: <BsFillPatchCheckFill />,
    h: '1.9rem',
    fontWeight: 'bold',
    color: 'white',
    bg: 'teal.500',
    px: '4',
    mx: '4',
    transition: 'all 0.4s ease',
    _hover: { bg: 'teal.100', color: 'teal.900' },
};

const rejectBtn = {
    leftIcon: <VscChromeClose />,
    h: '1.9rem',
    mx: '4',
    color: 'white',
    bg: 'red.800',
    px: '6',
    transition: 'all 0.4s ease',
    _hover: { bg: 'red.100', color: 'red.900' },
};

const ActivateCard = ({ resto: { name, URL, location, _id }, restaurants, setRest }) => {
    const [denegado, setDenegado] = useState(false);
    const [activado, setActivado] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isActive, onOpen: onActive, onClose: onActiveClose } = useDisclosure();
    const { _handleReject, _handleActivate } = useActivate();

    return (
        <AccordionItem
            boxShadow={'base'}
            borderRadius={'10px'}
            bg="gray.50"
            className={
                (denegado && 'animate__animated animate__bounceOutLeft') ||
                (activado && 'animate__animated animate__bounceOutRight') ||
                'animate__animated animate__fadeInUp'
            }
        >
            {({ isExpanded }) => {
                return (
                    <div>
                        <h2>
                            <AccordionButton boxShadow="md">
                                <Box flex="1" textAlign="center" fontWeight="500" letterSpacing={1}>
                                    {name}
                                </Box>
                                {isExpanded ? (
                                    <BsFillEyeSlashFill fontSize="22px" />
                                ) : (
                                    <BsFillEyeFill fontSize="22px" />
                                )}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            bg={'gray.800'}
                            display={((activado || denegado) && 'none') || 'inherit'}
                            color="white"
                            fontSize="0.7rem"
                            transition="all 2s ease"
                        >
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Direccion: </span>
                                {location.direction}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Ciudad: </span>
                                {location.city}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Provincia: </span>
                                {location.province}
                            </Text>
                            <Text>
                                <span style={{ ...settings }}> &#x2022; Pais: </span>
                                {location.country}
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
                                <Button {...activeBtn} onClick={onActive}>
                                    Activar
                                </Button>
                                <Modal closeOnOverlayClick={false} isOpen={isActive} onClose={onActiveClose}>
                                    <ModalOverlay backdropFilter="blur(2px)" />
                                    <ModalContent top="30vh">
                                        <ModalHeader borderBottom={'gray'} borderBottomStyle={'groove'}>
                                            Activar Cliente
                                        </ModalHeader>

                                        <ModalCloseButton />
                                        <ModalBody pb={2}>
                                            <Text>
                                                Esta seguro de Activar a:
                                                <span style={{ fontWeight: 'bold' }}> {name} ?</span>
                                            </Text>
                                        </ModalBody>

                                        <ModalFooter display="flex" direction="row" justifyContent="center">
                                            <Button {...rejectBtn} onClick={() => onActiveClose()}>
                                                Cancelar
                                            </Button>
                                            <Button
                                                {...activeBtn}
                                                px={7}
                                                isLoading={activado}
                                                onClick={() => {
                                                    setActivado(true);
                                                    _handleActivate(_id, name);
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 1000);
                                                }}
                                            >
                                                Activar
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <Button {...rejectBtn} onClick={onOpen}>
                                    Denegar
                                </Button>
                                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay backdropFilter="blur(2px)" />
                                    <ModalContent top="30vh">
                                        <ModalHeader borderBottom={'gray'} borderBottomStyle={'groove'}>
                                            Denegar Cliente
                                        </ModalHeader>

                                        <ModalCloseButton />
                                        <ModalBody pb={2}>
                                            <Text>
                                                Esta seguro de denegar a:
                                                <span style={{ fontWeight: 'bold' }}> {name} ?</span>
                                            </Text>
                                        </ModalBody>

                                        <ModalFooter display="flex" direction="row" justifyContent="center">
                                            <Button
                                                {...rejectBtn}
                                                leftIcon={<RiDeleteBin6Line />}
                                                isLoading={denegado}
                                                onClick={() => {
                                                    setDenegado(true);
                                                    _handleReject(_id, name);
                                                    setTimeout(() => {
                                                        window.location.reload();
                                                    }, 1000);
                                                }}
                                            >
                                                Denegar
                                            </Button>
                                            <Button
                                                {...activeBtn}
                                                leftIcon={<VscChromeClose />}
                                                px={7}
                                                onClick={onClose}
                                            >
                                                Cancelar
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Flex>
                        </AccordionPanel>
                    </div>
                );
            }}
        </AccordionItem>
    );
};

export default ActivateCard;
