import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Loading from "components/Loading";
import Section from "components/Section";
import useContests from "queries/useContests";
import { Contest } from "types/Contest";

type ContestListSectionProps = {
  currentContest: Contest | null;
  setCurrentContest: (contest: Contest | null) => void;
};

const ContestListSection = ({
  currentContest,
  setCurrentContest,
}: ContestListSectionProps) => {
  const { data, isLoading, isError, error } = useContests();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Heading as="h2" size="lg">
        대회 목록
      </Heading>
      <Table mt="3">
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>대회 시작 시간</Th>
            <Th>스코어보드 프리즈 시간</Th>
            <Th>대회 마감 시간</Th>
            <Th>유효성</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.contests?.map((contest) => (
            <Tr
              key={contest.id}
              bgColor={
                contest.id === currentContest?.id ? "lightyellow" : undefined
              }
              onClick={() => setCurrentContest(contest)}
            >
              <Td>{contest.title}</Td>
              <Td>{new Date(contest.time_start).toLocaleString()}</Td>
              <Td>{new Date(contest.time_freeze).toLocaleString()}</Td>
              <Td>{new Date(contest.time_end).toLocaleString()}</Td>
              <Td>{contest.valid ? "O" : "X"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default ContestListSection;
