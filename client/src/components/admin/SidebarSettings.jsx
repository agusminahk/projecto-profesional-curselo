import React from "react";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure,
  Stack,
  Button,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";

export function SidebarSettings() {
  const sidebar = useDisclosure();

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        // color="whiteAlpha.700"
        _hover={{
          bg: "blackAlpha.300",
          // color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        w="40px"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      mt="80px"
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.600"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text icon={BsGearFill} fontSize="2xl" ml="2" /* color="white" */ fontWeight="semibold">
          Settings
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" /* color="gray.600" */ aria-label="Main Navigation">
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={HiCollection}>veremos</NavItem>
        <NavItem icon={FaClipboardCheck}>Personalizar</NavItem>
        <NavItem icon={AiFillGift}>veremos</NavItem>
        <NavItem icon={BsGearFill}>Editar perfil</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box as="section" bg={useColorModeValue("black.50", "black.700")} minH="100vh">
      <SidebarContent display={{ base: "none", md: "unset" }} />

      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex>
          <Stack
            display={{ base: "inline-flex", md: "none" }}
            bg="#1A202C"
            direction="row"
            spacing={5}
            align="center"
          >
            <Button mr="10px" colorScheme="teal" variant="outline">
              Personalizar
            </Button>
            <Button margin="10px" colorScheme="teal" variant="outline">
              Editar datos
            </Button>
          </Stack>
        </Flex>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis dicta, molestiae ullam, laborum
          labore blanditiis odit quod excepturi reprehenderit deserunt, id repellendus optio. Pariatur
          doloremque accusantium mollitia optio odio qui.
        </Text>
      </Box>
    </Box>
  );
}
//<FiMenu />
