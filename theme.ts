import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          primary: { value: "#131316" },
          secondary: { value: "#E3FCF2" },
          accent: { value: "#FF5403" },
        },
        gray: {
          50: { value: "#EFF1F6" },
          400: { value: "#56616B" },
        },
        dark: {
          300: { value: "#131316" },
        },
      },
      fonts: {
        body: { value: "var(--font-degular), system-ui, sans-serif" },
        heading: { value: "var(--font-degular), system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": {
          value: {
            base: "white",
            _dark: "gray.900",
          },
        },
        "text.primary": {
          value: {
            base: "gray.900",
            _dark: "gray.100",
          },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: "bg.canvas",
      color: "text.primary",
      fontFamily: "body",
    },
  },
});

export const system = createSystem(defaultConfig, config);
