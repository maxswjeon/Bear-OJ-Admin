import { useQueryClient } from "@tanstack/react-query";
import useProblems from "queries/useProblems";
import { Contest } from "types/Contest";

type ContestProblemSectionProps = {
  currentContest: Contest | null;
  setCurrentContest: (contest: Contest | null) => void;
};

const ContestProblemSection = ({
  currentContest,
}: ContestProblemSectionProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useProblems();
};

export default ContestProblemSection;
