import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

import {
  Box,
  Image,
  Badge,
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
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="2xl"
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
          <Heading
            lineHeight="tight"
            fontSize="20"
            fontFamily="cursive"
            textColor="red.600"
            isTruncated
          >
            <ReactLink to={`/product/${product._id}`}>{product.name}</ReactLink>
          </Heading>
          <Box>
            <Box
              as="span"
              color="gray.600"
              fontSize="lg"
              fontWeight="bold"
              mr="auto"
            >
              Rs.{product.price}/-
            </Box>
            <BeautyStars value={product.rating} size={10} gap="5" />
          </Box>
          <Box>
            {product.tags.map((tag) => (
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {tag}
              </Badge>
            ))}
          </Box>

          <Stack direction="row" align="center" justify="space-evenly">
            <IconButton icon={<FaShoppingCart />} />
            <Button variant="solid" colorScheme="teal" size="sm">
              Buy
            </Button>
            <IconButton icon={<FaHeart />} />
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default ProductCard;
