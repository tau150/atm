import type { NextPage } from "next";

import { Heading, Text, VStack, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ActionsAfterOperation from "components/ActionsAfterOperation";
import { useAuthUser } from "contexts/AuthContext";
import { currencyFormatter } from "utils/currencyFormatter";

const Success: NextPage = () => {
  const router = useRouter();
  const auth = useAuthUser();

  const amount = Number(router?.query?.amount);

  return (
    <>
      <VStack justifyContent="center">
        <Heading as="h5" mb="100px" mt="10%" textAlign="center" w={["80%", "40%"]}>
          Your {router.query.operation} of amount {currencyFormatter(amount)} in the account number:{" "}
          <Text color="blackAlpha.800" mt={4}>
            {auth?.authUser.accountNumber}
          </Text>
          <Text mt="2%">Was successfully completed</Text>
        </Heading>
        <Box>
          <ActionsAfterOperation />
        </Box>
      </VStack>
    </>
  );
};

export default Success;
