"use client";

import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
