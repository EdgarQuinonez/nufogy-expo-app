import { Text, YStack, Input, View } from "tamagui";
import { useRouter, useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import FoodSearchView from "@components/FoodSearchView";
import { getItem } from "@utils/AsyncStorage";
import { StoredValue } from "@types";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "globalStyles";

export default function FoodSearchViewWrapper() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <FoodSearchView />
    </SafeAreaView>
  );
}
