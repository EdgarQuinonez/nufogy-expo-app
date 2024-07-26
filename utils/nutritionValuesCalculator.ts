import { CalculatedNutritionValues, FoodItemServing } from "@types";
import type { MacroMetricServingAmountValues } from "@utils/useNutritionCalculator";

export const calculateNutritionValues = (
  // Accepts only metric amounts (e.g. grams, oz, ml)
  amount: number | MacroMetricServingAmountValues,

  serving?: FoodItemServing
): CalculatedNutritionValues | null => {
  if (!serving) return null;

  let multiplier: number;
  if (typeof amount === "number") {
    multiplier = amount / serving.metric_serving_amount;
  } else if (amount) {
    const [macro, value] = amount;
    switch (macro) {
      case "protein":
        multiplier = value / serving.protein;
        break;
      case "carbohydrate":
        multiplier = value / serving.carbohydrate;
        break;
      case "fat":
        multiplier = value / serving.fat;
        break;
      default:
        multiplier = 1;
    }
  } else {
    multiplier = 1;
  }

  return {
    calories: serving.calories * multiplier,
    protein: serving.protein * multiplier,
    carbohydrate: serving.carbohydrate * multiplier,
    fat: serving.fat * multiplier,
    sodium: serving.sodium * multiplier,
    sugar: serving.sugar * multiplier,
    fiber: serving.fiber * multiplier,
    number_of_units: serving.number_of_units * multiplier,
  };
};
