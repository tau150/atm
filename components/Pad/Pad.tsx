import type { Props } from "./types";

import React from "react";
import { Stack, HStack, Flex, Button } from "@chakra-ui/react";

const Pad: React.FC<Props> = ({ onClickPadButton, enterButtonDisabled }: Props) => {
  return (
    <Flex align="center" border="1px" borderColor="gray" direction="column" p="4">
      <Stack>
        <HStack>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("1")}>
            1
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("2")}>
            2
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("3")}>
            3
          </Button>
        </HStack>
        <HStack>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("4")}>
            4
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("5")}>
            5
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("6")}>
            6
          </Button>
        </HStack>
        <HStack>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("7")}>
            7
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("8")}>
            8
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("9")}>
            9
          </Button>
        </HStack>
        <HStack>
          <Button
            colorScheme="orange"
            height="50px"
            w="80px"
            onClick={() => onClickPadButton("Delete")}
          >
            Delete
          </Button>
          <Button colorScheme="orange" height="50px" w="80px" onClick={() => onClickPadButton("0")}>
            0
          </Button>
          <Button
            colorScheme="orange"
            disabled={enterButtonDisabled}
            height="50px"
            w="80px"
            onClick={() => onClickPadButton("Enter")}
          >
            Enter
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Pad;
