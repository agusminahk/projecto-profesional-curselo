import Slider from "react-slick";
import { Box, Heading } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//components
import { CardMenu } from "./CardMenu";

export const CarrouselB = ({ cards }) => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    arrows: true,
    slidesToScroll: 1,
    lazyLoad: true,
  };
  return (
    <Box>
      <Slider {...settings}>
        {cards.map((item) => (
          <Box>
            <CardMenu imagen={item.imagen} nombre={item.name} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
