import React, { Fragment, useState } from "react";
//redux imports
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

//Chakra ui

import {
  Heading,
  Text,
  Input,
  Stack,
  Container,
  Button,
} from "@chakra-ui/react";

import MetaData from "../Layout/MetaData";

const Shipping = ({ history }) => {
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, postalCode, phoneNumber }));

    history.push("/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"shipping information"} />
      <Container justify="center" mt={5} bgColor="darkpurple" p={5}>
        <Heading
          textAlign="center"
          fontSize="32px"
          fontFamily="unset"
          textColor="white"
          my={5}
        >
          Shipping information
        </Heading>

        <form onSubmit={submitHandler}>
          <Stack spacing={5} color="white">
            <Input
              isFullWidth
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              isFullWidth
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              isFullWidth
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <Input
              isFullWidth
              type="phone"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Text color="warning">
              We are only shipping in pakistan keep supporting us so we can
              expand our business to other countries as well. Thank u
            </Text>
            <Input
              isFullWidth
              placeholder="Pakistan"
              value={"pakistan"}
              isDisabled
            />
            <Button
              variant="solid"
              bgGradient="linear(to-r, warning, danger)"
              _hover={{
                bgGradient: "linear(to-r, danger, warning)",
              }}
              color="white"
              size="lg"
              isFullWidth
              type="submit"
            >
              Continue
            </Button>
          </Stack>
        </form>
      </Container>
    </Fragment>
  );
};

export default Shipping;
