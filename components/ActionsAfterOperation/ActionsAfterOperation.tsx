import { Button, HStack, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useAuthUser } from "contexts/AuthContext";
import { Routes } from "types";

const ActionsAfterOperation: React.FC<{}> = () => {
  const router = useRouter();
  const auth = useAuthUser();

  const handleClickNo = () => {
    auth?.logout();
  };
  const handleClickYes = () => router.push(Routes.HOME);

  return (
    <Box>
      <Text fontSize={26} my="5%" textAlign="center">
        Do you want to make other operation?
      </Text>
      <HStack justifyContent="center" mt="2%" width="100%">
        <Button colorScheme="gray" mx={6} size="lg" onClick={handleClickYes}>
          Yes
        </Button>
        <Button colorScheme="gray" mx={6} size="lg" onClick={handleClickNo}>
          No
        </Button>
      </HStack>
    </Box>
  );
};

export default ActionsAfterOperation;
