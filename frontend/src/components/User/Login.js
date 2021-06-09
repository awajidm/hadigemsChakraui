import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";

import Loader from "../Layout/AppLoader";
import MetaData from "../Layout/MetaData";

//notifications for this page will go here

import { useDispatch, useSelector } from "react-redux";

import { login, clearErrors } from "../../actions/userActions";

const Login = ({ history, location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"login"} />
          <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
            <Heading
              textAlign="center"
              fontFamily="unset"
              fontSize="32px"
              textColor="white"
              my={5}
            >
              Login
            </Heading>
            <form className="form" onSubmit={submitHandler}>
              <Stack spacing={5} color="white">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaEnvelope color="#F7B32B" />}
                  />
                  <Input
                    focusBorderColor="warning"
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaLock color="#F7B32B" />}
                  />
                  <Input
                    focusBorderColor="warning"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <Link to="/password/forgot">
                  <Text color="warning">Forgot Password?</Text>
                </Link>
                <Button
                  variant="solid"
                  bgGradient="linear(to-t, warning, danger)"
                  _hover={{
                    bgGradient: "linear(to-r, danger, warning)",
                  }}
                  color="white"
                  size="lg"
                  isFullWidth
                  type="submit"
                  isLoading={loading ? true : false}
                  loadingText="Please wait"
                >
                  Login
                </Button>
                <Link to="/register">
                  <Text color="warning">Register</Text>
                </Link>
              </Stack>
            </form>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
