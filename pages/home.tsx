import type { NextPage } from "next";
import type { ActionRoute } from "types/pages";

import { Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Heading, Center, Text, VStack, Button, HStack, Box } from "@chakra-ui/react";
import { AiOutlineRollback } from "react-icons/ai";
import { GiReceiveMoney, GiPayMoney, GiBank } from "react-icons/gi";

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
    <main>
      <Center>
        <VStack>
          <Heading as="h1" m="6">
            <Text as="span" fontWeight={400}>
              Welcome{" "}
            </Text>
            {auth?.authUser.name}{" "}
          </Heading>
          <Heading as="h6" fontSize={[18, 22]} m={6}>
            Which operation would like to make?
          </Heading>
        </VStack>
      </Center>
      <HStack justifyContent="center" m={[3, 0]} mt={6}>
        <Button
          fontSize={[16, 20]}
          m={[0, 6]}
          p={[10, 50]}
          onClick={() => handleActionClick(Routes.EXTRACT)}
        >
          <Icon as={GiReceiveMoney} fontSize={26} mr={4} />
          Extract
        </Button>
        <Button
          fontSize={[16, 20]}
          m={[0, 6]}
          p={[10, 50]}
          onClick={() => handleActionClick(Routes.DEPOSITS)}
        >
          <Icon as={GiPayMoney} fontSize={26} mr={4} />
          Deposit
        </Button>
      </HStack>
      <HStack justifyContent="center" m={[3, 0]}>
        <Button
          fontSize={[16, 20]}
          m={[0, 6]}
          p={[10, 50]}
          onClick={() => handleActionClick(Routes.BALANCE)}
        >
          <Icon as={GiBank} fontSize={26} mr={4} />
          Balance check
        </Button>
        <Button fontSize={[16, 20]} m={[0, 6]} p={[10, 50]} onClick={handleLogout}>
          <Icon as={AiOutlineRollback} fontSize={26} mr={4} />
          Cancel
        </Button>
      </HStack>
    </main>
  );
};

export default Home;
