// MicrosSlide.tsx
import React from "react";
import { YStack } from "tamagui";
import MicronutrientBar from "@components/MicronutrientBar";

interface MicrosSlideProps {
  calculatedNutritionValues: {
    sodium: number;
    sugar: number;
    fiber: number;
  };
  currentIntakeAmounts: {
    sodium: number;
    sugar: number;
    fiber: number;
  };
  totalAmounts: {
    sodium: number;
    sugar: number;
    fiber: number;
  };
}

const MicrosSlide: React.FC<MicrosSlideProps> = ({
  calculatedNutritionValues,
  currentIntakeAmounts,
  totalAmounts,
}) => {
  return (
    <YStack ai={"center"} jc={"flex-start"} w={"100%"} gap={"$1"} pb={"$4"}>
      <MicronutrientBar
        name={"Sodio"}
        currentIntakeAmount={currentIntakeAmounts.sodium}
        amount={calculatedNutritionValues.sodium}
        unit={"mg"}
        totalAmount={totalAmounts.sodium}
      />
      <MicronutrientBar
        name={"Azúcar"}
        currentIntakeAmount={currentIntakeAmounts.sugar}
        amount={calculatedNutritionValues.sugar}
        unit={"g"}
        totalAmount={totalAmounts.sugar}
      />
      <MicronutrientBar
        name={"Fibra"}
        currentIntakeAmount={currentIntakeAmounts.fiber}
        amount={calculatedNutritionValues.fiber}
        unit={"g"}
        totalAmount={totalAmounts.fiber}
      />
    </YStack>
  );
};

export default MicrosSlide;
