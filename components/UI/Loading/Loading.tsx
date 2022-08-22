import { VStack, Spinner, Heading } from "@chakra-ui/react";

const Loading: React.FC<{}> = () => {
  return (
    <VStack alignItems="center" display="flex" height="100vh" justifyContent="center">
      <Heading mb="2rem">Loading...</Heading>
      <Spinner
        color="white.500"
        emptyColor="blue.200"
        mt="2rem"
        size="xl"
        speed="0.65s"
        thickness="4px"
      />
    </VStack>
  );
};

export default Loading;
