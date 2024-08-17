import { View, Text } from "react-native";
import React from "react";
import { YStack } from "tamagui";
import MacroDisplay from "@components/MacroDisplay";

export type Props = {
  // [consumed, target]
  protein: [number, number];
  carbohydrate: [number, number];
  fat: [number, number];
};

export default function MacrosSlide({ protein, carbohydrate, fat }: Props) {
  return (
    <YStack w={"100%"} gap={"$2"} px={"$2"}>
      <MacroDisplay
        macroType={"protein"}
        value={protein[0] || 0}
        target={protein[1] || 0}
      />
      <MacroDisplay
        macroType={"carbohydrate"}
        value={carbohydrate[0] || 0}
        target={carbohydrate[1] || 0}
      />
      <MacroDisplay
        macroType={"fat"}
        value={fat[0] || 0}
        target={fat[1] || 0}
      />
    </YStack>
  );
}
