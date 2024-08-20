import TopBar from "@components/TopBar";
import { BellRing, MousePointerClick } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { colors } from "globalStyles";
import React from "react";
import {
  Button,
  H4,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Dimensions, Image } from "react-native";
import activeStreak from "@assets/images/active-streak.webp";
import inactiveStreak from "@assets/images/inactive-streak.webp";
import { LineChart } from "react-native-chart-kit";

const activeStreakUri = Image.resolveAssetSource(activeStreak).uri;
const inactiveStreakUri = Image.resolveAssetSource(inactiveStreak).uri;

export default function HomeScreen() {
  // TODO: Replace with actual data
  const minCalorieCount = 2343;
  const maxCalorieCount = 2514;
  const calorieCountData = Array.from(
    { length: 15 },
    () =>
      Math.floor(Math.random() * (maxCalorieCount - minCalorieCount)) +
      minCalorieCount
  );

  const dayLabels = Array.from({ length: 15 }, (_, i) => {
    const reverseIndex = 14 - i;

    const number =
      new Date(Date.now() - reverseIndex * 24 * 60 * 60 * 1000).getDate() + 1;

    return number.toString();
  });

  return (
    <ScrollView f={1} bg={colors.background.main}>
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
      <H4 color={colors.text.main}>Consumo de los últimos 15 días</H4>
      <BezierChart labels={dayLabels} data={calorieCountData} />
    </ScrollView>
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

type BezierChartProps = {
  labels: string[];
  data: number[];
};

function BezierChart({ labels, data }: BezierChartProps) {
  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={Dimensions.get("window").width - 16}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: colors.background.main,
          backgroundGradientTo: colors.background.main,
          fillShadowGradientFrom: colors.background.main,
          fillShadowGradientTo: colors.background.main,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(104, 71, 253, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(52, 52, 52, ${opacity})`,

          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: colors.accent,
          },
        }}
        withVerticalLabels={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        bezier
      />
    </View>
  );
}
