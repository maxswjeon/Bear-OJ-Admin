import { Flex, Heading } from "@chakra-ui/react";
import Page from "components/Page";
import type { NextPage } from "next";
import { useState } from "react";
import UserAddSection from "sections/UserAddSection";
import UserBatchAddSection from "sections/UserBatchAddSection";
import UserListSection from "sections/UserListSection";
import { User } from "types/Users";

const UsersPage: NextPage = () => {
  const [currentUser, setCurrentUser ] = useState<User | null>(null);
  const userState = { currentUser, setCurrentUser };

  return (
    <Page>
      <Heading as="h1">유저 관리</Heading>
      <Flex w="100%" gap="3">
        <UserAddSection />
        <UserBatchAddSection />
      </Flex>
      <UserListSection />
    </Page>
  );
};

export default UsersPage;
