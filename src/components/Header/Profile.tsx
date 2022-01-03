import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Willian Komada</Text>
          <Text color="gray.300" fontSize="small">
            williankomada@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Willian Komada"
        src="https://github.com/williankomada.png"
      />
    </Flex>
  );
}
