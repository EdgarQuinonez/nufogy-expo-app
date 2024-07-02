import { View, Text } from "tamagui";
import React from "react";

export type Props = {
  mealTypeId: string | string[] | undefined;
  foodItemId: string | string[] | undefined;
};

export default function FoodItemDetailsView({ mealTypeId, foodItemId }: Props) {
  return (
    <View>
      <Text>
        FoodItemDetailsView {mealTypeId} {foodItemId}
      </Text>
    </View>
  );
}
