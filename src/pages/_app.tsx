import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { SessionResponse } from "constants/Responses";
import theme from "constants/theme";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import { useAuthStore } from "store/auth";
import "styles/global.css";

function App({ Component, pageProps }: AppProps) {
  const clientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 0,
        },
      },
    })
  );

  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    // Session Alive every 5 seconds
    const sessionInterval = setInterval(async () => {
      const { data } = await axios.get<SessionResponse>(
        process.env.NEXT_PUBLIC_API_URL + "/admin/session",
        {
          withCredentials: true,
        }
      );

      setAuthenticated(data.status);
    }, 5 * 1000);

    return () => clearInterval(sessionInterval);
  }, [setAuthenticated]);

  return (
    <QueryClientProvider client={clientRef.current}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
