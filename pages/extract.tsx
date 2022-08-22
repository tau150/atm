import type { NextPage } from "next";
import type { RadioValue } from "types/pages";

import {
  Heading,
  VStack,
  Button,
  Stack,
  HStack,
  Box,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";

import { RadioValuesEnum } from "types/pages";
import InsufficientFoundsModal from "components/InsufficientFoundsModal";
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
      <Box>
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
          <Stack direction={["column", "row"]} w="60%">
            <VStack
              alignItems="flex-start"
              border={"1px"}
              borderColor="whiteAlpha.700"
              borderRadius={12}
              m={["0", "4"]}
              p="6"
              w={["100%", "20%"]}
            >
              <Radio colorScheme="gray" value={RadioValuesEnum.FiveHundred}>
                <Text as="span" color="white" fontWeight="bold">
                  500
                </Text>
              </Radio>
              <Radio colorScheme="gray" value={RadioValuesEnum.TwoThousand}>
                <Text as="span" color="white" fontWeight="bold">
                  2000
                </Text>
              </Radio>
              <Radio colorScheme="gray" value={RadioValuesEnum.ThreeThousand}>
                <Text as="span" color="white" fontWeight="bold">
                  3000
                </Text>
              </Radio>
            </VStack>
            <VStack
              alignItems="flex-start"
              border={"1px"}
              borderColor="whiteAlpha.700"
              borderRadius={12}
              m={["0", "4"]}
              p="6"
              w={["100%", "20%"]}
            >
              <Radio colorScheme="gray" value={RadioValuesEnum.FiveThousand}>
                <Text as="span" color="white" fontWeight="bold">
                  5000
                </Text>
              </Radio>
              <Radio colorScheme="gray" value={RadioValuesEnum.SixThousand}>
                <Text as="span" color="white" fontWeight="bold">
                  6000
                </Text>
              </Radio>
              <Radio colorScheme="gray" value={RadioValuesEnum.Other}>
                <Text as="span" color="white" fontWeight="bold">
                  Other
                </Text>
              </Radio>
            </VStack>
          </Stack>
        </RadioGroup>
        <HStack bottom="10%" justifyContent="space-around" mt="10%" width="100%">
          <Button colorScheme="gray" size="lg" onClick={() => router.push(Routes.HOME)}>
            Cancel
          </Button>
          <Button
            colorScheme="gray"
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
