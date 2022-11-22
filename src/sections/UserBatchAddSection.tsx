import { Button, Heading } from "@chakra-ui/react";
import FileUpload from "components/FileUpload";
import Section from "components/Section";
import { SubmitHandler, useForm } from "react-hook-form";

type UserCreationValues = {
  name: string;
  studentNumber: string;
  password: string;
};

const UserBatchAddSection = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<UserCreationValues>();

  const addUser: SubmitHandler<UserCreationValues> = async (form) => {};

  return (
    <Section>
      <Heading as="h2" size="lg">
        파일에서 유저 추가
      </Heading>
      <form onSubmit={handleSubmit(addUser)}>
        <FileUpload
          name="file"
          acceptedFileTypes="text/csv"
          isRequired={true}
          placeholder="회원 목록 파일"
          control={control}
        >
          회원 목록 파일
        </FileUpload>
        <Button w="100%" mt="3" colorScheme="blue" type="submit">
          추가
        </Button>
      </form>
    </Section>
  );
};

export default UserBatchAddSection;
