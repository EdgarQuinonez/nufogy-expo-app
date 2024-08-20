import TopBar from "@components/TopBar";
import {
  BellRing,
  Bot,
  Mic,
  Mic2,
  MousePointerClick,
} from "@tamagui/lucide-icons";
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

  const calorieCountStreak = calorieCountData.slice(-6);
  // TODO: Replace with actual data
  const currentCountStreak = 49;

  return (
    <ScrollView f={1} bg={colors.background.main}>
      <TopBar title="Dashboard" />
      <YStack gap={"$4"} p={"$2"}>
        {/* TODO: Notification Island Swipeable component*/}
        <NotificationIsland />
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
            <Paragraph
              color={colors.background.main}
              fontWeight={"bold"}
              lineHeight={16}
            >
              Prueba la experiencia Nufogy
            </Paragraph>
            <MousePointerClick color={colors.background.main} />
          </Button>
        </Link>

        {/* Streak Week */}
        {/* TODO: Dynamically render WeekStreakItem. 6 items. Determine Status inactive, active, count from last 6 days */}
        {/* Consider case where streak is 1. Empty slots */}
        <XStack ai={"center"} jc={"center"} gap={"$2"}>
          {calorieCountStreak.map((calorieCount, i) => {
            const currentDayCount = currentCountStreak + 1;
            const reverseIndex = 5 - i;
            const day = currentDayCount - reverseIndex;
            const status = i < 5 ? "active" : "inactive";
            return (
              <WeekStreakItem
                key={i}
                status={status}
                count={day}
                calories={calorieCount}
              />
            );
          })}
        </XStack>
        {/* Histogram 15 days calorie count */}
        <H4 color={colors.text.main}>Consumo de los últimos 15 días</H4>
        <BezierChart labels={dayLabels} data={calorieCountData} />
        {/* Jack Bubble */}
        <XStack ai={"center"} jc={"flex-start"}>
          <Bot color={colors.text.main} size={32} mr={"$2"} />
          <H4 color={colors.text.main}>Jack:&nbsp;</H4>
          <H4 color={colors.text.main} fontWeight={400}>
            Asistente Virtual
          </H4>
        </XStack>
        <View
          borderRadius={12}
          borderColor={colors.text.dim}
          p={"$2"}
          borderWidth={2}
        >
          <Paragraph color={colors.text.main}>
            ¡Hola! Soy Jack, tu asistente virtual. Estoy aquí para ayudarte a
            alcanzar tus objetivos de salud y bienestar. ¿En qué puedo ayudarte
            hoy?
          </Paragraph>
        </View>
        <Button
          px={"$2"}
          py={"$3"}
          ai={"center"}
          jc={"center"}
          bg={colors.secondary}
          borderColor={colors.text.main}
          borderWidth={1}
        >
          <Mic color={colors.text.main} />
          <Paragraph
            color={colors.text.main}
            fontWeight={"bold"}
            lineHeight={16}
          >
            Habla con Jack
          </Paragraph>
        </Button>
      </YStack>
    </ScrollView>
  );
}

function NotificationIsland() {
  return (
    <XStack
      bg={colors.background.accent}
      borderRadius={24}
      px={"$3"}
      py={"$2"}
      ai={"center"}
      jc={"center"}
      alignSelf={"center"}
    >
      <BellRing color={colors.text.main} mr={"$2"} />
      <Paragraph color={colors.text.main} fontWeight={"bold"}>
        Comida
      </Paragraph>
      <Paragraph color={colors.text.main}>&nbsp;a las 3 p. m.</Paragraph>
    </XStack>
  );
}

type WeekStreakItemProps = {
  status: "active" | "inactive";
  count: number;
  calories: number;
};
function WeekStreakItem({ status, count, calories }: WeekStreakItemProps) {
  return (
    <YStack
      ai={"center"}
      jc={"center"}
      gap={"$1"}
      w={52}
      h={80}
      borderColor={colors.text.dim}
      borderWidth={1}
      borderRadius={8}
      pos={"relative"}
    >
      {/* Streak Count */}
      <Paragraph color={colors.text.main} fontWeight={"bold"}>
        {count}
      </Paragraph>
      {status === "active" ? (
        <Image source={{ uri: activeStreakUri, width: 30, height: 36 }} />
      ) : (
        <Image source={{ uri: inactiveStreakUri, width: 30, height: 36 }} />
      )}

      {/* Day Calorie Count */}
      <Paragraph color={colors.text.dim1}>{calories}</Paragraph>
      {status === "inactive" && (
        <View
          w={"100%"}
          h={"100%"}
          pos={"absolute"}
          zIndex={1}
          bg={"black"}
          borderRadius={8}
          opacity={0.25}
        />
      )}
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
