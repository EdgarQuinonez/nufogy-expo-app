import { View, Text, Paragraph, ScrollView } from "tamagui";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import FoodItemDetailsView from "@components/FoodItemDetailsView";
import { globalStyles } from "globalStyles";
import useFetch from "@utils/useFetch";
import { getItem } from "@utils/AsyncStorage";
import { StoredValue } from "@types";

export default function FoodItemDetailsWrapper() {
  const { mealTypeId, foodItemId } = useLocalSearchParams();

  const [authToken, setAuthToken] = useState<StoredValue>("");

  const fetchAuthToken = async () => {
    const token = await getItem("authToken");
    setAuthToken(token);
  };

  useEffect(() => {
    fetchAuthToken();
  }, []);

  return (
    // <ScrollView>
    <SafeAreaView style={globalStyles.container}>
      {authToken && (
        <FoodItemDetailsView
          mealTypeId={mealTypeId}
          foodItemId={foodItemId}
          authToken={authToken}
        />
      )}
    </SafeAreaView>
    // </ScrollView>
  );
}
