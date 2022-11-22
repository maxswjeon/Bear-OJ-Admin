import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Section from "components/Section";
import { SubmitHandler, useForm } from "react-hook-form";

type UserCreationValues = {
  name: string;
  studentNumber: string;
  password: string;
};

const UserAddSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserCreationValues>();

  const addUser: SubmitHandler<UserCreationValues> = async (form) => {};

  return (
    <Section>
      <Heading as="h2" size="lg">
        유저 추가
      </Heading>
      <form onSubmit={handleSubmit(addUser)}>
        <FormControl mt="3" isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">이름</FormLabel>
          <Input id="name" {...register("name")} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={!!errors.studentNumber}>
          <FormLabel htmlFor="studentNumber">학번</FormLabel>
          <Input id="studentNumber" {...register("studentNumber")} />
          <FormErrorMessage>
            {errors.studentNumber && errors.studentNumber.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt="3" isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <Input id="password" type="password" />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button w="100%" mt="3" colorScheme="blue" type="submit">
          추가
        </Button>
      </form>
    </Section>
  );
};

export default UserAddSection;
