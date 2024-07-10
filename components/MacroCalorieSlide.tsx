// MacroCalorieSlide.tsx
import React from "react";
import { YStack, XStack } from "tamagui";
import MacroInputField from "@components/MacroInputField";
import { FoodItemServing } from "@types";
import DonutGraph from "./DonutGraph"; // Import the DonutGraph component
import Avocado from "@assets/icons/Avocado";
import { Beef, CakeSlice } from "@tamagui/lucide-icons";

interface MacroCalorieSlideProps {
  calculatedNutritionValues: {
    protein: number;
    carbohydrate: number;
    fat: number;
    calories: number;
  };
  onMacroInputChange: (
    macro: "protein" | "carbohydrate" | "fat",
    value: number
  ) => void;
}

const MacroCalorieSlide: React.FC<MacroCalorieSlideProps> = ({
  calculatedNutritionValues,
  onMacroInputChange,
}) => {
  const { protein, carbohydrate, fat, calories } = calculatedNutritionValues;
  const macrosSum = protein + carbohydrate + fat;

  return (
    <XStack ai={"center"} justifyContent={"space-between"} pb={"$2"}>
      <DonutGraph data={calculatedNutritionValues} />
      <YStack gap="$2" pl="$4">
        <MacroInputField
          icon={<Beef />}
          name="Proteína"
          amount={protein}
          macrosSum={macrosSum}
          onAmountChange={(value) => onMacroInputChange("protein", value)}
        />
        <MacroInputField
          icon={<CakeSlice />}
          name="Carbohidratos"
          amount={carbohydrate}
          macrosSum={macrosSum}
          onAmountChange={(value) => onMacroInputChange("carbohydrate", value)}
        />
        <MacroInputField
          icon={<Avocado />}
          name="Grasas"
          amount={fat}
          macrosSum={macrosSum}
          onAmountChange={(value) => onMacroInputChange("fat", value)}
        />
      </YStack>
    </XStack>
  );
};

export default MacroCalorieSlide;
