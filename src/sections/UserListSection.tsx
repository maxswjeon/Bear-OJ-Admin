import { Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Loading from "components/Loading";
import Section from "components/Section";
import useUsers from "queries/useUsers";

const UserListSection = () => {
  const { data, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Heading as="h2" size="lg">
        유저 목록
      </Heading>
      <Table>
        <Thead>
          <Tr>
            <Th>이름</Th>
            <Th>학번</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.users?.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.student_number}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Section>
  );
};

export default UserListSection;
