import React, { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const AppSearch = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <InputGroup size="md" mr="10px">
      <Input
        pr="4.5rem"
        placeholder="Search Product"
        variant="outline"
        _hover={{ borderColor: "primary" }}
        _focus={{ borderColor: "primary" }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <InputRightElement width="3rem">
        <IconButton
          isRound="true"
          size="sm"
          _focus={{ borderColor: "primary" }}
          onClick={searchHandler}
          icon={<FaSearch />}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default AppSearch;
