import React, { useEffect } from "react";
import {
  Paragraph,
  View,
  Text,
  YStack,
  XStack,
  ScrollView,
  H3,
  H4,
} from "tamagui";
import { StyleSheet } from "react-native";
import MealType from "@components/MealType";

export default function DiaryDayView() {
  return (
    <View p={"$4"} maxWidth={"100%"}>
      <H4 pl={"$2"}>Comidas del día</H4>

      {/* Meal Types Cards */}
      <YStack ai={"center"} jc={"flex-start"}>
        <MealType />
      </YStack>
    </View>
  );
}
