import React, { Fragment, useEffect } from "react";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../../actions/productActions";

//Chakra ui

import { Heading, Box, Stack, Text, useToast, VStack } from "@chakra-ui/react";

import Carousel from "react-gallery-carousel";

//app components
import Loader from "../Layout/AppLoader";
import MetaData from "../Layout/MetaData";

import "react-gallery-carousel/dist/index.css";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

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
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, error, match.params.id, toast]);

  // const handleAdd = () => {
  //   if (qty >= product.stock) {
  //     return alert.error(`only ${product.stock} item is avaiable!!`);
  //   } else {
  //     setQty(qty++);
  //   }
  // };

  // const handleRemove = () => {
  //   if (qty <= 1) {
  //     return alert.error(`You can not choose less then 1`);
  //   } else {
  //     setQty(qty--);
  //   }
  // };
  const images =
    product.images &&
    product.images.map((image) => ({
      src: `${image.url}`,
    }));
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={product.name} />
          <Stack direction="row" justify="center">
            <VStack justify="center" align="center" width="50vw">
              <Heading size="sm">Images will go here</Heading>
              <Carousel images={images} style={{ height: 800, width: 500 }} />
              {/* {product &&
                product.images.map((image) => (
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    width="100%"
                    height="200px"
                    mx="2"
                  />
                ))} */}
            </VStack>
            <VStack align="start" width="50vw">
              <Box>
                <Text>Name</Text>
                <Text textColor="red.400">{product.name}</Text>
              </Box>
              <Box>
                <Text>Prince</Text>
                <Text textColor="red.400">{product.price}</Text>
              </Box>
              <Text textColor="primary" fontSize="20px">
                Product Details
              </Text>
              <Box d="flex" flexWrap="wrap">
                {product.productInfo &&
                  product.productInfo.map((info) => (
                    <Box
                      p={3}
                      m={2}
                      fontSize="12px"
                      boxShadow="0px 0px 10px gray"
                    >
                      <Text textColor="secondary">{info.title}</Text>
                      <Text>{info.desc}</Text>
                    </Box>
                  ))}
              </Box>
            </VStack>
          </Stack>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
