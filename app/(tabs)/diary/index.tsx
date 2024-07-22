import React, { useContext, useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { colors, globalStyles } from "globalStyles";
import { Beef, CakeSlice, X } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  DiaryFoodLog,
  FoodItemServing,
  FoodItemServingString,
  FoodItemString,
  StoredValue,
} from "@types";
import { getItem } from "@utils/AsyncStorage";
import { useAuth } from "@utils/useAuth";
import useFetch from "@utils/useFetch";
import useParseFoodItem from "@utils/useParseFoodItem";
import useNutritionCalculator from "@utils/useNutritionCalculator";
import MacroDisplay from "@components/MacroDisplay";
import parseFoodItemString from "@utils/parseFoodItemString";
import useProfile from "@utils/useProfile";
import {
  calculateBMR,
  calculateTDEE,
  calculateRDI,
  calculateMacros,
} from "@utils/RDIcalculator";
import { FoodContext } from "@providers/FoodContext";

export default function DiaryScreen() {
  const { userProfile } = useProfile();
  const {
    selectedDate,
    setSelectedDate,
    getDayFilteredFoodLogs,
    foodLogs,
    daySummary,
  } = useContext(FoodContext);
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

  const onSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={[globalStyles.diaryBackground, globalStyles.container]}
      >
        {/* Day summary  */}
        <YStack px={"$2"} pb="$4" w={"100%"}>
          {/* Circle progress bar  */}
          <XStack ai={"center"} justifyContent={"space-between"}>
            <CircularProgress
              radius={65}
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

            {/* Macro Slide */}
            <YStack gap="$2" flex={1} pl={"$4"}>
              <MacroDisplay macroType="protein" value={daySummary.protein} />
              <MacroDisplay
                macroType="carbohydrate"
                value={daySummary.carbohydrate}
              />
              <MacroDisplay macroType="fat" value={daySummary.fat} />
            </YStack>
          </XStack>
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
