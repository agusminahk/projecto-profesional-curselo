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
  Heading,
} from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Divider } from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";
import { React } from "react";
import { Link } from "react-router-dom";
import { EditUser } from "../../components/admin/EditUser";

export function EditDatos() {
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
        color="black"
        _hover={{
          bg: "blackAlpha.300",
          color: "blue.600",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        w="full"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "blue.600",
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
      bg="white"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      color="black"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Text icon={BsGearFill} fontSize="2xl" ml="2" fontWeight="semibold">
          Settings
        </Text>
      </Flex>
      <Flex direction="column" as="nav" fontSize="sm" color="gray.600" aria-label="Main Navigation">
        <NavItem icon={MdHome}>Home</NavItem>
        <NavItem icon={HiCollection}>veremos</NavItem>
        <Link to="/personalizar">
          <NavItem icon={FaClipboardCheck}>Personalizar</NavItem>{" "}
        </Link>
        <NavItem icon={AiFillGift}>veremos</NavItem>
        <Link to="/editar">
          <NavItem bg="blackAlpha.300" color="blue.600" icon={BsGearFill}>
            Editar perfil
          </NavItem>
        </Link>
      </Flex>
    </Box>
  );
  return (
    <Box ml={{ base: 0, md: 60 }} transition=".3s ease" bg="white">
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Flex>
        <Stack
          display={{ base: "inline-flex", md: "none" }}
          bg="white"
          direction="row"
          spacing={5}
          align="center"
        >
          <Box ml="45px">
            <Link to="/personalizar">
              <Button color="black" mr="10px" colorScheme="black.100" variant="outline">
                Personalizar
              </Button>
            </Link>
            <Link to="/editar">
              <Button color="black" bg="gray.200" margin="10px" colorScheme="black.100" variant="outline">
                Editar perfil
              </Button>
            </Link>
          </Box>
        </Stack>
      </Flex>
      <Box>
        <Heading>Editar perfil</Heading>

        <Divider />

        <EditUser />
      </Box>
    </Box>
  );
}
