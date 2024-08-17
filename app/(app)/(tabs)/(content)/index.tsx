import TopBar from "@components/TopBar";
import { Link } from "expo-router";
import { colors } from "globalStyles";
import React from "react";
import { H1, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" bg={colors.background.main}>
      <TopBar title="Dashboard" />
      <H1>Dashboard</H1>
    </YStack>
  );
}
