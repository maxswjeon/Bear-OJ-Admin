import { Heading } from "@chakra-ui/react";
import Loading from "components/Loading";
import Page from "components/Page";
import { useRouter } from "next/router";
import { useState } from "react";
import InternalProblemListSection from "sections/InternalProblemListSection";
import ProblemAddSection from "sections/ProblemAddSection";
import ProblemEditSection from "sections/ProblemEditSection";
import ProblemListSection from "sections/ProblemListSection";
import { useAuthStore } from "store/auth";
import { Problem } from "types/Problem";

const ProblemPage = () => {
  const router = useRouter();

  const { authenticated } = useAuthStore();

  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const problemState = { currentProblem, setCurrentProblem };

  if (!authenticated) {
    if (!router.isReady) {
      return <Loading />;
    }

    router.push("/login");
    return <Loading />;
  }

  return (
    <Page>
      <Heading as="h1">문제 관리</Heading>
      <InternalProblemListSection />
      <ProblemAddSection />
      <ProblemListSection {...problemState} />
      {currentProblem && <ProblemEditSection {...problemState} />}
    </Page>
  );
};

export default ProblemPage;
