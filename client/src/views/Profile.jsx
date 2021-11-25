import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

export function Profile() {
  const user = {
    username: "Pato123",
    firstName: "Patricio",
    lastName: "Anastacio",
    email: "patricioanastacio01@gmail.com",
    restaurant: "Burguer king",
    restaurantID: "fa65gf4aerg4a6h4at6hatha",
    rol: "dueño",
  };
  return (
    <Box padding="50px">
      <Box
        boxShadow="dark-lg"
        p="6"
        rounded="md"
        bg="white"
        m="auto"
        minWidth="350px"
        maxWidth="700px"
        background="#254E70"
        color="#FFF"
      >
        <Text
          fontSize="4xl"
          fontWeight="600"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <u>Tu perfil</u>
        </Text>
        <br />
        <br />
        <br />
        <UnorderedList fontSize="xl">
          <Text>Nombre usuario: {user.username}</Text>
          <br />
          <Text>Nombre: {user.firstName}</Text>
          <br />
          <Text>Apellido: {user.lastName}</Text>
          <br />
          <Text>Email: {user.email}</Text>
          <br />
          <Text>Restaurante: {user.restaurant}</Text>
          <br />
          <Text>ID de restaurante: {user.restaurantID}</Text>
          <br />
          <Text>Rol: {user.rol}</Text>
          <br />
        </UnorderedList>
      </Box>
    </Box>
  );
}
