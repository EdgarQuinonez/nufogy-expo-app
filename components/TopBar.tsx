import React from "react";
import { Link } from "expo-router";
import { Avatar, XStack, Spacer, YStack, Paragraph } from "tamagui";

const TopBar = () => {
  return (
    <YStack
      padding="$4"
      backgroundColor="$background"
      borderBottomWidth={1}
      borderColor="$borderColor"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Paragraph>Nufogy</Paragraph>
        <Spacer />

        <Link href="/login" asChild>
          <Avatar circular size="$10">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
        </Link>
      </XStack>
    </YStack>
  );
};

export default TopBar;
