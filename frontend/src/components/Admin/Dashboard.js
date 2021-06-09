import React, { Fragment, useEffect } from "react";

import { Link as ReactLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productActions";

import MetaData from "../Layout/MetaData";
import Loader from "../Layout/AppLoader";
import Sidebar from "./SideBar";

import { Box, Text, Grid, GridItem, Flex, Spacer } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  let outOfStock = 0;

  products.forEach((product) => {
    if (product.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProduct());
  }, [dispatch]);

  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={3}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={9} color="white">
          <Box
            boxShadow="0px 0px 10px gray"
            fontSize="20px"
            p={6}
            bgColor="twitter.900"
            mx={5}
            textAlign="center"
          >
            <Text>Total Amount</Text>
            <Text>Rs.5000000/-</Text>
          </Box>
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={6}
            textAlign="center"
            m={5}
          >
            <GridItem colSpan={3} boxShadow="0px 0px 10px gray">
              <Box
                bgColor="facebook.700"
                fontFamily="monospace"
                fontSize="20px"
                p={6}
              >
                <Text>Products</Text>
                <Text>{products && products.length}</Text>
              </Box>
              <Flex
                h="40px"
                bgColor="facebook.900"
                align="center"
                px={2}
                as={ReactLink}
                to="/"
                _hover={{ color: "white", bgColor: "facebook.800" }}
              >
                <Text>View Details</Text>
                <Spacer /> <FaArrowRight size="15px" />
              </Flex>
            </GridItem>
            <GridItem colSpan={3} boxShadow="0px 0px 10px gray">
              <Box
                bgColor="green.700"
                fontFamily="monospace"
                fontSize="20px"
                p={6}
              >
                <Text>Orders</Text>
                <Text>1159</Text>
              </Box>
              <Flex
                h="40px"
                bgColor="green.900"
                align="center"
                px={2}
                as={ReactLink}
                to="/"
                _hover={{ color: "white", bgColor: "green.800" }}
              >
                <Text>View Details</Text>
                <Spacer /> <FaArrowRight size="15px" />
              </Flex>
            </GridItem>
            <GridItem colSpan={3} boxShadow="0px 0px 10px gray">
              <Box
                bgColor="red.700"
                fontFamily="monospace"
                fontSize="20px"
                p={6}
              >
                <Text>Users</Text>
                <Text>1159</Text>
              </Box>
              <Flex
                h="40px"
                bgColor="red.900"
                align="center"
                px={2}
                as={ReactLink}
                to="/"
                _hover={{ color: "white", bgColor: "red.800" }}
              >
                <Text>View Details</Text>
                <Spacer /> <FaArrowRight size="15px" />
              </Flex>
            </GridItem>
            <GridItem colSpan={3} boxShadow="0px 0px 10px gray">
              <Box
                bgColor="yellow.700"
                fontFamily="monospace"
                fontSize="20px"
                p={6}
              >
                <Text>Out of Stock</Text>
                <Text>{outOfStock}</Text>
              </Box>
              <Flex
                h="40px"
                bgColor="yellow.900"
                align="center"
                px={2}
                as={ReactLink}
                to="/"
                _hover={{ color: "white", bgColor: "yellow.800" }}
              >
                <Text>View Details</Text>
                <Spacer /> <FaArrowRight size="15px" />
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
