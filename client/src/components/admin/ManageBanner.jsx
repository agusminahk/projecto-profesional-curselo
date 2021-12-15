import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import {
  chakra,
  FormHelperText,
  Flex,
  useColorModeValue,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Image,
  Input,
  Icon,
  Button,
} from "@chakra-ui/react";
import validateImage from "../../hook/validateHook";
import FormData from "form-data";

export const ManageBanner = () => {
  const restaurant = useSelector((state) => state.restaurant.restaurant);

  let banner = restaurant.banner?.data
    ? `data:image/jpeg;base64,${Buffer.from(
        restaurant?.banner?.data.data,
        " "
      ).toString("base64")}`
    : "";

  const [previewBanner, setPreviewBan] = useState("");
  const [imgBanner, setImgBanner] = useState("");
  const [actualBanner, setActualBanner] = useState("");
  const fileInputRef = useRef();
  const toast = useToast();
  let errors;

  useEffect(() => {
    if (imgBanner) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBan(reader.result);
      };
      reader.readAsDataURL(imgBanner);
    } else {
      setPreviewBan(null);
    }
    setActualBanner("");
  }, [imgBanner]);

  useEffect(() => {
    setActualBanner(banner);
  }, [restaurant]);

  const handleChange = (e, fn, img) => {
    e.target.files[0].type.substr(0, 5) === "image" &&
      validateImage(img, toast);
    fn(e.target.files[0]);
  };

  const handleSubmit = () => {
    let data = new FormData();
    data.append("image", imgBanner);
    axios
      .put(`/api/admin/images/${restaurant._id}?type=banner`, data, {
        headers: {
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {

        
        console.log("RESTAURANT UPDAT", res.data)


        toast({
          title: `Guardado con exito`,
          status: "success",
          isClosable: true,
        });
        setPreviewBan("");
      });
  };

  return (
    <FormControl
    shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              bg={useColorModeValue("white", "gray.700")}>
      <FormLabel
        fontSize="sm"
        fontWeight="md"
        color={useColorModeValue("gray.700", "gray.50")}
        
      >
        Foto de portada
      </FormLabel>

      {actualBanner && !previewBanner && <Image src={actualBanner} />}
      {previewBanner && <Image src={previewBanner} />}
      {actualBanner || previewBanner ? (
        <>
          <Button
            mr={{ base: "none", md: "15%" }}
            mt="2"
            onClick={(e) => {
              e.preventDefault();
              fileInputRef.current.click();
            }}
            bgColor="green.300"
            color="white"
          >
            Cambiar imagen
          </Button>
          {previewBanner && (
            <Button
            mt="2"
              mr={{ base: "none", md: "15%" }}
              onClick={() => handleSubmit()}
              bgColor="green.300"
            >
              Listo <CheckIcon />
            </Button>
          )}
          <Input
            style={{ display: "none" }}
            ref={fileInputRef}
            accept="image/*"
            name="productImage"
            type="file"
            id="fileupload"
            onChange={(e) => handleChange(e, setImgBanner, "fileupload")}
          />
        </>
      ) : null}

      {!actualBanner && !previewBanner && (
        <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          borderColor="gray.400"
          borderStyle="dashed"
          rounded="md"
        >
          <Stack spacing={1} textAlign="center">
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
            <Flex fontSize="sm" color="gray.600" alignItems="baseline">
              <chakra.label
                htmlFor="file-upload"
                cursor="pointer"
                rounded="md"
                fontSize="md"
                color="brand.600"
                pos="relative"
                fontWeight="bold"
              >
                <Button
                  _hover={{
                    textDecoration: "underline",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current.click();
                  }}
                >
                  Sube un archivo
                </Button>
                <Input
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  accept="image/*"
                  name="productImage"
                  type="file"
                  id="fileupload"
                  onChange={(e) => handleChange(e, setImgBanner, "fileupload")}
                />
              </chakra.label>
              <Text pl={1}>o arrastrar y soltar</Text>
            </Flex>
            <Text fontSize="xs" color="gray.500">
              PNG hasta 10MB
            </Text>
          </Stack>
        </Flex>
      )}

      <FormHelperText>{errors?.banner ? errors.banner : null}</FormHelperText>
    </FormControl>
  );
};
