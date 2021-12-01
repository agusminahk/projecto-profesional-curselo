import { Box, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { Link } from "react-router-dom";

export const CarrouselCategorias = ({ categorias }) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <Box w="full" h="50px">
      <Slider {...settings}>
        {categorias.map((item) => (
          <Box textOverflow="clip" fontSize="150%">
            {item}
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
