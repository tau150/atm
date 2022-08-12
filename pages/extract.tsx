import type { NextPage } from "next";
import type { RadioValue } from "types/pages/extract";

import {
  Heading,
  VStack,
  Button,
  HStack,
  Box,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

import InsufficientFoundsModal from "components/InsufficientFoundsModal";
import { RadioValuesEnum } from "types/pages/extract";
import { Routes } from "types";
import { useExtractMutation } from "hooks/useExtractMutation";
import { useActionTimeout } from "hooks/useActionTimeout";
import { useAuthUser } from "contexts/AuthContext";

const Extract: NextPage = () => {
  const [radioValue, setRadioValue] = useState<RadioValue>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useAuthUser();
  const router = useRouter();
  const { resetTimeout } = useActionTimeout(auth?.logout);
  const { mutate } = useExtractMutation(handleNotEnoughBalance);

  function handleNotEnoughBalance(): void {
    onOpen();
    setRadioValue("");
  }

  const handleChangeValue = (value: RadioValue): void => {
    resetTimeout();
    setRadioValue(value);
    if (value === RadioValuesEnum.Other) {
      router.push(Routes.OTHER);
    }
  };

  const handleContinue = () => {
    mutate({ document: auth?.authUser.document, amount: radioValue });
  };

  return (
    <>
      <Box height="100vh">
        <Heading as="h4" m="6" textAlign="center">
          Extraction
        </Heading>
        <RadioGroup
          as="div"
          colorScheme="orange"
          display={"flex"}
          justifyContent="center"
          size="lg"
          value={radioValue}
          onChange={handleChangeValue}
        >
          <VStack alignItems="flex-start" border={"1px"} m="4" p="6" width="20%">
            <Radio value={RadioValuesEnum.FiveHundred}>500</Radio>
            <Radio value={RadioValuesEnum.TwoThousand}>2000</Radio>
            <Radio value={RadioValuesEnum.ThreeThousand}>3000</Radio>
          </VStack>
          <VStack alignItems="flex-start" border={"1px"} m="4" p="6" width="20%">
            <Radio value={RadioValuesEnum.FiveThousand}>5000</Radio>
            <Radio value={RadioValuesEnum.SixThousand}>6000</Radio>
            <Radio value={RadioValuesEnum.Other}>Other</Radio>
          </VStack>
        </RadioGroup>
        <HStack bottom="10%" justifyContent="space-around" mt="10%" width="100%">
          <Button colorScheme="orange" size="lg" onClick={() => router.push(Routes.HOME)}>
            Cancel
          </Button>
          <Button
            colorScheme="orange"
            disabled={radioValue === "" || radioValue === RadioValuesEnum.Other}
            size="lg"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </HStack>
      </Box>
      <InsufficientFoundsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Extract;
