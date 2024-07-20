import { useState, useEffect, useMemo } from "react";
import { FoodItemServing } from "@types";

export default function useNutritionCalculator(
  initialServing?: FoodItemServing
) {
  const [selectedServing, setSelectedServing] =
    useState<FoodItemServing | null>(initialServing || null);
  const [unitAmount, setUnitAmount] = useState(
    initialServing?.number_of_units || 0
  );

  const [modifiedMacros, setModifiedMacros] = useState<{
    protein?: number;
    carbohydrate?: number;
    fat?: number;
  }>({});

  const calculatedNutritionValues = useMemo(() => {
    if (!selectedServing) return null;

    let multiplier = unitAmount / selectedServing.number_of_units;
    if (modifiedMacros.protein) {
      multiplier = modifiedMacros.protein / selectedServing.protein;
    } else if (modifiedMacros.carbohydrate) {
      multiplier = modifiedMacros.carbohydrate / selectedServing.carbohydrate;
    } else if (modifiedMacros.fat) {
      multiplier = modifiedMacros.fat / selectedServing.fat;
    }

    return {
      calories: Math.round(selectedServing.calories * multiplier),
      protein: selectedServing.protein * multiplier,
      carbohydrate: selectedServing.carbohydrate * multiplier,
      fat: selectedServing.fat * multiplier,
      sodium: Math.round(selectedServing.sodium * multiplier),
      sugar: Math.round(selectedServing.sugar * multiplier),
      fiber: Math.round(selectedServing.fiber * multiplier),
    };
  }, [unitAmount, selectedServing, modifiedMacros]);

  const handleMacroInputChange = (
    macro: "protein" | "carbohydrate" | "fat",
    value: number
  ) => {
    setModifiedMacros((prev) => ({ ...prev, [macro]: value }));

    if (selectedServing) {
      const newUnitAmount =
        (value / selectedServing[macro]) * selectedServing.number_of_units;
      setUnitAmount(newUnitAmount);
    }
  };

  // Effect to reset modifications when the serving changes
  useEffect(() => {
    if (selectedServing) {
      setModifiedMacros({});
      setUnitAmount(selectedServing.number_of_units);
    }
  }, [selectedServing]);

  return {
    selectedServing,
    setSelectedServing,
    unitAmount,
    setUnitAmount,
    calculatedNutritionValues,
    handleMacroInputChange,
  };
}
