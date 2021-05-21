import React, { Fragment, useState, useEffect } from "react";

import {
  Box,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  VStack,
  HStack,
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
      <VStack>
        <Heading textAlign="center" p="30" fontFamily="mono" fontWeight="light">
          Forgot Password
        </Heading>
        <Box w={["80vw", "60vw", "40vw"]}>
          <form className="form" onSubmit={submitHandler}>
            <InputGroup mb="5">
              <InputLeftElement
                pointerEvents="none"
                children={<FaEnvelopeOpenText color="highlight" />}
              />
              <Input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <HStack>
              <Button
                isFullWidth
                type="submit"
                variant="solid"
                bg="primary"
                isLoading={loading ? true : false}
                rightIcon={<FaArrowRight color="highlight" />}
              >
                Send Email
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default ForgotPassword;
