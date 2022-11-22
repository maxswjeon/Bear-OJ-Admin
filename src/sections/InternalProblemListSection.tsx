import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Loading from "components/Loading";
import Section from "components/Section";
import dayjs from "dayjs";
import useInternalProblems from "queries/useInternalProblems";

const InternalProblemListSection = () => {
  const { data, isLoading, isError, error } = useInternalProblems();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Heading as="h2" size="lg">
        채점기 문제 목록
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>이름</Th>
            <Th>업데이트 시간</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.internalproblems?.map((problem) => (
            <Tr key={problem.id}>
              <Td>{problem.id}</Td>
              <Td>{problem.name}</Td>
              <Td>
                {dayjs(problem.last_update * 1000)
                  .toDate()
                  .toLocaleString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default InternalProblemListSection;
