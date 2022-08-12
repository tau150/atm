import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { extract } from "services/operations";
import { ResultStatus } from "types";

export const useExtractMutation = (onNotEnoughBalance: Function) => {
  const toast = useToast();
  const router = useRouter();

  const { mutate } = useMutation(extract, {
    onSuccess: async (res, params) => {
      if (res.status === ResultStatus.NOT_ENOUGH_BALANCE) {
        onNotEnoughBalance();

        return;
      }

      router.push({
        pathname: "/success",
        query: { operation: "extraction", amount: params.amount },
      });
    },
    onError: () => {
      toast({
        title: "Something went wrong.",
        description: "It seems we are having some issues, please try later.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  return { mutate };
};
