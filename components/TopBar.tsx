import React from "react";
import { Link } from "expo-router";
import {
  Avatar,
  XStack,
  Spacer,
  YStack,
  Paragraph,
  Heading,
  H1,
  H2,
} from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";

const TopBar = () => {
  return (
    <SafeAreaView style={{ position: "absolute" }}>
      <XStack
        width="100%"
        height={72}
        paddingHorizontal="$2"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={"$colorTransparent"}
      >
        <H2>Nufogy</H2>

        <Link href="/login" asChild>
          <Avatar circular size="$6">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
        </Link>
      </XStack>
    </SafeAreaView>
  );
};

export default TopBar;
