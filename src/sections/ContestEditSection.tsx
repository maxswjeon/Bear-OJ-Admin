import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "components/Loading";
import Section from "components/Section";
import dayjs from "dayjs";
import useProblems from "queries/useProblems";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Contest } from "types/Contest";

type ContestEditSectionProps = {
  currentContest: Contest | null;
  setCurrentContest: (contest: Contest | null) => void;
};

type ContestEditValues = {
  title: string;
  time_start: string;
  time_end: string;
  time_freeze: string;
};

const ContestEditSection = ({ currentContest }: ContestEditSectionProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useProblems();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContestEditValues>();

  useEffect(() => {
    if (currentContest) {
      reset({
        title: currentContest.title,
        time_start: dayjs(currentContest.time_start).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        time_freeze: dayjs(currentContest.time_freeze).format(
          "YYYY-MM-DDTHH:mm:ss"
        ),
        time_end: dayjs(currentContest.time_end).format("YYYY-MM-DDTHH:mm:ss"),
      });
    } else {
      reset();
    }
  }, [reset, currentContest]);

  const editContest: SubmitHandler<ContestEditValues> = async (form) => {
    if (!currentContest) {
      return;
    }

    const time_start = +new Date(form.time_start);
    const time_freeze = +new Date(form.time_freeze);
    const time_end = +new Date(form.time_end);

    await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + "/admin/contests/" + currentContest.id,
      {
        title: form.title,
        time_start,
        time_freeze,
        time_end,
      },
      { withCredentials: true }
    );

    await queryClient.invalidateQueries(["contests"]);
  };

  const enableProblem = async (id: string) => {
    if (!currentContest) {
      return;
    }

    await axios.put(
      process.env.NEXT_PUBLIC_API_URL +
        `/admin/contests/${currentContest.id}/problems/${id}`,
      null,
      {
        withCredentials: true,
      }
    );

    queryClient.invalidateQueries(["contests"]);
  };
  const disableProblem = async (id: string) => {
    if (!currentContest) {
      return;
    }

    await axios.delete(
      process.env.NEXT_PUBLIC_API_URL +
        `/admin/contests/${currentContest.id}/problems/${id}`,
      {
        withCredentials: true,
      }
    );

    queryClient.invalidateQueries(["contests"]);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Heading as="h2" size="lg">
        대회 수정
      </Heading>
      <Flex mt="3" gap="6">
        <Box w="50%">
          <Heading as="h3" size="md">
            대회 정보 수정
          </Heading>
          <form onSubmit={handleSubmit(editContest)}>
            <FormControl mt="3" isInvalid={!!errors.title} isRequired>
              <FormLabel htmlFor="title">제목</FormLabel>
              <Input
                id="title"
                {...register("title", { required: "제목은 필수입니다" })}
              />
              <FormErrorMessage>
                {errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.time_start} isRequired>
              <FormLabel htmlFor="time_start">대회 시작 시간</FormLabel>
              <Input
                id="time_start"
                type="datetime-local"
                {...register("time_start", {
                  required: "대회 시작 시간은 필수입니다",
                })}
              />
              <FormErrorMessage>
                {errors.time_start && errors.time_start.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.time_freeze} isRequired>
              <FormLabel htmlFor="time_freeze">
                스코어보드 프리즈 시간
              </FormLabel>
              <Input
                id="time_freeze"
                type="datetime-local"
                {...register("time_freeze", {
                  required: "스코어보드 프리즈 시간은 필수입니다",
                })}
              />
              <FormErrorMessage>
                {errors.time_freeze && errors.time_freeze.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.time_end} isRequired>
              <FormLabel htmlFor="time_end">대회 마감 시간</FormLabel>
              <Input
                id="time_end"
                type="datetime-local"
                {...register("time_end", {
                  required: "대회 마감 시간은 필수입니다",
                })}
              />
              <FormErrorMessage>
                {errors.time_end && errors.time_end.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              mt="3"
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              수정
            </Button>
          </form>
        </Box>
        <Box w="50%">
          <Heading as="h3" size="md">
            대회 문제 설정
          </Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>이름</Th>
                <Th>포함</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.problems?.map((problem) => (
                <Tr key={problem.id}>
                  <Td>{problem.title}</Td>
                  <Td>
                    <Checkbox
                      isChecked={currentContest?.problems
                        ?.filter((p) => p.id === problem.id)
                        .every((p) => p)}
                      onChange={(e) =>
                        e.currentTarget.checked
                          ? enableProblem(problem.id)
                          : disableProblem(problem.id)
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Section>
  );
};

export default ContestEditSection;
