import TopBar from "@components/TopBar";
import {
  BellRing,
  MousePointer,
  MousePointerClick,
} from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { colors } from "globalStyles";
import React from "react";
import { Button, H1, Paragraph, XStack, YStack } from "tamagui";
import { Image } from "react-native";
import activeStreak from "@assets/images/active-streak.webp";
import inactiveStreak from "@assets/images/inactive-streak.webp";

const activeStreakUri = Image.resolveAssetSource(activeStreak).uri;
const inactiveStreakUri = Image.resolveAssetSource(inactiveStreak).uri;

export default function HomeScreen() {
  return (
    <YStack f={1} ai="center" gap="$8" bg={colors.background.main}>
      <TopBar title="Dashboard" />
      {/* Demo Btn */}
      <Link href={"/"} asChild>
        <Button
          px={"$2"}
          py={"$3"}
          ai={"center"}
          jc={"center"}
          bg={colors.accent}
          borderColor={colors.text.main}
          borderWidth={1}
        >
          <Paragraph color={colors.background.main} fontWeight={"bold"}>
            Prueba la experiencia Nufogy
          </Paragraph>
          <MousePointerClick color={colors.background.main} />
        </Button>
      </Link>
      {/* TODO: Notification Island Swipeable component*/}
      <NotificationIsland />
      {/* Streak Week */}
      {/* TODO: Dynamically render WeekStreakItem. 6 items. Determine Status inactive, active, count from last 6 days */}
      <XStack>
        <WeekStreakItem />
      </XStack>
      {/* Histogram 15 days calorie count */}
    </YStack>
  );
}

function NotificationIsland() {
  return (
    <XStack bg={colors.background.accent} borderRadius={24} px={"$2"} py={"$1"}>
      <BellRing color={colors.text.main} />
      <Paragraph color={colors.text.main} fontWeight={"bold"}>
        Comida
      </Paragraph>
      <Paragraph color={colors.text.main}>&nbsp;a las 3 p. m.</Paragraph>
    </XStack>
  );
}

function WeekStreakItem() {
  return (
    <YStack
      ai={"center"}
      jc={"center"}
      gap={"$1"}
      py={"$1"}
      px={"$2"}
      borderColor={colors.text.dim}
      borderWidth={1}
      borderRadius={8}
    >
      {/* Streak Count */}
      <Paragraph color={colors.text.main} fontWeight={"bold"}>
        45
      </Paragraph>
      <Image source={{ uri: activeStreakUri, width: 30, height: 36 }} />

      {/* Day Calorie Count */}
      <Paragraph color={colors.text.dim1}>2516</Paragraph>
    </YStack>
  );
}
