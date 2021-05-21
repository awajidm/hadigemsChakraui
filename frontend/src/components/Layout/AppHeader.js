import React, { Fragment } from "react";
import { Route, Link as ReactLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  HStack,
  Image,
  IconButton,
  Button,
  Text,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FaShoppingCart, FaSignOutAlt, FaCaretDown } from "react-icons/fa";

import AppSearch from "./AppSearch";
import { logout } from "../../actions/userActions";

const AppHeader = () => {
  const dispatch = useDispatch();

  const toast = useToast();

  const { user, loading } = useSelector((state) => state.auth);

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
    <HStack p="5">
      <Link as={ReactLink} to="/">
        <Image w="200px" h="35px" src="/images/logo.png" alt="HadiGems" />
      </Link>
      <Spacer />
      <HStack>
        <Route render={({ history }) => <AppSearch history={history} />} />
        <Link as={ReactLink} to="/cart">
          <IconButton
            _focus={{ borderColor: "primary" }}
            size="lg"
            isRound="true"
            icon={<FaShoppingCart />}
          />
        </Link>

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
              <MenuList bg="primary" minW="200">
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
              <Link as={ReactLink} to="/login">
                <Button variant="solid" bg="primary">
                  <Text fontSize="xs">Login</Text>
                </Button>
              </Link>
              <Link as={ReactLink} to="/register">
                <Button variant="solid" bg="highlight">
                  <Text fontSize="xs">Register</Text>
                </Button>
              </Link>
            </Fragment>
          )
        )}
      </HStack>
    </HStack>
  );
};

export default AppHeader;
