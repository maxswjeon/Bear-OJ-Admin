import {
  Box,
  Button,
  Center, FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import Logo from "assets/Logo.png";
import axios from "axios";
import Image from "components/Image";
import { LoginResponse } from "constants/Responses";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuthStore } from "store/auth";

type FormValues = {
  username: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const { authenticated, setAuthenticated } = useAuthStore();

  if (authenticated) {
    router.push("/");
  }

  const login: SubmitHandler<FormValues> = async (form) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/admin/session",
        {
          username: form.username,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (data.result) {
        setAuthenticated(true);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_ADMIN_NAME || "Bear OJ Admin"}</title>
      </Head>
      <Center w="100%" h="100%">
        <Box
          w="100%"
          maxW="30em"
          p={["24px", "24px", "56px"]}
          rounded={["0", "16px"]}
          shadow={["none", "dark-lg"]}
        >
          <Image src={Logo} alt="Logo" w="100%" />
          <Heading as="h1" size="md" mt="32px" textAlign="center" whiteSpace="pre">
            {process.env.NEXT_PUBLIC_ADMIN_NAME || "Bear OJ Admin"}
          </Heading>
          <form onSubmit={handleSubmit(login)}>
            <FormControl mt="3" isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">아이디</FormLabel>
              <Input
                id="username"
                {...register("username", {
                  required: "아이디를 입력해 주세요",
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt="3" isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "비밀번호를 입력해 주세요",
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              mt="3"
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
            >
              로그인
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default LoginPage;
