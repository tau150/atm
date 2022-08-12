import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

function AppProviders({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export function render(ui, ...renderOptions) {
  const returnValue = {
    ...rtlRender(ui, { wrapper: AppProviders, ...renderOptions }),
  };

  return returnValue;
}
