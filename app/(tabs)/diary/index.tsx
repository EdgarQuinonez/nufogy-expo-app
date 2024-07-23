import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { colors, globalStyles } from "globalStyles";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";
import CircularProgress from "react-native-circular-progress-indicator";
import MacroDisplay from "@components/MacroDisplay";
import useProfile from "@utils/useProfile";
import {
  calculateBMR,
  calculateTDEE,
  calculateRDI,
  calculateMacros,
} from "@utils/RDIcalculator";
import { FoodContext } from "@providers/FoodContext";
import FoodInfoSlides from "@components/FoodInfoSlides";
import { Goal } from "@tamagui/lucide-icons";

export default function DiaryScreen() {
  const { userProfile } = useProfile();
  const { selectedDate, setSelectedDate, getDayFilteredFoodLogs, daySummary } =
    useContext(FoodContext);

  const dayFilteredFoodLogs = getDayFilteredFoodLogs(selectedDate);

  const bmr = calculateBMR(
    userProfile?.age,
    userProfile?.sex,
    userProfile?.weight,
    userProfile?.height
  );
  const tdee = calculateTDEE(bmr, userProfile?.physical_activity);
  // TODO: Replace rate with user data
  const rdi = calculateRDI(
    tdee,
    userProfile?.weight,
    userProfile?.goal,
    "gradual"
  );
  // TODO: Macros slide for macro targets
  const macrosTargets = calculateMacros(
    rdi,
    userProfile?.weight,
    userProfile?.goal,
    userProfile?.physical_activity
  );

  const targetCalories = rdi;

  console.log(dayFilteredFoodLogs);

  const onSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={[globalStyles.diaryBackground, globalStyles.container]}
      >
        {/* Day summary  */}
        <YStack pb="$4" w={"100%"}>
          <FoodInfoSlides
            slides={[
              <XStack w={"100%"}>
                <View>
                  <CircularProgress
                    radius={72}
                    value={daySummary.calories}
                    maxValue={targetCalories}
                    activeStrokeWidth={18}
                    inActiveStrokeWidth={18}
                    progressValueColor={colors.text.main}
                    activeStrokeColor={colors.primary}
                    circleBackgroundColor={colors.background.main}
                    inActiveStrokeColor="#E0E0E0"
                    title="KCAL"
                    titleColor={colors.text.main}
                    titleStyle={{ fontSize: 12, fontWeight: "bold" }}
                  />
                </View>
                <View f={1} ai={"flex-end"} jc={"flex-start"} px={"$6"}>
                  <XStack
                    ai={"center"}
                    jc={"center"}
                    px={"$2"}
                    py={"$3"}
                    gap={"$4"}
                    borderRadius={"$2"}
                    bg={colors.background.main}
                    w={"100%"}
                  >
                    <Goal color={colors.secondary} size={32} />
                    <View>
                      <Paragraph color={colors.text.dim}>Objetivo: </Paragraph>
                      <Paragraph
                        fontSize={"$8"}
                        fontWeight={"bold"}
                        color={colors.text.main}
                      >
                        {Math.round(targetCalories)}
                      </Paragraph>
                    </View>
                  </XStack>
                </View>
              </XStack>,
              <View w={"100%"}>
                <Paragraph>Slide 2</Paragraph>
              </View>,
            ]}
          />

          {/* Macro Slide */}
          {/* <YStack gap="$2" flex={1} pl={"$4"}>
              <MacroDisplay macroType="protein" value={daySummary.protein} />
              <MacroDisplay
                macroType="carbohydrate"
                value={daySummary.carbohydrate}
              />
              <MacroDisplay macroType="fat" value={daySummary.fat} />
            </YStack> */}
        </YStack>
        {/* Lower 2 / 3. Calendar and Meal types  */}
        <View px={"$2"}>
          <YStack
            backgroundColor={colors.background.main}
            borderRadius={"$7"}
            borderBottomLeftRadius={"$0"}
            borderBottomRightRadius={"$0"}
          >
            <MonthWeekdayStrip
              selectedDate={selectedDate}
              onSelectDateChange={onSelectedDateChange}
            />
            {dayFilteredFoodLogs && (
              <DiaryDayView foodLogs={dayFilteredFoodLogs} />
            )}
          </YStack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
