import { Box, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Header from "components/Header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import CheatMonitorSection from "sections/CheatMonitorSection";

const CheatPage: NextPage = () => {
  const router = useRouter();

  const { data } = useQuery(["users"], async () => {
    const { data } = await axios.get("/admin/users");
    return data;
  });

  return (
    <Flex justifyContent="center">
      <Box w="80em">
        <Header />
        <CheatMonitorSection />
      </Box>
    </Flex>
  );
};

export default CheatPage;
