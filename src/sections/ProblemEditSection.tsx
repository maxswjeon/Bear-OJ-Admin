import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "components/Loading";
import Section from "components/Section";
import useInternalProblems from "queries/useInternalProblems";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Problem } from "types/Problem";

type ProblemEditSectionProps = {
  currentProblem: Problem | null;
  setCurrentProblem: (problem: Problem | null) => void;
};

type ProblemEditValues = {
  title: string;
  description: string;
  problem_id: string;
};

const ProblemEditSection = ({ currentProblem }: ProblemEditSectionProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useInternalProblems();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProblemEditValues>();

  useEffect(() => {
    if (currentProblem) {
      reset(currentProblem);
    } else {
      reset();
    }
  }, [reset, currentProblem]);

  const editProblem: SubmitHandler<ProblemEditValues> = async (form) => {
    if (!currentProblem) {
      return;
    }

    await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + "/admin/problems/" + currentProblem.id,
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
      <Heading as="h2" size="lg">
        문제 수정
      </Heading>
      <Box as="form" onSubmit={handleSubmit(editProblem)}>
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

export default ProblemEditSection;
