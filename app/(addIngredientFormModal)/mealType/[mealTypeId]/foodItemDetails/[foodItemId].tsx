import { View, Text, Paragraph } from "tamagui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItemDetailsView from "@components/FoodItemDetailsView";

export default function FoodItemDetailsWrapper() {
  const { mealTypeId, foodItemId } = useLocalSearchParams();
  console.log("mealTypeId in wrapper", mealTypeId);

  return (
    <SafeAreaView>
      <Paragraph> What's up</Paragraph>

      {/* <FoodItemDetailsView mealTypeId={mealTypeId} foodItemId={foodItemId} /> */}
      <FoodItemDetailsView mealTypeId={mealTypeId} foodItemId={foodItemId} />
    </SafeAreaView>
  );
}
