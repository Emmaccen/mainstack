"use client";

import { apiEndpoints } from "@/api/endpoints";
import useFetchData from "@/hooks/useFetchData";
import { TransactionList, type UserTransactions } from "@/types";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

export const Transactions = () => {
  const {
    data,
    isLoading,
    // error
  } = useFetchData<TransactionList>(apiEndpoints.getTransactions);

  if (isLoading)
    return (
      <Box>
        <Text textAlign={"center"} p="5">
          Loading...
        </Text>
      </Box>
    );

  return (
    <Box mb={"166px"}>
      <Flex justify="space-between" align="flex-start">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={1}>
            24 Transactions
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight={"medium"}>
            Your transactions for the last 7 days
          </Text>
        </Box>

        <HStack gap={3}>
          <IconButton
            bg={"gray.50"}
            variant="ghost"
            size="md"
            height={12}
            p={"12px 20px 12px 30px"}
            borderRadius={"100px"}
            color={"dark.300"}
          >
            <Text mr={1}>Filter</Text>
            <Image src="/expand_more.svg" alt="" boxSize={4} />
          </IconButton>
          <IconButton
            bg={"gray.50"}
            variant="ghost"
            size="md"
            height={12}
            p={"12px 20px 12px 30px"}
            borderRadius={"100px"}
            color={"dark.300"}
          >
            <Text mr={1}>Export List</Text>
            <Image src="/download.svg" alt="" boxSize={4} />
          </IconButton>
        </HStack>
      </Flex>

      <Box as="hr" w="full" mt={6} mb={"33px"} bg="gray.50" h="1px" />

      {
        <VStack gap={6} align="stretch">
          {data?.map((transaction) => (
            <TransactionItem key={Math.random()} transaction={transaction} />
          ))}
        </VStack>
      }
    </Box>
  );
};

const TransactionItem = ({
  transaction,
}: {
  transaction: UserTransactions;
}) => {
  const isIncoming = transaction.type === "deposit";

  return (
    <Flex align="center" justify="space-between">
      <HStack gap={"14.5px"}>
        <Box
          w={12}
          h={12}
          borderRadius="full"
          bg={isIncoming ? "#E3FCF2" : "#F9E3E0"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {isIncoming ? (
            <Image src="/call_received.svg" alt="" boxSize={5} />
          ) : (
            <Image src="/call_made.svg" alt="" boxSize={5} />
          )}
        </Box>

        <VStack align="flex-start" gap={"9px"}>
          <Text fontWeight="medium" fontSize="md">
            {transaction.metadata?.product_name ?? transaction.metadata?.type}
          </Text>
          <Text fontWeight="medium" fontSize="sm" color="gray.400">
            {transaction.metadata?.name}
          </Text>
          {transaction.status && (
            <Text
              fontSize="xs"
              color={
                transaction.status === "successful" ? "green.600" : "yellow.600"
              }
              textTransform="capitalize"
            >
              {transaction.status}
            </Text>
          )}
        </VStack>
      </HStack>

      <VStack align="flex-end" gap={1}>
        <Text fontWeight="bold" fontSize="md">
          {transaction.amount}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {transaction.date}
        </Text>
      </VStack>
    </Flex>
  );
};
