import TopBar from "@components/TopBar";
import { Redirect, Slot, useRouter, useSegments } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { colors } from "globalStyles";

import React from "react";
import { SafeAreaView } from "react-native";

import { Paragraph, View } from "tamagui";

export default function TabLayout() {
  const router = useRouter();
  const segments = useSegments();

  let bgColor;

  switch (segments[3]) {
    case "diary":
      bgColor = colors.background.diary;
      break;
    case "diets":
      bgColor = "#0000FF";
      break;
    case "jack":
      bgColor = "#FFFF00";
      break;
    default:
      bgColor = colors.background.main;
  }
  console.log(bgColor);

  return (
    <View bg={bgColor} flex={1}>
      <StatusBar style="dark" />

      <Paragraph>Hola</Paragraph>
      <TopBar />
      <Slot />
    </View>
  );
}
