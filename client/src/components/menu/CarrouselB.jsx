import Slider from "react-slick";
import { Box, Heading } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//components
import { CardMenu } from "./CardMenu";

export const CarrouselB = ({ cards }) => {
  console.log("estas son las cartas", cards);
  const images = [
    {
      name: "capuccino",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo risus, pretium vitae ligula sit amet, sollicitudin efficitur felis. Maecenas. ",
      isActive: "true",
      category: "Cocina",
      subCategory: "Ensaladas",
      price: 600,
      imagen: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_333836_bannerPic_9019.jpg",
    },
    {
      name: "caramel coffe",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo risus, pretium vitae ligula sit amet, sollicitudin efficitur felis. Maecenas. ",
      isActive: "true",
      category: "Cocina",
      subCategory: "Tapas",
      price: 400,
      imagen: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_333838_bannerPic_9611.jpg",
    },
    {
      name: "Mocaccino",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo risus, pretium vitae ligula sit amet, sollicitudin efficitur felis. Maecenas. ",
      isActive: "true",
      category: "Productos",
      subCategory: "_null",
      price: 600,
      imagen: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_333837_bannerPic_2612.jpg",
    },
    {
      name: "Vaso Shotero",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec justo risus, pretium vitae ligula sit amet, sollicitudin efficitur felis. Maecenas. ",
      isActive: "true",
      category: "Productos",
      subCategory: "_null",
      price: 300,
      imagen: "https://api.waitry.net/1/uploads/places/items/banner_pictures/wa_333835_bannerPic_8984.jpg",
    },
  ];
  const settings = {
    infinite: true,
    dots: true,
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
