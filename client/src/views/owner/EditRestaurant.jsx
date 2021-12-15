import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RestaurantInfo } from "./RestaurantInfo";
import { useToast } from "@chakra-ui/react";
import { ManageBanner } from "../../components/admin/ManageBanner";
import {
  chakra,
  FormHelperText,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Avatar,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import validateImage from "../../hook/validateHook";
import FormData from "form-data";

export const EditRestaurant = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  let logo = restaurant.logo?.data
    ? `data:image/jpeg;base64,${Buffer.from(
        restaurant?.logo?.data.data,
        " "
      ).toString("base64")}`
    : "";

  const [previewLog, setPreviewLog] = useState("");
  const [imgLogo, setImgLogo] = useState("");
  const [actualLogo, setActualLogo] = useState("");
  const fileInputRef = useRef();
  const toast = useToast();


  useEffect(() => {
    if (imgLogo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLog(reader.result);
      };
      reader.readAsDataURL(imgLogo);
    } else {
      setPreviewLog(null);
    }
    setActualLogo("");
  }, [imgLogo]);

  useEffect(() => {
    setActualLogo(logo);
  }, [restaurant]);

  const handleChange = (e, fn, img) => {
    e.target.files[0].type.substr(0, 5) === "image" &&
      validateImage(img, toast);
    fn(e.target.files[0]);
  };

  let errors;

  const formik = useFormik({
    initialValues: {
      webpage: restaurant?.contact?.webpage || "",
      email: restaurant?.contact?.email || "",
      telephone: restaurant?.contact?.instagram || "",
      instagram: restaurant?.contact?.telephone || "",
      suscrip: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Email invalido";
      }
      return errors;
    },
    onSubmit: (values) => {
      axios
        .put(`api/admin/restaurant/${restaurant._id}`, values)
        .then(() => {
          if (previewLog) {
            let data = new FormData();
            data.append("image", imgLogo);
            axios.put(
              `/api/admin/images/${restaurant._id}?type=logo&key=${imgLogo}`,
              data,
              {
                headers: {
                  "Accept-Language": "en-US,en;q=0.8",
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        })
        .then(() => {
          toast({
            title: `Guardado`,
            status: "success",
            isClosable: true,
          });
          setPreviewLog("");
        });
    },
  });

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      p={10}
      
      
    >
      <RestaurantInfo restaurant={restaurant} />

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
                  <FormControl
                    as={GridItem}
                    colSpan={[3, 2]}
                    isInvalid={formik.errors.webpage && formik.touched.webpage}
                  >
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
                  <FormControl
                    as={GridItem}
                    colSpan={[3, 2]}
                    isInvalid={errors?.email}
                  >
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
                    {actualLogo && !previewLog && (
                      <Image
                        boxSize={12}
                        src={actualLogo}
                        mt={3}
                        rounded="full"
                      />
                    )}
                    {previewLog && (
                      <Image
                        boxSize={12}
                        src={previewLog}
                        mt={3}
                        rounded="full"
                      />
                    )}
                    {!previewLog && !actualLogo && (
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
                    )}
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        fileInputRef.current.click();
                      }}
                      ml={2}
                    >
                      Cambiar imagen
                    </Button>
                    <Input
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      accept="image/*"
                      name="productImage"
                      type="file"
                      id="addImage"
                      onChange={(e) => handleChange(e, setImgLogo, "addImage")}
                    />
                  </Flex>
                  <FormHelperText>{false ? errors.logo : null}</FormHelperText>
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
                  bgColor="green.300" 
                >
                  Guardar
                </Button>
              </Box>
            </chakra.form>
                      <Box
                      
                       bg={useColorModeValue("white", "gray.700")}
                      >
                        <ManageBanner />
                      </Box>
            
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>
  );
};
