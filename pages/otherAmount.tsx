import type { NextPage } from "next";

import { useCallback } from "react";
import { useRouter } from "next/router";
import {
  Heading,
  Center,
  Text,
  VStack,
  Button,
  Stack,
  Box,
  theme,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { DeleteActions, Routes } from "types";
import { currencyFormatter } from "utils/currencyFormatter";
import { useNumericPadKeyboard } from "hooks/useNumericPadKeyboard";
import { useExtractMutation } from "hooks/useExtractMutation";
import { useActionTimeout } from "hooks/useActionTimeout";
import { useAuthUser } from "contexts/AuthContext";
import Pad from "components/Pad/Pad";
import InsufficientFoundsModal from "components/InsufficientFoundsModal";

const ENTER = "Enter";

const OtherAmount: NextPage = () => {
  const [padState, setPadState] = useState<string>("0");
  const router = useRouter();
  const auth = useAuthUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useExtractMutation(handleNotEnoughBalance);
  const { resetTimeout } = useActionTimeout(auth?.logout);

  function handleNotEnoughBalance() {
    onOpen();
    setPadState("0");
  }

  const onClickPadButton = useCallback(
    (value: string) => {
      resetTimeout();
      if (value === DeleteActions.Backspace || value === DeleteActions.Delete) {
        setPadState((prevState) => prevState.slice(0, -1));

        return;
      }

      if (value === ENTER) {
        mutate({ document: auth?.authUser.document, amount: padState });

        return;
      }

      setPadState((prevState) => prevState.concat(value));
    },
    [auth?.authUser.document, mutate, padState, resetTimeout],
  );

  useNumericPadKeyboard(onClickPadButton);

  return (
    <Box height="100vh">
      <main>
        <Center>
          <Heading as="h1" m="6">
            Other Amount
          </Heading>
        </Center>
        <Stack alignItems={["center", "stretch"]} direction={["column", "row"]} mt={8}>
          <Text display={["block", "none"]} fontSize={32} fontWeight={theme.fontWeights.bold}>
            {currencyFormatter(Number(padState))}
          </Text>
          <VStack justifyContent="space-between" order={["1", "0"]} w="50%">
            <Text display={["none", "block"]} fontSize={32} fontWeight={theme.fontWeights.bold}>
              {currencyFormatter(Number(padState))}
            </Text>
            <Button colorScheme="gray" px={20} py={8} onClick={() => router.push(Routes.EXTRACT)}>
              Cancel
            </Button>
          </VStack>
          <Center order={["0", "1"]} w="50%">
            <Pad enterButtonDisabled={false} onClickPadButton={onClickPadButton} />
          </Center>
        </Stack>
      </main>
      <InsufficientFoundsModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OtherAmount;
