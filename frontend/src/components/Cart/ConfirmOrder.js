import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

//redux imports
import { useSelector } from "react-redux";

import CheckoutSteps from "./CheckoutSteps";
import MetaData from "../Layout/MetaData";

//Chakra ui

import {
  Heading,
  Text,
  Stack,
  Button,
  Divider,
  Stat,
  StatLabel,
  VStack,
  HStack,
  Image,
  Link,
  Spacer,
} from "@chakra-ui/react";

const ConfirmOrder = ({ history }) => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  //Calculate order Price

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingPrice = itemsPrice > 10000 ? 0 : 250;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));

  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const proceesToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    history.push("/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirm />
      <Stack
        boxShadow="0px 0px 10px gray"
        direction="column"
        justify="Start"
        mx={20}
        my={10}
        p={3}
      >
        <Heading fontSize="25px" fontFamily="fantasy" textColor="darkpurple">
          Shipping Info
        </Heading>
        <Stat>
          <StatLabel>Name: {user && user.name}</StatLabel>
          <StatLabel>Phone: {shippingInfo.phoneNumber}</StatLabel>
          <StatLabel>
            Address:{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, Pakistan`}
          </StatLabel>
        </Stat>
      </Stack>

      <Stack direction="row" justify="space-between" align="center" mx={20}>
        <VStack>
          <Heading
            textAlign="center"
            fontSize="25px"
            fontFamily="fantasy"
            textColor="darkpurple"
            mb={5}
          >
            Your Cart Items
          </Heading>
          {cartItems.map((item) => (
            <HStack
              spacing={12}
              boxShadow="0px 0px 10px gray"
              p={3}
              borderRadius="md"
              width="100%"
              key={item.product}
            >
              <Image src={item.image} alt="product Image" h="60px" w="70px" />
              <Link
                as={ReactLink}
                to={`/product/${item.product}`}
                fontSize="15px"
                fontFamily="unset"
                textColor="gray.500"
              >
                {item.name}
              </Link>
              <Spacer />
              <Text fontSize="15px" fontFamily="unset" textColor="danger">
                {item.quantity} x Rs.{item.price} ={" "}
                <b>
                  Rs.
                  {item.quantity * item.price}
                </b>
              </Text>
            </HStack>
          ))}
        </VStack>
        <VStack boxShadow="0px 0px 10px gray" p={5} align="start">
          <Heading fontSize="25px" fontFamily="fantasy" textColor="darkpurple">
            Order Summery
          </Heading>
          <HStack width="100%">
            <Text fontSize="15px" fontFamily="fantasy" mr="auto">
              SubTotal
            </Text>
            <Spacer />
            <Text fontSize="15px" fontFamily="fantasy" textColor="danger">
              {itemsPrice}
            </Text>
          </HStack>
          <HStack width="100%">
            <Text fontSize="15px" fontFamily="fantasy" mr="auto">
              Shipping
            </Text>
            <Spacer />
            <Text fontSize="15px" fontFamily="fantasy" textColor="danger">
              {shippingPrice}
            </Text>
          </HStack>
          <HStack width="100%">
            <Text fontSize="15px" fontFamily="fantasy" mr="auto">
              Tax
            </Text>
            <Spacer />
            <Text fontSize="15px" fontFamily="fantasy" textColor="danger">
              {taxPrice}
            </Text>
          </HStack>
          <Divider />
          <HStack width="100%">
            <Text fontSize="15px" fontFamily="fantasy" mr="auto">
              Total
            </Text>
            <Spacer />
            <Text fontSize="15px" fontFamily="fantasy" textColor="danger">
              {totalPrice}
            </Text>
          </HStack>
          <Button
            variant="solid"
            bgGradient="linear(to-r, warning, danger)"
            _hover={{
              bgGradient: "linear(to-r, danger, warning)",
              marginBottom: "2px",
            }}
            color="white"
            size="sm"
            isFullWidth
            onClick={proceesToPayment}
          >
            Proceed to Payment
          </Button>
        </VStack>
      </Stack>
      <Divider my={20} />
    </Fragment>
  );
};

export default ConfirmOrder;
