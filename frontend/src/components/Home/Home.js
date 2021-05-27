import React, { useEffect, useState, Fragment } from "react";

import { Carousel } from "3d-react-carousal";
import ECarousel from "react-elastic-carousel";

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
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa";

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({ match }) => {
  let slides = [
    <Image src="/images/1.jpg" alt="image1" height={400} width="100%" />,
    <Image src="/images/2.jpg" alt="image2" height={400} width="100%" />,
    <Image src="/images/3.jpg" alt="image3" height={400} width="100%" />,
    <Image src="/images/4.jpg" alt="image4" height={400} width="100%" />,
  ];

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
    featuredProducts,
    premiumProducts,
    onSaleProducts,
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
          <Stack width="25vw" p={20} spacing={10}>
            <Heading
              textAlign="center"
              fontSize="32px"
              fontFamily="fantasy"
              textColor="darkpurple"
            >
              Filters
            </Heading>
            <Text fontSize={20} fontFamily="unset" textColor="danger">
              Pirce
            </Text>
            <Box width="200px">
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
            <Text fontSize={20} fontFamily="unset" textColor="danger">
              Categories
            </Text>
            <Text fontSize={20} fontFamily="unset" textColor="danger">
              Ratings
            </Text>
            <Text fontSize={20} fontFamily="unset" textColor="danger">
              Colors
            </Text>
          </Stack>
          <Stack spacing={4} align="center" justify="center">
            <Heading
              textAlign="center"
              fontSize="32px"
              fontFamily="fantasy"
              textColor="darkpurple"
            >
              Search Results
            </Heading>
            <Wrap>
              {products &&
                products.map((product) => (
                  <WrapItem>
                    <ProductCard key={product._id} product={product} />
                  </WrapItem>
                ))}
            </Wrap>
            {resPerPage <= count && (
              <Pagination
                totalSize={count}
                currentPage={currentPage}
                sizePerPage={resPerPage}
                changeCurrentPage={setCurrentPageNo}
              />
            )}
          </Stack>
        </Stack>
      ) : (
        <Fragment>
          <Box my={10}>
            <Carousel slides={slides} autoplay={true} interval={3000} />
          </Box>
          {loading ? (
            <Apploader />
          ) : (
            <>
              <Box my={20} mx={10}>
                <Heading
                  textAlign="center"
                  fontSize="32px"
                  fontFamily="fantasy"
                  textColor="darkpurple"
                >
                  Latest Products
                </Heading>
                <ECarousel
                  itemsToShow={4}
                  easing="cubic-bezier(1,.15,.55,1.54)"
                  tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                  transitionMs={700}
                >
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </ECarousel>
              </Box>
            </>
          )}
          {loading ? (
            <Apploader />
          ) : (
            <Box my={20} mx={10}>
              <Heading
                textAlign="center"
                fontSize="32px"
                fontFamily="fantasy"
                textColor="darkpurple"
              >
                Premium Products
              </Heading>
              <ECarousel
                itemsToShow={4}
                easing="cubic-bezier(1,.15,.55,1.54)"
                tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                transitionMs={700}
              >
                {premiumProducts &&
                  premiumProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </ECarousel>
            </Box>
          )}
          {loading ? (
            <Apploader />
          ) : (
            <Box my={20} mx={10}>
              <Heading
                textAlign="center"
                fontSize="32px"
                fontFamily="fantasy"
                textColor="darkpurple"
              >
                Featured Products
              </Heading>
              <ECarousel
                itemsToShow={4}
                easing="cubic-bezier(1,.15,.55,1.54)"
                tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                transitionMs={700}
              >
                {featuredProducts &&
                  featuredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </ECarousel>
            </Box>
          )}
          {loading ? (
            <Apploader />
          ) : (
            <Box my={20} mx={10}>
              <Heading
                textAlign="center"
                fontSize="32px"
                fontFamily="fantasy"
                textColor="darkpurple"
              >
                Products on Sale
              </Heading>
              <ECarousel
                itemsToShow={4}
                easing="cubic-bezier(1,.15,.55,1.54)"
                tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
                transitionMs={700}
              >
                {onSaleProducts &&
                  onSaleProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </ECarousel>
            </Box>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Home;
