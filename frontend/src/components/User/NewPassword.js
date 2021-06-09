import React, { Fragment, useState, useEffect } from "react";

import {
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Container,
  Stack,
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
      <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
        <Heading
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="white"
          my={5}
        >
          New Password
        </Heading>
        <form className="form" onSubmit={submitHandler}>
          <Stack spacing={5} color="white">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="#F7B32B" />}
              />
              <Input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaPassport color="#F7B32B" />}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            >
              Set Password
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default NewPassword;
