import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "components/Header";
import Loading from "components/Loading";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "store/auth";

const HomePage: NextPage = () => {
  const router = useRouter();

  const { authenticated } = useAuthStore();

  const { data, isLoading } = useQuery(["users"], async () => {
    const { data } = await axios.get("/admin/submits");
    return data;
  });

  if (!authenticated) {
    if (!router.isReady) {
      return <Loading />;
    }

    router.push("/login");
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex justifyContent="center">
      <Box w="80em">
        <Header />
      </Box>
    </Flex>
  );
};

export default HomePage;
