import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import {
  faFaceSunglasses,
  faRightFromBracket,
  faSquareQuestion,
  faTrophy,
  faUsers
} from "@fortawesome/pro-solid-svg-icons";
import Logo from "assets/Logo.png";
import axios from "axios";
import Icon from "components/Icon";
import Image from "components/Image";
import Link from "components/Link";
import { useRouter } from "next/router";
import { useAuthStore } from "store/auth";

const Header = () => {
  const router = useRouter();
  const {setAuthenticated} = useAuthStore();

  const logout = async () => {
    await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/session", {
      withCredentials: true,
    });
    setAuthenticated(false);
    router.push("/login");
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      w="100%"
      fontSize="24pt"
      p="8pt"
      gap="6"
    >
      <Link href="/">
        <Flex cursor="pointer">
          <Image
            w="auto"
            h="auto"
            width="180px"
            src={Logo}
            alt="YCC Logo"
          />
          <Text ml="8pt" fontWeight={600} whiteSpace="pre">
            온라인 저지 관리자 페이지
          </Text>
        </Flex>
      </Link>
      <Spacer />
      <Link href="/users">
        <Icon cursor="pointer" icon={faUsers} />
      </Link>
      <Link href="/contests">
        <Icon cursor="pointer" icon={faTrophy} />
      </Link>
      <Link href="/problems">
        <Icon cursor="pointer" icon={faSquareQuestion} />
      </Link>
      <Link href="/cheat">
        <Icon cursor="pointer" icon={faFaceSunglasses} />
      </Link>
      <Box cursor="pointer">
        <Icon
          cursor="pointer"
          icon={faRightFromBracket}
          onClick={logout}
        />
      </Box>
    </Flex>
  );
};

export default Header;
