import React from "react";
import { Box, useRadio } from "@chakra-ui/react";

const PaymentRadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" w="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        boxShadow="0px 0px 10px gray"
        _checked={{
          bg: "darkpurple",
          color: "white",
        }}
        px={5}
        py={5}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default PaymentRadioCard;
