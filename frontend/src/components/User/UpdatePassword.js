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
      <VStack>
        <Heading textAlign="center" p="30" fontFamily="mono" fontWeight="light">
          Change Password
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
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                name="password"
              />
            </InputGroup>
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
                name="password"
              />
            </InputGroup>

            <HStack>
              <Button
                isFullWidth
                type="submit"
                variant="solid"
                bg="primary"
                isLoading={loading ? true : false}
              >
                Update Password
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default UpdatePassword;
