import React, { Fragment } from "react";
import { Link as ReactLink } from "react-router-dom";

//Chakra ui

import { Stack, Button } from "@chakra-ui/react";

import {
  FaShippingFast,
  FaCheck,
  FaMoneyCheck,
  FaLongArrowAltRight,
} from "react-icons/fa";

const CheckoutSteps = ({ shipping, confirm, payment }) => {
  return (
    <Fragment>
      <Stack direction="row" spacing={5} justify="center" align="center" mt={5}>
        {shipping ? (
          <Button
            as={ReactLink}
            to="/shipping"
            bgColor="warning"
            borderRadius={0}
            _active={{ bgColor: "warning" }}
            _hover={{ bgColor: "warning" }}
            leftIcon={<FaShippingFast />}
          >
            Shipping
          </Button>
        ) : (
          <Button
            as={ReactLink}
            to="#!"
            bgColor="gray.400"
            borderRadius={0}
            leftIcon={<FaShippingFast />}
            isDisabled
          >
            Shipping
          </Button>
        )}
        <FaLongArrowAltRight />
        {confirm ? (
          <Button
            as={ReactLink}
            to="/order/confirm"
            bgColor="warning"
            borderRadius={0}
            _active={{ bgColor: "warning" }}
            _hover={{ bgColor: "warning" }}
            leftIcon={<FaCheck />}
          >
            Confirm
          </Button>
        ) : (
          <Button
            as={ReactLink}
            to="#!"
            bgColor="gray.400"
            borderRadius={0}
            leftIcon={<FaCheck />}
            isDisabled
          >
            Confirm
          </Button>
        )}
        <FaLongArrowAltRight />
        {payment ? (
          <Button
            as={ReactLink}
            to="/payment"
            bgColor="warning"
            borderRadius={0}
            _active={{ bgColor: "warning" }}
            _hover={{ bgColor: "warning" }}
            leftIcon={<FaMoneyCheck />}
          >
            Payment
          </Button>
        ) : (
          <Button
            as={ReactLink}
            to="#!"
            bgColor="gray.400"
            borderRadius={0}
            leftIcon={<FaMoneyCheck />}
            isDisabled
          >
            Payment
          </Button>
        )}
      </Stack>
    </Fragment>
  );
};

export default CheckoutSteps;
