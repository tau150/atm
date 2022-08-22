import type { Props } from "./types";

import { Text, Center } from "@chakra-ui/react";

import { maskPassword } from "utils/maskPassword";

const PadDetail: React.FC<Props> = ({ content, maskContent = false }: Props) => {
  return (
    <Center border="1px" borderColor="whiteAlpha.700" borderRadius={12} h="50px" p={2} w="100%">
      <Text fontSize={28} fontWeight="bold">
        {maskContent ? maskPassword(content) : content}
      </Text>
    </Center>
  );
};

export default PadDetail;
