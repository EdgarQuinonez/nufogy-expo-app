import { CalculatedNutritionValues, FoodItemServing } from "@types";
import { calculateNutritionValues } from "@utils/nutritionValuesCalculator";
import { useEffect, useState } from "react";

export type MacroMetricServingAmountValues =
  | ["protein" | "carbohydrate" | "fat", number]
  | null;

export default function useNutritionCalculator() {
  const [serving, setServing] = useState<FoodItemServing | null>(null);
  const [amount, setAmount] = useState<number | MacroMetricServingAmountValues>(
    null
  );
  const [calculatedNutritionValues, setCalculatedNutritionValues] =
    useState<CalculatedNutritionValues | null>({
      calories: 0,
      protein: 0,
      carbohydrate: 0,
      fat: 0,
      sodium: 0,
      sugar: 0,
      fiber: 0,
      number_of_units: 0,
    });

  // let amount: number;
  // if (serving) {
  //   amount =
  //     (serving?.metric_serving_amount / serving?.number_of_units) *
  //     metricServingAmount;
  // }

  // 1: Initial Load and serving update: Default (Placeholder) Values from Serving (e.g. number_of_units)
  useEffect(() => {
    if (serving) {
      const servingNutritionValues: CalculatedNutritionValues = {
        calories: serving.calories,
        protein: serving.protein,
        carbohydrate: serving.carbohydrate,
        fat: serving.fat,
        sodium: serving.sodium,
        sugar: serving.sugar,
        fiber: serving.fiber,
        number_of_units: serving.number_of_units,
      };

      setCalculatedNutritionValues(servingNutritionValues);
    }
  }, [serving]);

  useEffect(() => {
    // 2: User Input: Update number_of_units. Transform to metric_serving_amount.
    if (!serving) return;
    if (typeof amount === "number") {
      setCalculatedNutritionValues(
        calculateNutritionValues(
          (serving.metric_serving_amount / serving.number_of_units) * amount,
          serving
        )
      );

      // 3: User Input: Update macros.
    } else if (amount) {
      setCalculatedNutritionValues(calculateNutritionValues(amount, serving));
    }
  }, [amount]);

  return {
    serving,
    setServing,
    setAmount,
    calculatedNutritionValues,
  };
}
