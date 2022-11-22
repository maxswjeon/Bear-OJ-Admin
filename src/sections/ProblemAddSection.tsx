import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { faChevronDown, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Icon from "components/Icon";
import Loading from "components/Loading";
import Section from "components/Section";
import useInternalProblems from "queries/useInternalProblems";
import { SubmitHandler, useForm } from "react-hook-form";

type ProblemCreationValues = {
  title: string;
  description: string;
  problem_id: string;
};

const ProblemAddSection = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useInternalProblems();

  const { isOpen, onToggle } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProblemCreationValues>();

  const addProblem: SubmitHandler<ProblemCreationValues> = async (form) => {
    await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin/problems",
      form,
      { withCredentials: true }
    );
    queryClient.invalidateQueries(["problems"]);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || !data.result) {
    return null;
  }

  return (
    <Section>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        onClick={onToggle}
        cursor="pointer"
      >
        <Heading as="h2" size="lg">
          문제 추가
        </Heading>
        <Icon icon={isOpen ? faChevronUp : faChevronDown} />
      </Flex>
      <Box
        as="form"
        display={isOpen ? "block" : "none"}
        onSubmit={handleSubmit(addProblem)}
      >
        <FormControl mt="3" isInvalid={!!errors.title} isRequired>
          <FormLabel htmlFor="title">제목</FormLabel>
          <Input
            id="title"
            {...register("title", { required: "제목은 필수입니다" })}
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={!!errors.problem_id} isRequired>
          <FormLabel htmlFor="description">문제</FormLabel>
          <Select
            id="internal_problem_id"
            {...register("problem_id", { required: "문제는 필수입니다" })}
          >
            {data.internalproblems?.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.name} ({problem.id})
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.problem_id?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={!!errors.description} isRequired>
          <FormLabel htmlFor="description">설명</FormLabel>
          <Textarea
            id="description"
            minH="300px"
            {...register("description")}
          />
          <FormErrorMessage>{errors.description?.message} </FormErrorMessage>
        </FormControl>
        <Button w="100%" type="submit" mt="3" isLoading={isSubmitting}>
          등록
        </Button>
      </Box>
    </Section>
  );
};

export default ProblemAddSection;
