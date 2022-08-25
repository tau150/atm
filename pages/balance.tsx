import type { NextPage } from "next";

import { Heading, Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

import { useAuthUser } from "contexts/AuthContext";
import { balance } from "services/operations";
import Loading from "components/UI/Loading/Loading";
import ActionsAfterOperation from "components/ActionsAfterOperation";
import { currencyFormatter } from "utils/currencyFormatter";
import { useActionTimeout } from "hooks/useActionTimeout";

const Balance: NextPage = () => {
  const auth = useAuthUser();
  const toast = useToast();

  useActionTimeout(auth?.logout);
  const userDocument = auth?.authUser.document;

  const { data, isLoading, isError } = useQuery(
    ["balance", userDocument],
    () => balance(userDocument),
    {
      retry: 2,
    },
  );

  useEffect(() => {
    if (isError) {
      toast({
        title: "Something went wrong.",
        description: "It seems we are having some issues, please try later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [isError, toast]);

  if (isLoading) return <Loading />;

  const amount = data?.data.balance;

  return (
    <>
      <Box height="100vh">
        <Heading as="h4" m="6" mt="10%" textAlign="center">
          Your balance is:
        </Heading>
        <Heading as="h2" m="6" mt="3%" textAlign="center">
          {amount && currencyFormatter(amount)}
        </Heading>
        <ActionsAfterOperation />
      </Box>
    </>
  );
};

export default Balance;
