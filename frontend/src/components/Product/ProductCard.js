import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

import {
  Box,
  Image,
  IconButton,
  Button,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import BeautyStars from "beauty-stars";

const ProductCard = ({ product, category }) => {
  return (
    <Fragment>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="2xl"
        m={5}
        width="250px"
      >
        <ReactLink to={`/product/${product._id}`}>
          <Image
            src={product.images[0].url}
            alt={product.name}
            height={250}
            width={250}
          />
        </ReactLink>

        <Box p="4">
          <Box
            lineHeight="tight"
            fontSize="16px"
            fontFamily="inherit"
            textColor="darkpurple"
            isTruncated
          >
            <ReactLink to={`/product/${product._id}`}>{product.name}</ReactLink>
          </Box>
          {product.salePrice ? (
            <Stack direction="row" spacing={5}>
              <Heading
                lineHeight="tight"
                fontSize="18px"
                fontFamily="inherit"
                textColor="danger"
                textDecoration="line-through"
              >
                Rs.{product.price}/-
              </Heading>
              <Heading
                lineHeight="tight"
                fontSize="18px"
                fontFamily="inherit"
                textColor="green.500"
              >
                Rs.{product.salePrice}/-
              </Heading>
            </Stack>
          ) : (
            <Heading
              lineHeight="tight"
              fontSize="18px"
              fontFamily="inherit"
              textColor="pblue"
              isTruncated
            >
              Rs.{product.price}/-
            </Heading>
          )}
          <Box my="5px">
            <BeautyStars
              value={product.ratings}
              size={12}
              gap={6}
              activeColor="#6D213C"
            />
          </Box>
          <Stack
            direction="row"
            align="center"
            justify="space-evenly"
            mt="20px"
          >
            <IconButton
              _hover={{ bgColor: "pblue", color: "white" }}
              size="sm"
              isRound="true"
              icon={<FaShoppingCart />}
            />
            <Button
              variant="solid"
              bgGradient="linear(to-r, darkpurple, warning)"
              _hover={{
                bgGradient: "linear(to-r, darkpurple, danger)",
              }}
              color="white"
              size="sm"
              isFullWidth
            >
              Buy
            </Button>
            <IconButton
              _hover={{ bgColor: "pblue", color: "white" }}
              size="sm"
              isRound="true"
              icon={<FaHeart />}
            />
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProductCard;
