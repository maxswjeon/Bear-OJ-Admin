import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Section from "components/Section";
import { SubmitHandler, useForm } from "react-hook-form";

type ContestCreationValues = {
  title: string;
  time_start: string;
  time_end: string;
  time_freeze: string;
};

const ContestAddSection = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContestCreationValues>();

  const addContest: SubmitHandler<ContestCreationValues> = async (form) => {
    const time_start = +new Date(form.time_start);
    const time_freeze = +new Date(form.time_freeze);
    const time_end = +new Date(form.time_end);

    await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/admin/contests",
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

  return (
    <Section>
      <Heading as="h2" size="lg">
        대회 추가
      </Heading>
      <form onSubmit={handleSubmit(addContest)}>
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
          <FormLabel htmlFor="time_freeze">스코어보드 프리즈 시간</FormLabel>
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
          추가
        </Button>
      </form>
    </Section>
  );
};

export default ContestAddSection;
