import React, { useEffect, useState, Fragment } from "react";

//app component imports
import ProductCard from "../Product/ProductCard";
import Apploader from "../Layout/AppLoader";
import MetaData from "../Layout/MetaData";

//redux imports
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategory } from "../../actions/productActions";

import {
  Heading,
  Box,
  Stack,
  Text,
  useToast,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa";

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  const toast = useToast();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 50000]);

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProdcutsCount,
  } = useSelector((state) => state.products);
  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      return toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    dispatch(getProducts(currentPage, keyword, price));
    dispatch(getCategory());
  }, [dispatch, error, currentPage, keyword, price, toast]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProdcutsCount;
  }

  return (
    <>
      <MetaData title="Home" />

      {keyword ? (
        //TODO
        <Stack direction="row">
          <VStack width="25vw" p={20}>
            <Box width="20vw">
              <Text mb={10} fontSize={20}>
                Filter by Pirce
              </Text>
              <Range
                marks={{
                  1: "1",
                  50000: "50000",
                }}
                min={1}
                max={50000}
                defaultValue={[1, 50000]}
                tipFormatter={(value) => `Rs.${value}`}
                tipProps={{
                  placement: "top",
                  visible: true,
                }}
                value={price}
                onChange={(price) => setPrice(price)}
              />
            </Box>
          </VStack>
          <VStack spacing={4} align="center" justify="center">
            <Heading
              textAlign="center"
              fontSize="32px"
              fontFamily="fantasy"
              textColor="darkpurple"
            >
              Search Results
            </Heading>
            <HStack wrap="wrap">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </HStack>
            <Box>
              {resPerPage <= count && (
                <Pagination
                  totalSize={count}
                  currentPage={currentPage}
                  sizePerPage={resPerPage}
                  changeCurrentPage={setCurrentPageNo}
                />
              )}
            </Box>
          </VStack>
        </Stack>
      ) : (
        <Fragment>
          <Heading
            textAlign="center"
            my="30px"
            fontSize="32px"
            fontFamily="fantasy"
            textColor="darkpurple"
          >
            All Products
          </Heading>
          {loading ? (
            <Apploader />
          ) : (
            <>
              <HStack align="center" justify="center" wrap="wrap">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </HStack>
              <HStack align="center" justify="center" my={5}>
                <Pagination
                  totalSize={count}
                  currentPage={currentPage}
                  sizePerPage={resPerPage}
                  changeCurrentPage={setCurrentPageNo}
                />
              </HStack>
            </>
          )}
          <Heading
            textAlign="center"
            my="30px"
            fontSize="32px"
            fontFamily="fantasy"
            textColor="darkpurple"
          >
            Premium Products
          </Heading>
          {loading ? (
            <Apploader />
          ) : (
            <HStack align="center" justify="center">
              {products &&
                products
                  .filter((product) => product.isPremium)
                  .map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              <Button rightIcon={<FaArrowRight />} />
            </HStack>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Home;
