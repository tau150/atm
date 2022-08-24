import type { Props } from "./types";

import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Routes } from "types";

const InsufficientFoundsModal: React.FC<Props> = ({ onClose, isOpen }) => {
  const router = useRouter();

  const handleRedirectBalance = (): void => {
    onClose();
    router.push(Routes.BALANCE);
  };

  const handleRedirectOther = (): void => {
    onClose();
    router.push(Routes.OTHER);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Text color="blackAlpha.700" fontSize={"1.2rem"} fontWeight="bold" mb={6} mt={6}>
            Your Balance is insufficient
          </Text>
          <Text color="blackAlpha.700">
            You can check your balance, try with other amount or cancel the operation
          </Text>
        </ModalBody>
        <ModalFooter data-testid="insufficient-modal-footer">
          <HStack>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleRedirectBalance}>
              Check Balance
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleRedirectOther}>
              Other amount
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InsufficientFoundsModal;
