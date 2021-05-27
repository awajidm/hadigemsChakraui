import React, { Fragment, useState, useEffect } from "react";

import {
  Container,
  Heading,
  InputGroup,
  Input,
  InputLeftElement,
  Button,
  Stack,
  Flex,
  Text,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";

import MetaData from "../Layout/MetaData";

import { useDispatch, useSelector } from "react-redux";

import { register, clearErrors } from "../../actions/userActions";

const Register = ({ history }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.png");

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      console.log(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(register(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />
      <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
        <Heading
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="white"
          my={5}
        >
          Register
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                name="password"
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
              Register
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default Register;
