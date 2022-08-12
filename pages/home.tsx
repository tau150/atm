import type { NextPage } from "next";
import type { ActionRoute } from "types/pages/home";

import { useRouter } from "next/router";
import { Heading, Center, Text, VStack, Button, HStack, Box } from "@chakra-ui/react";

import { Routes } from "types";
import { useAuthUser } from "contexts/AuthContext";
import { useActionTimeout } from "hooks/useActionTimeout";

const Home: NextPage = () => {
  const auth = useAuthUser();
  const router = useRouter();

  useActionTimeout(auth?.logout);
  const handleLogout = (): void => {
    auth?.logout();
  };

  const handleActionClick = (actionRoute: ActionRoute) => {
    router.push(actionRoute);
  };

  return (
    <Box height="100vh">
      <main>
        <Center>
          <VStack>
            <Heading as="h1" m="6">
              <Text as="span" fontWeight={400}>
                Welcome{" "}
              </Text>
              {auth?.authUser.name}{" "}
            </Heading>
            <Heading as="h6" fontSize={22} m="6">
              Which operation would like to make?
            </Heading>
          </VStack>
        </Center>
        <HStack justifyContent="center" mt="6">
          <Button m={6} p={8} onClick={() => handleActionClick(Routes.EXTRACT)}>
            Extract
          </Button>
          <Button m={6} p={8} onClick={() => handleActionClick(Routes.DEPOSITS)}>
            Deposit
          </Button>
        </HStack>
        <HStack justifyContent="center">
          <Button m={6} p={8} onClick={() => handleActionClick(Routes.BALANCE)}>
            Balance check
          </Button>
        </HStack>
      </main>
      <Button
        bottom="30"
        colorScheme="orange"
        left="30"
        m={6}
        p={8}
        pos="absolute"
        onClick={handleLogout}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default Home;
