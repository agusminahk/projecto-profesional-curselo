import {
    Container,
    Flex,
    Box,
    Heading,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftElement,
    Textarea,
    Image,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail, MdLocationCity } from "react-icons/md";
import { BsPerson, BsInstagram } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";

export default function Contacts() {
    const restaurant = useSelector((state) => state.restaurant.restaurant);
    const { id, table } = useParams();

    return (
        <Box>
            <NavbarMenu id={id} table={table} />

            <Box>
                <Container maxW="full" mt={1} mb={1} centerContent overflow="hidden">
                    <Flex>
                        <Box
                            bg="#02054B"
                            color="white"
                            borderRadius="lg"
                            m={{ sm: 4, md: 16, lg: 10 }}
                            p={{ sm: 5, md: 5, lg: 16 }}
                        >
                            <Box p={4}>
                                <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                    <WrapItem>
                                        <Box>
                                            <HStack>
                                                <Heading>{restaurant?.name}</Heading>
                                                {restaurant?.logo?.data && (
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="150px"
                                                        src={`data:image/png;base64,${Buffer.from(
                                                            restaurant?.logo?.data,
                                                            " "
                                                        ).toString("base64")}`}
                                                        alt={restaurant?.name}
                                                    />
                                                )}
                                            </HStack>

                                            <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                                <VStack pl={0} spacing={3} alignItems="flex-start">
                                                    {restaurant?.contact?.telephone && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<MdPhone color="#1970F1" size="20px" />}
                                                        >
                                                            {restaurant?.contact?.telephone}
                                                        </Button>
                                                    )}

                                                    {restaurant?.contact?.webpage && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<CgWebsite color="#1970F1" size="20px" />}
                                                        >
                                                            {restaurant?.contact?.webpage}
                                                        </Button>
                                                    )}

                                                    {restaurant?.contact?.email && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<MdEmail color="#1970F1" size="20px" />}
                                                        >
                                                            {restaurant?.contact?.email}
                                                        </Button>
                                                    )}

                                                    {restaurant?.location?.country && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<MdLocationOn color="#1970F1" size="20px" />}
                                                        >
                                                            {`${restaurant?.location?.country}, ${restaurant?.location?.province}`}
                                                        </Button>
                                                    )}

                                                    {restaurant?.location?.country && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<MdLocationCity color="#1970F1" size="20px" />}
                                                        >
                                                            {`${restaurant?.location?.city}, ${restaurant?.location?.direction}`}
                                                        </Button>
                                                    )}

                                                    {restaurant?.contact?.instagram && (
                                                        <Button
                                                            _focus={{ outline: "none" }}
                                                            size="md"
                                                            variant="ghost"
                                                            color="#DCE2FF"
                                                            _hover={{ border: "2px solid #1C6FEB" }}
                                                            leftIcon={<BsInstagram color="#1970F1" size="20px" />}
                                                        >
                                                            {restaurant?.contact?.instagram}
                                                        </Button>
                                                    )}
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </WrapItem>
                                    <WrapItem>
                                        <Box bg="white" borderRadius="lg">
                                            <Box m={8} color="#0B0E3F">
                                                <VStack spacing={5}>
                                                    <FormControl id="name">
                                                        <FormLabel>Your Name</FormLabel>
                                                        <InputGroup borderColor="#E0E1E7">
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<BsPerson color="gray.800" />}
                                                            />
                                                            <Input type="text" size="md" />
                                                        </InputGroup>
                                                    </FormControl>
                                                    <FormControl id="name">
                                                        <FormLabel>Mail</FormLabel>
                                                        <InputGroup borderColor="#E0E1E7">
                                                            <InputLeftElement
                                                                pointerEvents="none"
                                                                children={<MdOutlineEmail color="gray.800" />}
                                                            />
                                                            <Input type="text" size="md" />
                                                        </InputGroup>
                                                    </FormControl>
                                                    <FormControl id="name">
                                                        <FormLabel>Message</FormLabel>
                                                        <Textarea
                                                            borderColor="gray.300"
                                                            _hover={{
                                                                borderRadius: "gray.300",
                                                            }}
                                                            placeholder="message"
                                                        />
                                                    </FormControl>
                                                    <FormControl id="name" float="right">
                                                        <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                                                            Send Message
                                                        </Button>
                                                    </FormControl>
                                                </VStack>
                                            </Box>
                                        </Box>
                                    </WrapItem>
                                </Wrap>
                            </Box>
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </Box>
    );
}
