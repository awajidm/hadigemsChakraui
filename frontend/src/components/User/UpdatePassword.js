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
import { FaLock } from "react-icons/fa";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast({
        title: "Password Updated Succesfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push("/me");

      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, history, isUpdated, toast]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("oldPassword", oldPassword);
    formData.set("password", password);
    dispatch(updatePassword(formData));
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
          Change Password
        </Heading>
        <form className="form" onSubmit={submitHandler}>
          <Stack spacing={5} color="white">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaLock color="#F7B32B" />}
              />
              <Input
                focusBorderColor="warning"
                type="password"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                name="password"
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
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
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
            >
              Update Password
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default UpdatePassword;
