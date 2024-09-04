import { View, Text, XStack, YStack, Input, Select, Paragraph } from "tamagui";
import React from "react";
import { Dot, Utensils, X } from "@tamagui/lucide-icons";
import { colors, globalStyles } from "globalStyles";
import { DiaryFoodLog, FoodItemServing } from "@types";
import SelectDropdown from "@components/SelectDropdown";
import useNutritionCalculator from "@utils/useNutritionCalculator";
import parseFoodItemString from "@utils/parseFoodItemString";
import { calculateNutritionValues } from "@utils/nutritionValuesCalculator";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export default function SwipeableFoodItem({ foodLog }: FoodItemProps) {
  const transalateX = useSharedValue(0);

  const pan = Gesture.Pan().onUpdate(({ translationX }) => {
    console.log(translationX);
  });

  return (
    <GestureDetector gesture={pan}>
      <FoodItem foodLog={foodLog} />
    </GestureDetector>
  );
}

export type FoodItemProps = {
  foodLog: DiaryFoodLog;
};

export function FoodItem({ foodLog }: FoodItemProps) {
  const { fs_object, fs_serving, metric_serving_amount } = foodLog;
  const foodName = fs_object.food_name;

  const foodItem = parseFoodItemString(fs_object);

  const servingData = Array.isArray(foodItem?.servings.serving)
    ? foodItem?.servings.serving.find((ser) => ser.serving_id === fs_serving)
    : foodItem?.servings.serving;

  const calculatedNutritionValues = calculateNutritionValues(
    metric_serving_amount,
    servingData
  );

  return (
    servingData &&
    calculatedNutritionValues && (
      <XStack
        ai={"center"}
        jc={"flex-start"}
        w={"100%"}
        backgroundColor={"$background"}
        borderRadius={"$4"}
        py={"$1"}
        px={"$2"}
      >
        <View pr={"$2"}>
          <Utensils color={colors.text.main} />
        </View>

        <YStack flex={1} ai={"flex-start"} jc={"space-between"}>
          {/* Upper */}
          <XStack flex={1} w={"100%"} ai={"center"} jc={"space-between"}>
            {/* Food Name */}
            <XStack ai={"flex-start"} jc={"center"}>
              <XStack
                ai={"center"}
                jc={"center"}
                maxWidth={"$12"}
                overflow="hidden"
                h={23}
              >
                {/* TODO: Figure out text wrap and text overflow */}
                <Text
                  numberOfLines={1}
                  color={colors.text.main}
                  ellipse={true}
                  ellipsizeMode="tail"
                >
                  {foodName}
                </Text>
              </XStack>
              <Dot color={colors.text.dim1} />
              <Paragraph color={colors.text.main}>
                {Math.round(metric_serving_amount)}
              </Paragraph>
              <Paragraph ml={"$1"} color={colors.text.dim1}>
                {servingData.metric_serving_unit}
              </Paragraph>
            </XStack>
            {/* Calories */}
            <XStack gap={"$1"}>
              <Paragraph
                fontWeight={"bold"}
                fontSize={"$6"}
                color={colors.text.main}
              >
                {Math.round(calculatedNutritionValues.calories)}
              </Paragraph>
              <Paragraph color={colors.text.dim1}>kcal</Paragraph>
            </XStack>
          </XStack>
          {/* Lower */}
          <XStack flex={1} gap={"$2"}>
            {/* Protein */}
            <MacroDisplay
              color={colors.protein}
              amount={calculatedNutritionValues?.protein}
              unit="g"
            />
            {/* Carbs */}
            <MacroDisplay
              color={colors.carbohydrate}
              amount={calculatedNutritionValues?.carbohydrate}
              unit="g"
            />
            {/* Fat */}
            <MacroDisplay
              color={colors.fat}
              amount={calculatedNutritionValues?.fat}
              unit="g"
            />
          </XStack>
        </YStack>
      </XStack>
    )
  );
}

function MacroDisplay({
  color,
  amount,
  unit,
}: {
  color: string;
  amount?: number;
  unit: string;
}) {
  return (
    <XStack ai={"center"} jc={"center"} gap={"$1"} w={"$4"}>
      <View bg={color} h={"$0.75"} w={"$0.75"} borderRadius={"$true"} />
      <Paragraph color={colors.text.main}>{Math.round(amount || 0)}</Paragraph>
      <Paragraph color={colors.text.dim1}>{unit}</Paragraph>
    </XStack>
  );
}
