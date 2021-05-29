import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Lottie from "react-lottie";
import animationData from "./lotties/success.json";

import MetaData from "../Layout/MetaData";

import { Link as ChLink, VStack, Text } from "@chakra-ui/react";

const OrderSuccess = () => {
  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Fragment>
      <MetaData title={"Order success"} />
      <VStack justify="center" align="center" my={20}>
        <Lottie options={defaultOptions} height={400} width={400} />
        <Text fontSize="15px" fontFamily="fantasy">
          Your order has been placed successfully
        </Text>
        <ChLink
          as={Link}
          to={"/orders/me"}
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="celadon"
        >
          Go to orders
        </ChLink>
      </VStack>
    </Fragment>
  );
};

export default OrderSuccess;
