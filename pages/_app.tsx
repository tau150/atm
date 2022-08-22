import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, Image, Text, HStack } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";

import { theme } from "styles/theme";
import RouteProtection from "components/RouteGuard/RouteGuard";
import { AuthProvider } from "contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouteProtection>
            <>
              <Image
                alt="ABB Bank"
                position="absolute"
                right={["0", "6%"]}
                src="bg.png"
                top="70%"
                w="420px"
                zIndex={-1}
              />
              <HStack bg="white" h="60px" justifyContent="space-between">
                <Image alt="ABB Bank" ml={[0, 12]} src="logo.png" w="80px" />
                <Text color="brand" fontWeight="bold" pr={[2, 12]}>
                  <PhoneIcon mx={2} />
                  0800 - 8233213
                </Text>
              </HStack>

              <Component {...pageProps} />
            </>
          </RouteProtection>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
