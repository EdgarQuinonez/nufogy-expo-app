import { View, Text, XStack, YStack, Input, Select, Paragraph } from "tamagui";
import React from "react";
import { Dot, Utensils, X } from "@tamagui/lucide-icons";
import { globalStyles } from "globalStyles";
import { DiaryFoodLog, FoodItemServing } from "@types";
import SelectDropdown from "@components/SelectDropdown";

export type Props = {
  foodItem: DiaryFoodLog;
};

export default function FoodItem({ foodItem }: Props) {
  const { fs_object, fs_serving, metric_serving_amount } = foodItem;
  const foodName = fs_object.food_name;

  const servingData = Array.isArray(fs_object.servings.serving)
    ? fs_object.servings.serving.find(
        (ser) => parseInt(ser.serving_id) === fs_serving
      )
    : fs_object.servings.serving;

  return (
    servingData && (
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
          <Utensils />
        </View>

        <YStack flex={1} ai={"flex-start"} jc={"space-between"}>
          {/* Upper */}
          <XStack flex={1} w={"100%"} ai={"center"} jc={"space-between"}>
            {/* Food Name */}
            <XStack ai={"flex-start"} jc={"center"}>
              <View ai={"center"} jc={"center"}>
                {/* TODO: Figure out text wrap and text overflow */}
                <Paragraph numberOfLines={2} maxWidth={"$12"}>
                  {foodName}
                </Paragraph>
              </View>
              <Dot color={"$gray7"} />
              <Paragraph>{metric_serving_amount}</Paragraph>
              <Paragraph ml={"$1"} color={"$gray10"}>
                {servingData.metric_serving_unit}
              </Paragraph>
            </XStack>
            {/* Calories */}
            <XStack gap={"$1"}>
              <Paragraph fontWeight={"bold"} fontSize={"$6"}>
                {servingData.calories}
              </Paragraph>
              <Paragraph color={"$gray10"}>kcal</Paragraph>
            </XStack>
          </XStack>
          {/* Lower */}
          <XStack flex={1} gap={"$2"}>
            {/* Protein */}
            <MacroDisplay
              color={globalStyles.protein}
              amount={servingData.protein}
              unit="g"
            />
            {/* Carbs */}
            <MacroDisplay
              color={globalStyles.carbs}
              amount={servingData.carbohydrate}
              unit="g"
            />
            {/* Fat */}
            <MacroDisplay
              color={globalStyles.fat}
              amount={servingData.fat}
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
  color: any;
  amount: string;
  unit: string;
}) {
  return (
    <XStack ai={"center"} jc={"center"} gap={"$1"}>
      <View style={color} h={"$0.75"} w={"$0.75"} borderRadius={"$true"} />
      <Paragraph>{amount}</Paragraph>
      <Paragraph color={"$gray10"}>{unit}</Paragraph>
    </XStack>
  );
}
