import { View, Text, Paragraph } from "tamagui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItemDetailsView from "@components/FoodItemDetailsView";

export default function FoodItemDetailsWrapper() {
  const { mealTypeId, foodItemId } = useLocalSearchParams();

  return (
    <SafeAreaView>
      <FoodItemDetailsView mealTypeId={mealTypeId} foodItemId={foodItemId} />
    </SafeAreaView>
  );
}
