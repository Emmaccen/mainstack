import { RevenueChart } from "@/components/RevenueChart";
import { Transactions } from "@/components/TransactionList";
import { Box, Stack } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Box>
      <Stack gap="8">
        <Box mt="62px">
          <RevenueChart />
        </Box>

        <Transactions />
      </Stack>
    </Box>
  );
}
