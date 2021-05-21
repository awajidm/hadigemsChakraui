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
import { FaLock, FaPassport } from "react-icons/fa";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { resetPassword, clearErrors } from "../../actions/userActions";

const NewPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast({
        title: "Password Updated Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push("/login");
    }
  }, [dispatch, error, success, history, toast]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />
      <VStack>
        <Heading textAlign="center" p="30" fontFamily="mono" fontWeight="light">
          Reset Password
        </Heading>
        <Box w={["80vw", "60vw", "40vw"]}>
          <form className="form" onSubmit={submitHandler}>
            <InputGroup mb="5">
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="highlight" />}
              />
              <Input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup mb="5">
              <InputLeftElement
                pointerEvents="none"
                children={<FaPassport color="highlight" />}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>

            <HStack>
              <Button isFullWidth type="submit" variant="solid" bg="primary">
                Set Password
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default NewPassword;
