import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Box,
  Heading,
  HStack,
  Image,
  Spinner,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import MetaData from "../Layout/MetaData";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <MetaData title="My Profile" />
          <Heading
            textAlign="center"
            p="30"
            fontFamily="mono"
            fontWeight="light"
          >
            Profile
          </Heading>
          <HStack spacing={12} mx={100} my={30} justify="center">
            <VStack>
              <Image
                boxSize="250px"
                borderRadius="full"
                objectFit="cover"
                src={user.avatar.url}
                alt={user.name}
              />
              <Button
                as={ReactLink}
                to="/me/update"
                variant="solid"
                bg="celadon"
                isFullWidth
                _hover={{ bgColor: "celadon", opacity: 0.9 }}
              >
                Edit Profile
              </Button>
            </VStack>
            <VStack>
              <Box
                ml="20"
                w={350}
                border="1px solid gray"
                p={5}
                alignItems="end"
              >
                <Heading size="md" color="secondary">
                  Full Name
                </Heading>
                <Text>{user.name}</Text>
                <Heading size="md" color="secondary">
                  Email
                </Heading>
                <Text>{user.email}</Text>
                <Heading size="md" color="secondary">
                  created at
                </Heading>
                <Text mb={4}>{String(user.createdAt.substring(0, 10))}</Text>
                {user.role !== "admin" && (
                  <Button
                    as={ReactLink}
                    to="/profile/update"
                    variant="solid"
                    bg="danger"
                    _hover={{ bgColor: "danger", opacity: 0.9 }}
                    isFullWidth
                    mb={4}
                  >
                    Orders
                  </Button>
                )}

                <Button
                  as={ReactLink}
                  to="/password/update"
                  variant="solid"
                  bg="warning"
                  isFullWidth
                  _hover={{ bgColor: "warning", opacity: 0.9 }}
                >
                  Change Password
                </Button>
              </Box>
            </VStack>
          </HStack>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
