import { Header } from "@/components/ui/shared/Header";
import { Box } from "@chakra-ui/react";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box minH="100vh">
      <Header />
      <Box maxW={"1160px"} mx={"auto"}>
        {children}
      </Box>
    </Box>
  );
};

export default layout;
