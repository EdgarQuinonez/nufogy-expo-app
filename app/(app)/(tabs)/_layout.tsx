import TopBar from "@components/TopBar";
import { hasEmptyFields, useProfile } from "@providers/ProfileContext";
import { Redirect, Slot, useRouter, useSegments } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { colors, globalStyles } from "globalStyles";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Paragraph, ScrollView, Spinner, View } from "tamagui";

export default function TabLayout() {
  const { userProfile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ ...globalStyles.container, justifyContent: "center" }}
      >
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (!userProfile || hasEmptyFields(userProfile)) {
    return <Redirect href="/createProfile" />;
  }
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

  return (
    <View bg={bgColor} flex={1}>
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </View>
  );
}
