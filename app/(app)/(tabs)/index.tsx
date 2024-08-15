import { Airplay } from "@tamagui/lucide-icons";
import { Link, router } from "expo-router";
import React from "react";
import { Button, H1, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" px="$10" pt="$5">
      <H1>Dashboard</H1>
      <Link href="/(app)/demo" asChild>
        <Button alignSelf="center" size="$6">
          DEMO
        </Button>
      </Link>
    </YStack>
  );
}
