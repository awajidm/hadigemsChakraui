import React, { Fragment, useState, useEffect } from "react";

import {
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  Container,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelopeOpenText, FaArrowRight } from "react-icons/fa";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast({
        title: message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [dispatch, error, message, toast]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />
      <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
        <Heading
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="white"
          my={5}
        >
          Forget Password
        </Heading>
        <form className="form" onSubmit={submitHandler}>
          <Stack spacing={5} color="white">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaEnvelopeOpenText color="#F7B32B" />}
              />
              <Input
                focusBorderColor="warning"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

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
              rightIcon={<FaArrowRight color="white" />}
            >
              Send Email
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default ForgotPassword;
