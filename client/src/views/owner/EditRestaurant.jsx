import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RestaurantInfo } from "./RestaurantInfo";
import { useToast } from "@chakra-ui/react";
import {
  chakra,
  FormHelperText,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text, 
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import validateImage from "../../hook/validateHook"

export const EditRestaurant = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurant);
  console.log(restaurant)

/*
  const [webpage, setWebpage] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState(""); 
  const [suscrip, setSuscrip] = useState("");
  const [search, setSearch] = useState("");*/
  const toast = useToast();

 
  useEffect (() => {
    /*
    axios
    .get(`api/admin/search?type=restaurant&id=${user.restaurantId}`)
    .then(res => res.data)
    .then(data => {
      setWebpage(data.contact.webpage)
      setEmail(data.contact.email)
      setInstagram(data.contact.instagram)
      setTelephone(data.contact.telephone)
      setLogo(data.logo)
      setBanner(data.banner)
    })*/
  }, [])

let errors

  const formik = useFormik({
    initialValues: {
      webpage: restaurant?.contact?.webpage || "",
      email: restaurant?.contact?.email || "",
      telephone: restaurant?.contact?.instagram || "",
      instagram: restaurant?.contact?.telephone || "",
      logo: restaurant?.logo || "",
      banner: restaurant?.banner || "",
      suscrip: "",
    },
    validate:  values =>{
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Email invalido";
        }
        if (!values.logo) {
          errors.logo = "Required";
        } else if (!validateImage("file-upload")) {
          errors.logo = "Imagen muy grande";
        }
        if (!values.banner) {
          errors.banner = "Required";
        } else if (!validateImage("fileupload")) {
          errors.banner = "Imagen muy grande";
        }
        return errors;
    },
    onSubmit: (values) => {
      /* axios
      .put(`api/admin/restaurant/${user.restaurantId}`, values)
      .then(()=>{
        toast({
        title: `Guardado`,
        status: "success",
        isClosable: true,
      });
      setSearch("change")
      }) */
    },
  });
 
  
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      p={10}
      w={{ base: "full", md: "78%", xl: "82%" }}
      ml={{ base: "0", md: "22%", xl: "18%" }}
    >
      <RestaurantInfo restaurant={restaurant}/>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          ></Box>
        </Box>
      </Box>

      <Box>
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Perfil
              </Heading>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              onSubmit={formik.handleSubmit}
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={formik.errors.webpage && formik.touched.webpage}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Pagina Web
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        children="http://"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                      />
                      <Input
                        type="webpage"
                        name="webpage"
                        placeholder="www.example.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.webpage}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[3, 2]} isInvalid={errors?.email}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Email de atencion al cliente
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        type="email"
                        name="email"
                        placeholder="ejemplo@gmail.com"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <FormHelperText>
                        {errors?.email ? errors.email : null}
                      </FormHelperText>
                    </InputGroup>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Telefono publico del restaurante
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        type="telephone"
                        name="telephone"
                        placeholder="+54 3492 685742"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Perfil de Instagram
                    </FormLabel>
                    <InputGroup size="sm">
                      <InputLeftAddon
                        children="http://"
                        bg={useColorModeValue("gray.50", "gray.800")}
                        color={useColorModeValue("gray.500", "gay.50")}
                        rounded="md"
                      />
                      <Input
                        type="instagram"
                        name="instagram"
                        placeholder="instagram.com/curselo_ok?utm_medium=copy_link"
                        focusBorderColor="brand.400"
                        rounded="md"
                        value={formik.values.instagram}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Logo
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    {formik.values.logo ?
                    <Avatar
                    boxSize={12}
                    bg={formik.values.logo}
                    mt={3}
                    rounded="full"
                    />
                    :  
                      <Avatar
                        boxSize={12}
                        bg="gray.100"
                        icon={
                          <Icon
                            as={FaUser}
                            boxSize={9}
                            mt={3}
                            rounded="full"
                            color="gray.300"
                          />
                        }
                      />
                    }
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      bgColor="gray.300"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      onChange={() => validateImage("file-upload", toast)}
                    />
                    
                  </Flex>
                  <FormHelperText>
                        {false ? errors.logo : null}
                      </FormHelperText>
                </FormControl>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Foto de portada
                  </FormLabel>
                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={useColorModeValue("gray.300", "gray.500")}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    {formik.values.banner ?
                    <>
                    <Stack bgImage={formik.values.banner}/>
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      bgColor="gray.300"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                      onChange={() => validateImage("file-upload", toast)}
                    />
                    </>
                    :
                    (<Stack spacing={1} textAlign="center">
                      <Icon
                        mx="auto"
                        boxSize={12}
                        color="gray.500"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Icon>
                      <Flex
                        fontSize="sm"
                        color="gray.600"
                        alignItems="baseline"
                      >
                        <chakra.label
                          htmlFor="file-upload"
                          cursor="pointer"
                          rounded="md"
                          fontSize="md"
                          color="brand.600"
                          pos="relative"
                          fontWeight="bold"
                          _hover={{
                            textDecoration: "underline",
                          }}
                        >
                          Sube un archivo
                          <VisuallyHidden>
                            <input
                              id="fileupload"
                              name="file-upload"
                              type="file"
                              onChange={() =>
                              validateImage("fileupload", toast)
                              }
                            />
                          </VisuallyHidden>
                        </chakra.label>
                        <Text pl={1}>o arrastrar y soltar</Text>
                      </Flex>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                      >
                        PNG, JPG, GIF hasta 10MB
                      </Text>
                    </Stack>)}
                  </Flex>
                  <FormHelperText>
                    {errors?.banner ? errors.banner : null}
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                textAlign="right"
              >
                <Button
                  type="submit"
                  colorScheme="brand"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  bgColor="gray.300"
                >
                  Guardar
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
      </Box>
      <Box visibility={{ base: "hidden", sm: "visible" }} aria-hidden="true">
        <Box py={5}>
          <Box
            borderTop="solid 1px"
            borderTopColor={useColorModeValue("gray.200", "whiteAlpha.200")}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};
