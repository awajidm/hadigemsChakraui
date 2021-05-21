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
      <VStack>
        <Heading textAlign="center" p="30" fontFamily="mono" fontWeight="light">
          Update Profile
        </Heading>
        <Box w={["80vw", "60vw", "40vw"]}>
          <form
            className="form"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <InputGroup mb="5">
              <InputLeftElement
                pointerEvents="none"
                children={<FaUser color="highlight" />}
              />
              <Input
                placeholder="Enter Name"
                type="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup mb="5">
              <InputLeftElement
                pointerEvents="none"
                children={<FaEnvelope color="highlight" />}
              />
              <Input
                placeholder="Enter Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <p>Choose Avatar</p>
            <HStack>
              <Avatar size="md" src={avatarPreview} name="avatar preview" />

              <Spacer />
              <Input
                name="avatar"
                type="file"
                accept="images/*"
                onChange={onChange}
              />
            </HStack>
            <HStack>
              <Spacer />
              <Button
                type="submit"
                variant="solid"
                bg="primary"
                isLoading={loading ? true : false}
                spinnerPlacement="end"
              >
                Update
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default UpdateProfile;
