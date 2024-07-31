import { View, Text } from "tamagui";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import ButtonProgressNext from "@components/ButtonNextProgress";

export default function WeightScreen() {
  return (
    <>
      <View bg={colors.background.main} f={1}>
        <Text>WeightScreen</Text>
      </View>
      <ButtonProgressNext step={1} nextScreen="height/index" />
    </>
  );
}
