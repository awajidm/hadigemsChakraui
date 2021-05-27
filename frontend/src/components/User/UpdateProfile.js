import React, { Fragment, useState, useEffect } from "react";

import {
  Container,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  Text,
  Spacer,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { FaEnvelope, FaUser } from "react-icons/fa";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

  const toast = useToast();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast({
        title: "User Updated Succesfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(loadUser());
      history.push("/me");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, history, isUpdated, toast, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />
      <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
        <Heading
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="white"
          my={5}
        >
          Update Profile
        </Heading>
        <form
          className="form"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <Stack spacing={5} color="white">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="#F7B32B" />}
              />
              <Input
                focusBorderColor="warning"
                placeholder="Enter Name"
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<FaEnvelope color="#F7B32B" />}
              />
              <Input
                focusBorderColor="warning"
                placeholder="Enter Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <Text color="warning">Choose Avatar</Text>
            <Flex px={5}>
              <Avatar size="md" src={avatarPreview} name="avatar preview" />
              <Spacer />
              <Input
                focusBorderColor="warning"
                name="avatar"
                type="file"
                accept="images/*"
                onChange={onChange}
                w="100px"
                p="0px"
              />
            </Flex>

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
              Update
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default UpdateProfile;
