import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Section from "components/Section";

const CheatMonitorSection = () => {
  return (
    <Section>
      <Heading as="h2" size="lg">
        유저 부정행위 모니터
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th textAlign="center">유저 이름</Th>
            <Th textAlign="center">유저 학번</Th>
            <Th textAlign="center">로그인 여부</Th>
            <Th textAlign="center">화면 크기</Th>
            <Th textAlign="center">포커스 여부</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center" bgColor="red.600" color="white">
              전상완
            </Td>
            <Td textAlign="center" bgColor="red.600" color="white">
              2021142072
            </Td>
            <Td textAlign="center" color="green.600">
              로그인함
            </Td>
            <Td textAlign="center" bgColor="red.600" color="white">
              변경됨
            </Td>
            <Td textAlign="center" color="green.600">
              정상
            </Td>
          </Tr>
          <Tr>
            <Td textAlign="center" color="green.600">
              박문수
            </Td>
            <Td textAlign="center" color="green.600">
              2021142072
            </Td>
            <Td textAlign="center" color="green.600">
              로그인함
            </Td>
            <Td textAlign="center" color="green.600">
              정상
            </Td>
            <Td textAlign="center" color="green.600">
              정상
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Section>
  );
};

export default CheatMonitorSection;
