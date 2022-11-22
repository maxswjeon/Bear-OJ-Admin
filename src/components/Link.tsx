import { chakra } from "@chakra-ui/react";
import NextLink from "next/link";

const Link = chakra(NextLink, {
  baseStyle: {
    cursor: "pointer",
  },
  shouldForwardProp: (prop) => ["href", "children"].includes(prop),
});

export default Link;
