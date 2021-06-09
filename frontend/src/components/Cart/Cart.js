import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeCartItem } from "../../actions/cartActions";

//Chakra ui

import {
  Heading,
  Image,
  Link,
  Text,
  IconButton,
  Button,
  Input,
  Stack,
  VStack,
  Box,
  HStack,
  Spacer,
} from "@chakra-ui/react";

import { FaPlus, FaMinus, FaRegTrashAlt } from "react-icons/fa";
import MetaData from "../Layout/MetaData";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Fragment>
      <MetaData title={"Your Cart"} />
      {cartItems.length === 0 ? (
        <Heading mx={50} mt={10}>
          Your Cart is Empty
        </Heading>
      ) : (
        <Fragment>
          <Heading m={5}>Your Cart: {cartItems.length} items</Heading>
          <Stack direction="row" justify="space-evenly" m={50}>
            <VStack justify="start" align="stretch">
              {cartItems.map((item) => (
                <HStack
                  spacing={12}
                  boxShadow="0px 0px 10px gray"
                  p={3}
                  borderRadius="md"
                  align="center"
                  justify="space-between"
                  key={item.product}
                >
                  <Image
                    src={item.image}
                    alt="product Image"
                    h="60px"
                    w="70px"
                  />
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
                  <Box>
                    <IconButton
                      onClick={() => decreaseQty(item.product, item.quantity)}
                      bgColor="danger"
                      color="white"
                      _hover={{ bgColor: "pblue" }}
                      size="xs"
                      icon={<FaMinus fontSize="12px" />}
                    />
                    <Input
                      type="number"
                      className="count"
                      size="lg"
                      width="50px"
                      isReadOnly={true}
                      value={item.quantity}
                    />
                    <IconButton
                      onClick={() =>
                        increaseQty(item.product, item.quantity, item.stock)
                      }
                      color="white"
                      bgColor="pblue"
                      _hover={{ bgColor: "pblue" }}
                      size="xs"
                      icon={<FaPlus fontSize="12px" />}
                    />
                  </Box>
                  <IconButton
                    onClick={() => removeCartItemHandler(item.product)}
                    color="white"
                    bgColor="warning"
                    _hover={{ color: "danger" }}
                    isRound
                    icon={<FaRegTrashAlt fontSize="20px" />}
                  />
                </HStack>
              ))}
            </VStack>
            <VStack
              boxShadow="0px 0px 10px gray"
              p={3}
              borderRadius="md"
              h="250px"
              justify="space-between"
            >
              <Heading
                fontSize="25px"
                fontFamily="fantasy"
                textColor="darkpurple"
              >
                Order Summery
              </Heading>
              <Box>
                <Text fontSize="15px" fontFamily="fantasy">
                  Subtotal
                </Text>
                <Text textColor="danger">
                  {cartItems.reduce(
                    (acc, item) => acc + Number(item.quantity),
                    0
                  )}
                  (units)
                </Text>
              </Box>
              <Box>
                <Text fontSize="15px" fontFamily="fantasy">
                  Est. Total
                </Text>
                <Text textColor="danger">
                  Rs.
                  {cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </Text>
              </Box>
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
                onClick={checkoutHandler}
              >
                Check Out
              </Button>
            </VStack>
          </Stack>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
