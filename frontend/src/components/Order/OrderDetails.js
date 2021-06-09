import React, { Fragment, useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

import MetaData from "../Layout/MetaData";
import Loader from "../Layout/AppLoader";

//Chakra ui

import {
  useToast,
  Text,
  Heading,
  Stack,
  Divider,
  HStack,
  Link,
  Image,
  Spacer,
  Stat,
  StatLabel,
  Button,
} from "@chakra-ui/react";

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loading, error, order } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id));

    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }
  }, [dispatch, error, match.params.id, toast]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, Pakistan`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <Fragment>
      <MetaData title={"order details"} />

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Stack
            justify="center"
            m={10}
            p={5}
            boxShadow="0px 0px 10px gray"
            spacing={8}
          >
            <Heading fontSize="32px" fontFamily="fantasy" mb={3}>
              Order # {order._id}
            </Heading>
            <Divider />
            <Heading fontSize="25px" fontFamily="unset" textColor="darkpurple">
              Shipping Info
            </Heading>
            <Stat>
              <StatLabel>Name: {user && user.name}</StatLabel>
              <StatLabel>
                Phone: {shippingInfo && shippingInfo.phoneNo}
              </StatLabel>
              <StatLabel>Address: {shippingDetails}</StatLabel>
              <StatLabel>Amount: {totalPrice}</StatLabel>
            </Stat>
            <Divider />
            <Heading fontSize="25px" fontFamily="unset" textColor="darkpurple">
              Payment
            </Heading>
            <Text
              fontSize="15px"
              fontFamily="unset"
              textColor={isPaid ? "green.500" : "danger"}
            >
              {isPaid ? "PAID" : "NOT PAID"}
            </Text>
            <Divider />
            <Heading fontSize="25px" fontFamily="unset" textColor="darkpurple">
              Order Status
            </Heading>
            <Text
              fontSize="15px"
              fontFamily="unset"
              textColor={
                order.orderStatus &&
                String(order.orderStatus).includes("Delivered")
                  ? "green.500"
                  : "danger"
              }
            >
              {orderStatus}
            </Text>
            <Divider />
            <Heading fontSize="25px" fontFamily="unset" textColor="darkpurple">
              Order Items
            </Heading>
            {orderItems &&
              orderItems.map((item) => (
                <HStack
                  spacing={5}
                  boxShadow="0px 0px 10px gray"
                  p={3}
                  borderRadius="md"
                  width="100%"
                  key={item.product}
                >
                  <Image src={item.image} alt={item.name} h="60px" w="70px" />
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
                    Rs.{item.price}
                  </Text>
                  <Text fontSize="15px" fontFamily="unset" textColor="danger">
                    {item.quantity} Piece(s)
                  </Text>
                </HStack>
              ))}
            <Button
              _hover={{ color: "white", padding: "30px", bgColor: "pblue" }}
              color="white"
              bgColor="darkpurple"
              borderRadius="50px"
              as={ReactLink}
              to={"/orders/me"}
            >
              Go Back To Orders
            </Button>
          </Stack>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
