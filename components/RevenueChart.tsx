"use client";
import { apiEndpoints } from "@/api/endpoints";
import useFetchData from "@/hooks/useFetchData";
import { WalletDetails } from "@/types";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { date: "Apr 1, 2022", value: 20000 },
  { date: "Apr 5, 2022", value: 45000 },
  { date: "Apr 10, 2022", value: 35000 },
  { date: "Apr 15, 2022", value: 60000 },
  { date: "Apr 20, 2022", value: 48000 },
  { date: "Apr 25, 2022", value: 55000 },
  { date: "Apr 30, 2022", value: 30000 },
];

export const RevenueChart = () => {
  const {
    data: wallet,
    // isLoading,
    // error,
  } = useFetchData<WalletDetails>(apiEndpoints.getWalletDetails);

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={{ base: 12, lg: 8 }}>
        <HStack gap={16} align="center" mb={8}>
          <VStack align="flex-start" gap={1}>
            <Text fontSize="sm" fontWeight={"medium"} color="gray.400">
              Available Balance
            </Text>
            <Text fontSize="4xl" color={"dark.300"} fontWeight="bold">
              USD 120,500.00
            </Text>
          </VStack>

          <Button
            bg="dark.300"
            color="white"
            borderRadius="full"
            fontWeight="semibold"
            fontSize="md"
            height={"52px"}
            width={"167px"}
          >
            Withdraw
          </Button>
        </HStack>

        <Box height="257px" w={"100%"} maxW={{ base: "100%", lg: "765px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="0"
                stroke="transparent"
                vertical={false}
              />
              {/* <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#56616B", fontSize: 14 }}
                tickFormatter={(value) => {
                  const parts = value.split(" ");
                  return `${parts[0]} ${parts[1].replace(",", "")}`;
                }}
              /> */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Line
                type="natural"
                dataKey="value"
                stroke="#F97316"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "#F97316" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box as="hr" w="full" mx={"15px"} bg="#DBDEE5" h="1px" />

        <HStack justify="space-between" mt={2} px={1}>
          <Text fontSize="xs" color="gray.500">
            Apr 1, 2022
          </Text>
          <Text fontSize="xs" color="gray.500">
            Apr 30, 2022
          </Text>
        </HStack>
      </GridItem>

      <GridItem colSpan={{ base: 12, lg: 1 }}></GridItem>
      <GridItem alignItems={"end"} colSpan={{ base: 12, lg: 3 }}>
        <VStack gap={6} align="stretch">
          <StatItem
            label="Ledger Balance"
            value={wallet?.ledger_balance ?? 0.0}
          />
          <StatItem label="Total Payout" value={wallet?.total_payout ?? 0.0} />
          <StatItem
            label="Total Revenue"
            value={wallet?.total_revenue ?? 0.0}
          />
          <StatItem
            label="Pending Payout"
            value={wallet?.pending_payout ?? 0.0}
          />
        </VStack>
      </GridItem>
    </Grid>
  );
};

const StatItem = ({ label, value }: { value: number; label: string }) => {
  return (
    <HStack align="flex-start" justify={"space-between"} gap={8}>
      <VStack align={"flex-start"} gap={2}>
        <Text fontSize="sm" color="gray.400">
          {label}
        </Text>
        <Text fontSize="28px" fontWeight="bold">
          USD {value}
        </Text>
      </VStack>
      <Image src="/info.svg" alt="info" boxSize={5} />
    </HStack>
  );
};
