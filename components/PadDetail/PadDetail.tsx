import type { Props } from "./types";

import React from "react";
import { Text } from "@chakra-ui/react";

import { maskPassword } from "utils/maskPassword";

const PadDetail: React.FC<Props> = ({ content, maskContent = false }) => {
  return (
    <Text fontWeight="bold" mt="4">
      {maskContent ? maskPassword(content) : content}
    </Text>
  );
};

export default PadDetail;
