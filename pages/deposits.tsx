import type { NextPage } from "next";
import type { InputsState, InputKey } from "types/pages";

import { useMutation } from "@tanstack/react-query";
import { useToast, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Heading, Text, Stack, Box, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

import Pad from "components/Pad/Pad";
import { currencyFormatter } from "utils/currencyFormatter";
import { useActionTimeout } from "hooks/useActionTimeout";
import { useNumericPadKeyboard } from "hooks/useNumericPadKeyboard";
import { useAuthUser } from "contexts/AuthContext";
import { Routes, DeleteActions } from "types";
import { deposit } from "services/operations";

const ENTER = "Enter";

const Deposits: NextPage = () => {
  const [inputOnFocus, setInputOnFocus] = useState<InputKey>("");
  const [inputsValues, setInputsValues] = useState<InputsState>({
    "100": "0",
    "200": "0",
    "500": "0",
    "1000": "0",
  });

  const router = useRouter();
  const toast = useToast();
  const auth = useAuthUser();
  const { resetTimeout } = useActionTimeout(auth?.logout);

  const { mutate } = useMutation(deposit, {
    onSuccess: async (_, params) => {
      router.push({
        pathname: "/success",
        query: { operation: "deposit", amount: params.amount },
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

  const handleOnFocus = (key: InputKey): void => {
    resetTimeout();
    setInputOnFocus(key);
  };

  const getTotal = (): number => {
    let total = 0;

    for (const key in inputsValues) {
      total += Number(key) * Number(inputsValues[key as keyof typeof inputsValues]);
    }

    return total;
  };

  const handleClickButton = (key: string): void => {
    resetTimeout();
    if (key === DeleteActions.Delete) {
      setInputsValues((prevState) => {
        const newState = { ...prevState };

        newState[inputOnFocus as keyof typeof inputsValues] =
          prevState[inputOnFocus as keyof typeof inputsValues].slice(0, -1) || "0";

        return {
          ...newState,
        };
      });

      return;
    }
    if (key === ENTER) {
      mutate({ document: auth?.authUser.document, amount: getTotal() });

      return;
    }
    if (inputOnFocus === "" || String(inputsValues[inputOnFocus]).length === 4) return;

    const valueToAdd = inputsValues[inputOnFocus] === "0" ? key : inputsValues[inputOnFocus] + key;

    setInputsValues({ ...inputsValues, [inputOnFocus]: valueToAdd });
  };

  useNumericPadKeyboard(handleClickButton);

  const total = getTotal();

  return (
    <>
      <Box>
        <Heading as="h4" m={12} textAlign="center">
          Deposits
        </Heading>
        <Stack direction={["column", "row"]}>
          <Stack
            alignItems={["center"]}
            direction="row"
            justifyContent="center"
            mt={[0, 12]}
            spacing={12}
            w={["100%", "50%"]}
          >
            <Stack fontSize={20}>
              <Text fontWeight="bold" h="40px">
                Dollar
              </Text>
              <Text alignItems="center" display="flex" h="40px">
                $ 100
              </Text>
              <Text alignItems="center" display="flex" h="40px">
                $ 200
              </Text>
              <Text alignItems="center" display="flex" h="40px">
                $ 500
              </Text>
              <Text alignItems="center" display="flex" h="40px">
                $ 1000
              </Text>
            </Stack>
            <Stack fontSize={20}>
              <Text fontWeight="bold" h="40px">
                Amount
              </Text>
              <Input
                color="whiteAlpha.900"
                data-testid="input-100"
                fontWeight="bold"
                htmlSize={4}
                m={8}
                value={inputsValues["100"]}
                width="auto"
                onFocus={() => handleOnFocus("100")}
              />
              <Input
                alignItems="center"
                color="whiteAlpha.900"
                data-testid="input-200"
                display="flex"
                fontWeight="bold"
                htmlSize={4}
                value={inputsValues["200"]}
                width="auto"
                onFocus={() => handleOnFocus("200")}
              />
              <Input
                color="whiteAlpha.900"
                data-testid="input-500"
                display="flex"
                fontWeight="bold"
                htmlSize={4}
                value={inputsValues["500"]}
                width="auto"
                onFocus={() => handleOnFocus("500")}
              />
              <Input
                alignItems="center"
                color="whiteAlpha.900"
                data-testid="input-1000"
                display="flex"
                fontWeight="bold"
                htmlSize={4}
                value={inputsValues["1000"]}
                width="auto"
                onFocus={() => handleOnFocus("1000")}
              />
            </Stack>
          </Stack>
          <Stack alignItems="center" justifyContent="center" w={["100%", "50%"]}>
            <Stack alignItems="center" mt={[6, 0]}>
              <Text fontSize={20}>Amount of deposit</Text>
              <Text fontSize={30} fontWeight="bold">
                {currencyFormatter(total)}
              </Text>
            </Stack>
            <Pad enterButtonDisabled={total === 0} onClickPadButton={handleClickButton} />
          </Stack>
        </Stack>
        <Center>
          <Button
            colorScheme="gray"
            mt={[4, 20]}
            px={20}
            py={8}
            onClick={() => router.push(Routes.HOME)}
          >
            Cancel
          </Button>
        </Center>
      </Box>
    </>
  );
};

export default Deposits;
