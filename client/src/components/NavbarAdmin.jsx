import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../state/userSlice";
import { deleteRestaurant } from "../state/restaurantSlice";
import axios from "axios";

export const NavbarAdmin = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const navigate = useNavigate()

  const restaurant = useSelector(state => state.restaurant.restaurant)
  const user = useSelector(state => state.user.user)

  const [patiado, setPatiado] = useState({})

  const dispatch = useDispatch()

  const logout = () => {
    axios({
      method: "get",
      url: "/api/auth/logout"
    })
    .then(() => dispatch(logoutUser()))
    .then(() => dispatch(deleteRestaurant()))
    .then(() => navigate("/admin/login"))
    .catch(() => {})
  }

  useEffect(() => {
    console.log(restaurant)
    setPatiado(restaurant)
  }, [restaurant])

  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        backgroundColor="blue.600"
        color="gray.50"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" >
          <Flex>
            <chakra.a href="/" title="Choc Home Page" display="flex" alignItems="center">
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
            <Link to="/admin/">
              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                {console.log(restaurant)}
                {user?.role === "superadmin" ? "SuperAdmin" : patiado.name}
                {user?.role === "superadmin" || patiado.state ? "" : " (demo)"}
              </chakra.h1>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack spacing={1} mr={1} color="brand.500" display={{ base: "none", md: "inline-flex" }}>
              <Link to="/perfil">
                <Button variant="ghost">Perfil</Button>
              </Link>
              <Link to="/alcance">
                <Button variant="ghost">Alcance</Button>
              </Link>
              <Button onClick={logout} variant="ghost">Cerrar sesión</Button>
            </HStack>
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.50", "inherit")}
                _hover={{backgroundColor: "blue.900"}}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={"blue.800"}
                spacing={3}
                rounded="sm"
                shadow="sm"
                borderRadius="15px"
                boxShadow="dark-lg"
              >
                <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
                <Link to="/admin/perfil">
                  <Button w="full" variant="ghost" onClick={mobileNav.onClose}>
                    Perfil
                  </Button>
                </Link>
                <Link to="/alcance">
                  <Button w="full" variant="ghost" onClick={mobileNav.onClose}>
                    Alcance
                  </Button>
                </Link>
                <Button onClick={logout} w="full" variant="ghost" onClick={mobileNav.onClose}>
                  Cerrar sesión
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
