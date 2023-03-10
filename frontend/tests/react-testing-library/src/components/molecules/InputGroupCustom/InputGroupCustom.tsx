/* eslint-disable react/jsx-no-bind */
import { BaseSyntheticEvent } from "react";
import { FiSearch } from "react-icons/fi";

import { changeUser } from "@/store/GitHubUser/gitUserSlice";
import {
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { InputCustom } from "../../atoms";
import { useAppDispatch } from "@/lib/test-utils";

export function InputGroupCustom(): JSX.Element {
  const dispatch = useAppDispatch();

  function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();

    const { user } = e.target;

    dispatch(changeUser(user.value));
  }

  return (
    <InputGroup data-testid="form" as="form" onSubmit={handleSubmit} autoComplete="off">
      <InputLeftElement pointerEvents="none" marginTop="4px">
        <FiSearch size="18px" />
      </InputLeftElement>

      <InputCustom placeholder="Search GitHub username" name="user" />

      <InputRightElement margin="4px 0 0 0" width="100px">
        <Button
          borderRadius={0}
          outline="none"
          colorScheme="blue"
          type="submit"
        >
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
