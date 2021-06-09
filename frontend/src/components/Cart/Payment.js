import React, { useState, useEffect } from "react";
import PaymentRadioCard from "./PaymentRadioCard";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

import {
  useRadioGroup,
  Button,
  Heading,
  Stack,
  Container,
  VStack,
  useToast,
} from "@chakra-ui/react";

import CheckoutSteps from "./CheckoutSteps";

const Payment = ({ history }) => {
  const options = [
    { id: 1, paymentMethod: `Cash on Delivery` },
    { id: 2, paymentMethod: `EasyPaisa` },
    { id: 3, paymentMethod: `JazzCash` },
    { id: 4, paymentMethod: `Back Transfer` },
  ];

  const [paymentMethod, setPaymentMethod] = useState("JazzCash");

  const dispatch = useDispatch();
  const toast = useToast();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "payment",
    defaultValue: "JazzCash",
    onChange: (value) => {
      setPaymentMethod(value);
    },
  });

  const group = getRootProps();
  const paymentInfo = {
    id: paymentMethod,
    paymentMethod,
    status: "pending",
  };

  order.paymentInfo = paymentInfo;
  const submitHandler = () => {
    dispatch(createOrder(order));
    history.push("/success");
  };

  return (
    <>
      <CheckoutSteps shipping confirm payment />
      <Container>
        <Stack
          justify="center"
          align="center"
          m={10}
          p={5}
          boxShadow="0px 0px 10px gray"
          spacing={10}
        >
          <Heading textAlign="center" fontSize="32px" fontFamily="unset">
            Payment Method
          </Heading>
          <VStack {...group}>
            {options.map((item) => {
              const radio = getRadioProps({ value: item.paymentMethod });

              return (
                <PaymentRadioCard key={item.id} {...radio}>
                  {item.paymentMethod}
                </PaymentRadioCard>
              );
            })}
          </VStack>
          <Button
            variant="solid"
            bgGradient="linear(to-r, warning, danger)"
            _hover={{
              bgGradient: "linear(to-r, danger, warning)",
            }}
            color="white"
            size="lg"
            type="submit"
            onClick={submitHandler}
          >
            Continue
          </Button>
        </Stack>
      </Container>
    </>
  );
};

export default Payment;
