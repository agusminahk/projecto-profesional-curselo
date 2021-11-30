import React, { useState } from "react";
import {
  Text,
  Box,
  Flex,
  useColorModeValue,
  Image,
  HStack,
  useDisclosure,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  SimpleGrid,
  Input,
  Button,
} from "@chakra-ui/react";
import { CardMenu } from "./CardMenu";

export const CarrouselMenu = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const slides = [
    {
      img: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_248077_bannerPic_3901.jpg",
      label: "osobuco",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkKp0_J0xIyRLnktkW-fSfj6BiIaHjxdta2w&usqp=CAU",
      label: "Milanesa Napolitana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_28542_bannerPic_5469.jpg",
      label: "Ensalada",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      img: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_248089_bannerPic_8449.jpg",
      label: "Fourth Slide",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      img: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_341224_bannerPic_7554.jpg",
      label: "Fifth Slide",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 50}%`,
  };

  return (
    <Flex w="full" bg={useColorModeValue("gray.200", "white")} p={6}>
      <Flex w="full" pos="relative" overflow="hidden">
        <Flex w="30vw" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <CardMenu nombre={slide.label} imagen={slide.img} />
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
      </Flex>
    </Flex>
  );
};
