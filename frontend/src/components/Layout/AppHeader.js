import React, { Fragment } from "react";
import { Route, Link as ReactLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  HStack,
  Image,
  IconButton,
  Button,
  Box,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  useToast,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { FaShoppingCart, FaSignOutAlt, FaCaretDown } from "react-icons/fa";

import AppSearch from "./AppSearch";
import { logout } from "../../actions/userActions";

const AppHeader = () => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast({
      title: "Logout Successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <HStack p="4">
      <ReactLink as={Link} to="/">
        <Image w="200px" h="35px" src="/images/logo.png" alt="HadiGems" />
      </ReactLink>
      <Spacer />
      <HStack>
        <Route render={({ history }) => <AppSearch history={history} />} />
        <ReactLink as={Link} to="/cart">
          <Tag _hover={{ bgColor: "pblue", color: "white" }}>
            <TagLeftIcon boxSize="20px" as={FaShoppingCart} />
            <TagLabel fontSize="15px" color="warning">
              {cartItems.length}
            </TagLabel>
          </Tag>
        </ReactLink>

        {user ? (
          <Fragment>
            <Menu gutter>
              <MenuButton
                as={Button}
                minW="200px"
                bg="transparent"
                _active={{ bg: "transparent" }}
                leftIcon={
                  <Avatar
                    size="sm"
                    name={user.name}
                    src={user.avatar && user.avatar.url}
                  />
                }
                rightIcon={<FaCaretDown />}
              >
                {user.name}
              </MenuButton>
              <MenuList bg="warning" minW="200">
                {user && user.role !== "admin" ? (
                  <MenuItem as={ReactLink} to="/orders/me">
                    Orders
                  </MenuItem>
                ) : (
                  <MenuItem as={ReactLink} to="/dashboard">
                    Dashboard
                  </MenuItem>
                )}
                <MenuItem as={ReactLink} to="/me">
                  Profile
                </MenuItem>
                <MenuItem color="danger" onClick={logoutHandler}>
                  <FaSignOutAlt />
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Fragment>
        ) : (
          !loading && (
            <Fragment>
              <ReactLink as={Link} to="/login">
                <Button
                  variant="solid"
                  bg="transparent"
                  _hover={{ bgColor: "warning", opacity: 0.8 }}
                >
                  Login
                </Button>
              </ReactLink>
              <ReactLink as={Link} to="/register">
                <Button
                  variant="solid"
                  bg="transparent"
                  _hover={{ bgColor: "warning", opacity: 0.8 }}
                >
                  Register
                </Button>
              </ReactLink>
            </Fragment>
          )
        )}
      </HStack>
    </HStack>
  );
};

export default AppHeader;
