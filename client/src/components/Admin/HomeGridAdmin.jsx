import { SimpleGrid, GridItem, Box } from "@chakra-ui/react";
import { CardAdmin } from "./CardAdmin";

export const HomeGridAdmin = () => {
  return (
    <SimpleGrid minChildWidth="150px" m="20px" spacingX={5} spacingY={10}>
      <CardAdmin></CardAdmin>
      <CardAdmin></CardAdmin>
      <CardAdmin></CardAdmin>
      <CardAdmin></CardAdmin>
    </SimpleGrid>
  );
};
