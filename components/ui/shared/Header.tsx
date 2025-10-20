"use client";
import { apiEndpoints } from "@/api/endpoints";
import useFetchData from "@/hooks/useFetchData";
import { UserDetails } from "@/types";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Popover,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

import {
  Bug,
  Gift,
  Grid3x3,
  LogOut,
  Receipt,
  Settings,
  UserCircle,
} from "lucide-react";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export const UserProfileMenuPopover = () => {
  const {
    data: userProfile,
    isLoading,
    // error,
  } = useFetchData<UserDetails>(apiEndpoints.getUserDetails);

  const menuItems: MenuItem[] = [
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <Receipt size={20} />, label: "Purchase History" },
    { icon: <Gift size={20} />, label: "Refer and Earn" },
    { icon: <Grid3x3 size={20} />, label: "Integrations" },
    { icon: <Bug size={20} />, label: "Report Bug" },
    { icon: <UserCircle size={20} />, label: "Switch Account" },
    { icon: <LogOut size={20} />, label: "Sign Out" },
  ];

  return (
    <Popover.Root positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}>
      <Popover.Trigger asChild>
        <Flex
          cursor={"pointer"}
          gap={2}
          bg={"#EFF1F6"}
          borderRadius={"full"}
          align={"center"}
          height={10}
          pl="0.3125rem"
          pr="3"
        >
          <Flex
            justify={"center"}
            align={"center"}
            boxSize={8}
            borderRadius="full"
            bg="linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)"
          >
            <Text
              color={"white"}
              textAlign={"center"}
              fontWeight="semibold"
              fontSize={"md"}
            >
              {isLoading
                ? "..."
                : `${userProfile?.first_name[0]}${userProfile?.last_name[0]}`}
            </Text>
          </Flex>
          <IconButton
            aria-label="Menu"
            variant="ghost"
            color="gray.400"
            boxSize={5}
          >
            <Image src="/menu.svg" alt="" boxSize={5} />
          </IconButton>
        </Flex>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body>
              <Box p={6} borderBottom="1px solid" borderColor="gray.200">
                <HStack gap={4}>
                  <Box
                    w={12}
                    h={12}
                    borderRadius="full"
                    bg="gray.800"
                    color="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontWeight="semibold"
                    fontSize="lg"
                  >
                    OJ
                  </Box>
                  <VStack align="flex-start" gap={0}>
                    <Text fontWeight="semibold" fontSize="lg">
                      {`${userProfile?.first_name} ${userProfile?.last_name}`}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {userProfile?.email}
                    </Text>
                  </VStack>
                </HStack>
              </Box>

              <VStack gap={3} align="stretch" py={2}>
                {menuItems.map((item, index) => (
                  <Box
                    key={index}
                    as="button"
                    px={6}
                    py={3}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    _hover={{ bg: "gray.50", borderRadius: "md" }}
                    cursor="pointer"
                    transition="background 0.2s"
                    onClick={item.onClick}
                    textAlign="left"
                    width="100%"
                  >
                    <Box color="gray.700">{item.icon}</Box>
                    <Text fontSize="md" fontWeight="semibold">
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export const Header = () => {
  return (
    <Flex
      align={"center"}
      height={16}
      borderRadius={25}
      border={"white"}
      pl={6}
      pr={3}
      boxShadow={
        "0px 2px 6px rgba(45, 59, 67, 0.06), 0px 2px 4px rgba(45, 59, 67, 0.05)"
      }
      maxW={"1408px"}
      margin={"auto"}
      mt={4.5}
      as="header"
    >
      <Flex align="center" justify="space-between" w={"full"}>
        <Image src="/logo.svg" alt="" boxSize={9} />

        <HStack gap={5} display={{ base: "none", md: "flex" }}>
          <Link
            _hover={{ bg: "gray.50", borderRadius: "full" }}
            textDecor={"none"}
            transition={".3s all ease"}
            height={10}
            pl="3.5"
            pr="4.5"
            asChild
          >
            <HStack
              gap={1}
              fontSize="md"
              fontWeight="semibold"
              color="gray.400"
            >
              <Image src="/home.svg" alt="" boxSize={5} />
              <Text>Home</Text>
            </HStack>
          </Link>
          <Link
            _hover={{ bg: "gray.50", borderRadius: "full" }}
            textDecor={"none"}
            transition={".3s all ease"}
            height={10}
            pl="3.5"
            pr="4.5"
            asChild
          >
            <HStack
              gap={1}
              fontSize="md"
              fontWeight="semibold"
              color="gray.400"
            >
              <Image src="/insert_chart.svg" alt="" boxSize={5} />
              <Text>Analytics</Text>
            </HStack>
          </Link>
          <Link
            bg="dark.300"
            borderRadius={25}
            color={"white"}
            height={10}
            pl="3.5"
            pr="4.5"
            asChild
          >
            <HStack
              gap={1}
              fontSize="md"
              fontWeight="semibold"
              color="gray.400"
            >
              <Image src="/payments.svg" alt="" boxSize={5} />
              <Text>Revenue</Text>
            </HStack>
          </Link>
          <Link
            _hover={{ bg: "gray.50", borderRadius: "full" }}
            textDecor={"none"}
            transition={".3s all ease"}
            height={10}
            pl="3.5"
            pr="4.5"
            asChild
          >
            <HStack
              gap={1}
              fontSize="md"
              fontWeight="semibold"
              color="gray.400"
            >
              <Image src="/group.svg" alt="" boxSize={5} />
              <Text>CRM</Text>
            </HStack>
          </Link>
          <Link
            _hover={{ bg: "gray.50", borderRadius: "full" }}
            textDecor={"none"}
            transition={".3s all ease"}
            height={10}
            pl="3.5"
            pr="4.5"
            asChild
          >
            <HStack
              gap={1}
              fontSize="md"
              fontWeight="semibold"
              color="gray.400"
            >
              <Image src="/widgets.svg" alt="" boxSize={5} />
              <Text>Apps</Text>
            </HStack>
          </Link>
        </HStack>

        <HStack gap={2}>
          <IconButton
            aria-label="Notifications"
            variant="ghost"
            color="gray.400"
            boxSize={10}
          >
            <Image src="/notifications.svg" alt="" boxSize={5} />
          </IconButton>
          <IconButton
            aria-label="Messages"
            variant="ghost"
            color="gray.400"
            boxSize={10}
          >
            <Image src="/chat.svg" alt="" boxSize={5} />
          </IconButton>

          <UserProfileMenuPopover />
        </HStack>
      </Flex>
    </Flex>
  );
};
