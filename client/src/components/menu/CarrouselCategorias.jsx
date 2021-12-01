import { Box, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Link } from "react-router-dom";

export const CarrouselCategorias = (categorias) => {
  categorias = ["Cafeteria", "Dulces", "Sandwiches", "Postres", "Licuados", "Tortas"];

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 4,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };
  return (
    <Box w="92%" h="60px">
      <Slider {...settings}>
        {categorias.map((item) => (
          <Box>{item}</Box>
        ))}
      </Slider>
    </Box>
  );
};
