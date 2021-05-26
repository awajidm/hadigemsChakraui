import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  VStack,
  HStack,
  Spacer,
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
  }, [dispatch, isAuthenticated, error, history]);

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
          <VStack>
            <Heading
              textAlign="center"
              p="30"
              fontFamily="mono"
              fontWeight="light"
            >
              Login
            </Heading>
            <Box w={["80vw", "60vw", "40vw"]}>
              <form className="form" onSubmit={submitHandler}>
                <InputGroup mb="5">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaEnvelope color="highlight" />}
                  />
                  <Input
                    placeholder="Enter Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
                <InputGroup mb="5">
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FaLock color="highlight" />}
                  />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
                <HStack>
                  <Link to="/password/forgot">Forgot Password?</Link>
                  <Spacer />
                  <Button type="submit" variant="solid" bg="primary">
                    Login
                  </Button>
                </HStack>
                <Link to="/register">Register</Link>
              </form>
            </Box>
          </VStack>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
