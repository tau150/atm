import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    brand: "#2158bd",
  },
  styles: {
    global: {
      body: {
        background: "brand",
      },
      " p, h1, h2, h3, h4, h5, h6": {
        color: "white",
      },
    },
  },
});
