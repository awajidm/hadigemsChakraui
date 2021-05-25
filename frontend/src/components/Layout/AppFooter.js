import React from "react";
import {
  Heading,
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const AppFooter = () => {
  return (
    <>
      <HStack spacing={12} m={20} align="start" justify="space-between">
        <VStack>
          <Heading>About us</Heading>
          <Text>
            We are certified gemologists and Lapidarists. We provide custome gem
            cutting in precesion cuts also. We provide proffesional services for
            gems and jellwery making and appraisal.
          </Text>
          <HStack pt="20px">
            <IconButton
              _hover={{ bgColor: "pblue", color: "white" }}
              size="lg"
              isRound="true"
              icon={<FaFacebook />}
            />
            <IconButton
              _hover={{ bgColor: "pblue", color: "white" }}
              size="lg"
              isRound="true"
              icon={<FaInstagram />}
            />
            <IconButton
              _hover={{ bgColor: "pblue", color: "white" }}
              size="lg"
              isRound="true"
              icon={<FaWhatsapp />}
            />
          </HStack>
        </VStack>
        <VStack>
          <Heading
            textAlign="center"
            my="20px"
            fontSize="32px"
            fontFamily="fantasy"
            textColor="darkpurple"
          >
            THE STORE FOR VERIFIED NATURAL GEMS BY GEMOLOGISTS
          </Heading>
        </VStack>
      </HStack>
      <Box bgColor="pblue" textAlign="center" textColor="white">
        HadiGems ©2015 website Created by Dloup
      </Box>
    </>
  );
};

export default AppFooter;
