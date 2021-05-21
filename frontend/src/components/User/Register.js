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
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";

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
      <VStack>
        <Heading textAlign="center" p="30" fontFamily="mono" fontWeight="light">
          Register
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
                children={<FaEnvelope color="highlight" />}
              />
              <Input
                placeholder="Enter Name"
                type="name"
                name="name"
                value={name}
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                name="password"
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
                disabled={loading ? true : false}
              >
                Register
              </Button>
            </HStack>
          </form>
        </Box>
      </VStack>
    </Fragment>
  );
};

export default Register;
