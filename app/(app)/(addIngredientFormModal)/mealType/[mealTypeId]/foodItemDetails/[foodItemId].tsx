import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import FoodItemDetailsView from "@components/FoodItemDetailsView";
import { globalStyles } from "globalStyles";

import { getItem } from "@utils/AsyncStorage";
import { StoredValue } from "@types";

export default function FoodItemDetailsWrapper() {
  const { mealTypeId, foodItemId } = useLocalSearchParams();

  return (
    // <ScrollView>
    <SafeAreaView style={globalStyles.container}>
      <FoodItemDetailsView mealTypeId={mealTypeId} foodItemId={foodItemId} />
    </SafeAreaView>
    // </ScrollView>
  );
}
