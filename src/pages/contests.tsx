import { Heading } from "@chakra-ui/react";
import Loading from "components/Loading";
import Page from "components/Page";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ContestAddSection from "sections/ContestAddSection";
import ContestEditSection from "sections/ContestEditSection";
import ContestListSection from "sections/ContestListSection";
import { useAuthStore } from "store/auth";
import { Contest } from "types/Contest";

const ContestsPage: NextPage = () => {
  const router = useRouter();

  const { authenticated } = useAuthStore();

  const [currentContest, setCurrentContest] = useState<Contest | null>(null);
  const contestState = { currentContest, setCurrentContest };

  if (!authenticated) {
    if (!router.isReady) {
      return <Loading />;
    }

    router.push("/login");
    return <Loading />;
  }

  return (
    <Page>
      <Heading as="h1">대회 관리</Heading>
      <ContestAddSection />
      <ContestListSection {...contestState} />
      {currentContest && <ContestEditSection {...contestState} />}
    </Page>
  );
};

export default ContestsPage;
