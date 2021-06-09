import React from "react";
import { Link as ReactLink } from "react-router-dom";

import { Box, Stack, Text, Divider } from "@chakra-ui/react";

import {
  FaArtstation,
  FaUsers,
  FaProductHunt,
  FaShoppingBasket,
  FaComments,
} from "react-icons/fa";

const SidebarOptions = ({ name, linkTo, icon }) => {
  return (
    <Box
      as={ReactLink}
      to={`${linkTo}`}
      bgColor="transparent"
      _hover={{ color: "white", textShadow: "3px 3px 0px teal" }}
      fontSize={24}
      d="flex"
      justifyContent="start"
      alignItems="center"
    >
      {icon}
      <Text ml={5}> {name}</Text>
    </Box>
  );
};

const SideBar = () => {
  return (
    <Stack
      p={5}
      spacing={5}
      fontSize="24px"
      bgColor="darkpurple"
      color="white"
      h="100vh"
      boxShadow="0px 0px 10px gray"
    >
      <SidebarOptions
        name="Dashboard"
        linkTo="/dashboard"
        icon={<FaArtstation />}
      />
      <Divider />
      <SidebarOptions
        name="Products"
        linkTo="/admin/products"
        icon={<FaProductHunt />}
      />
      <SidebarOptions name="Users" linkTo="/admin/users" icon={<FaUsers />} />
      <SidebarOptions
        name="Orders"
        linkTo="/admin/orders"
        icon={<FaShoppingBasket />}
      />
      <SidebarOptions
        name="Reviews"
        linkTo="/admin/reviews"
        icon={<FaComments />}
      />
    </Stack>
  );
};

export default SideBar;
