import { View, Text, Paragraph, ScrollView } from "tamagui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItemDetailsView from "@components/FoodItemDetailsView";
import { globalStyles } from "globalStyles";
import useFetch from "@utils/useFetch";

export default function FoodItemDetailsWrapper() {
  const { mealTypeId, foodItemId } = useLocalSearchParams();

  useFetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/fs/fooditem/${foodItemId}/`
  );

  return (
    // <ScrollView>
    <SafeAreaView style={globalStyles.container}>
      <FoodItemDetailsView mealTypeId={mealTypeId} foodItemId={foodItemId} />
    </SafeAreaView>
    // </ScrollView>
  );
}
