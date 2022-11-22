import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Loading from "components/Loading";
import Section from "components/Section";
import useProblems from "queries/useProblems";
import { Problem } from "types/Problem";

type ProblemListSectionProps = {
  currentProblem: Problem | null;
  setCurrentProblem: (problem: Problem | null) => void;
};

const ProblemListSection = ({
  currentProblem,
  setCurrentProblem,
}: ProblemListSectionProps) => {
  const { data, isLoading, isError, error } = useProblems();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Heading as="h2" size="lg">
        문제 목록
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>채점기 문제 ID</Th>
            <Th>유효성</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.problems?.map((problem) => (
            <Tr
              key={problem.id}
              cursor="pointer"
              bgColor={
                problem.id === currentProblem?.id ? "lightyellow" : undefined
              }
              onClick={() => setCurrentProblem(problem)}
            >
              <Td>{problem.title}</Td>
              <Td>{problem.problem_id}</Td>
              <Td>{problem.valid ? "O" : "X"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default ProblemListSection;
