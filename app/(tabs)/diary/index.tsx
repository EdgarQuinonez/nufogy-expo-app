import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { globalStyles } from "globalStyles";
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

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const authToken = useAuth();
  // TODO: I don't know if it will be different url, but somehow you need to let the backend know which date you want to get the logs from and then filter for the day
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs `;
  const {
    loading,
    error,
    value: foodItems,
  } = useFetch<DiaryFoodLog[]>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );
  const dayFilteredFoodItems =
    foodItems?.filter((foodItem) => {
      const foodItemDate = new Date(foodItem.dateTime);
      return (
        foodItemDate.getDate() === selectedDate.getDate() &&
        foodItemDate.getMonth() === selectedDate.getMonth() &&
        foodItemDate.getFullYear() === selectedDate.getFullYear()
      );
    }) || [];

  const daySummary = useMemo(() => {
    const summary = {
      protein: 0,
      carbohydrate: 0,
      fat: 0,
      calories: 0,
      sodium: 0,
      sugar: 0,
      fiber: 0,
    };

    dayFilteredFoodItems.forEach((foodLog) => {
      const foodItem = parseFoodItemString(foodLog.fs_object);

      const serving = Array.isArray(foodItem?.servings.serving)
        ? foodItem?.servings.serving[0]
        : foodItem?.servings.serving;
      if (serving) {
        const calculatedNutritionValues = {
          protein: serving.protein,
          carbohydrate: serving.carbohydrate,
          fat: serving.fat,
          calories: serving.calories,
          sodium: serving.sodium,
          sugar: serving.sugar,
          fiber: serving.fiber,
        };

        summary.protein += calculatedNutritionValues?.protein || 0;
        summary.carbohydrate += calculatedNutritionValues?.carbohydrate || 0;
        summary.fat += calculatedNutritionValues?.fat || 0;
        summary.calories += calculatedNutritionValues?.calories || 0;
        summary.sodium += calculatedNutritionValues?.sodium || 0;
        summary.sugar += calculatedNutritionValues?.sugar || 0;
        summary.fiber += calculatedNutritionValues?.fiber || 0;
      }
    });
    return summary;
  }, [dayFilteredFoodItems]);

  //  TODO: Replace with user data
  const targetCalories = 2000;
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
          {/* TODO: Change circle progress colors and define them in globalSTyles */}
          <XStack ai={"center"} justifyContent={"space-between"}>
            <CircularProgress
              radius={65}
              value={daySummary.calories}
              maxValue={targetCalories}
              activeStrokeWidth={15}
              progressValueColor="#FF0000"
              title="KCAL"
              titleColor="#000"
              titleStyle={{ fontSize: 12, fontWeight: "bold" }}
            />

            {/* Macro Slide */}
            <YStack gap="$2" flex={1} pl={"$4"}>
              <Button
                unstyled={true}
                backgroundColor={"#EF7D7D"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <Beef />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Proteína
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        {Math.round(daySummary.protein)}&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>

              <Button
                unstyled={true}
                backgroundColor={"#41BF84"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <CakeSlice />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Carbohidratos
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        {Math.round(daySummary.carbohydrate)}&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>

              <Button
                unstyled={true}
                backgroundColor={"#77ABD9"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <Avocado width={26} height={26} />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Grasas
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        {Math.round(daySummary.fat)}&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>
            </YStack>
          </XStack>
        </YStack>
        {/* Lower 2 / 3. Calendar and Meal types  */}
        <View px={"$2"}>
          <YStack
            backgroundColor={"$background"}
            borderRadius={"$7"}
            borderBottomLeftRadius={"$0"}
            borderBottomRightRadius={"$0"}
          >
            <MonthWeekdayStrip
              selectedDate={selectedDate}
              onSelectDateChange={onSelectedDateChange}
            />
            {dayFilteredFoodItems && (
              <DiaryDayView foodItems={dayFilteredFoodItems} />
            )}
          </YStack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
function parseFoodItemString(foodItemString: FoodItemString) {
  if (!foodItemString) return undefined;

  const parseServing = (serving: FoodItemServingString): FoodItemServing => ({
    calcium: parseInt(serving.calcium, 10),
    calories: parseInt(serving.calories, 10),
    carbohydrate: parseFloat(serving.carbohydrate),
    cholesterol: parseInt(serving.cholesterol, 10),
    fat: parseFloat(serving.fat),
    fiber: parseFloat(serving.fiber),
    iron: parseFloat(serving.iron),
    measurement_description: serving.measurement_description,
    metric_serving_amount: parseFloat(serving.metric_serving_amount),
    metric_serving_unit: serving.metric_serving_unit,
    monounsaturated_fat: parseInt(serving.monounsaturated_fat, 10),
    number_of_units: parseFloat(serving.number_of_units),
    polyunsaturated_fat: parseFloat(serving.polyunsaturated_fat),
    potassium: parseInt(serving.potassium, 10),
    protein: parseFloat(serving.protein),
    saturated_fat: parseFloat(serving.saturated_fat),
    serving_description: serving.serving_description,
    serving_id: parseInt(serving.serving_id, 10),
    serving_url: serving.serving_url,
    sodium: parseInt(serving.sodium, 10),
    sugar: parseFloat(serving.sugar),
    vitamin_a: parseInt(serving.vitamin_a, 10),
    vitamin_c: parseFloat(serving.vitamin_c),
    vitamin_d: parseInt(serving.vitamin_d, 10),
  });

  return {
    food_id: parseInt(foodItemString.food_id, 10),
    food_name: foodItemString.food_name,
    food_type: foodItemString.food_type,
    food_url: foodItemString.food_url,
    servings: {
      serving: Array.isArray(foodItemString.servings.serving)
        ? foodItemString.servings.serving.map(parseServing)
        : parseServing(foodItemString.servings.serving),
    },
  };
}
