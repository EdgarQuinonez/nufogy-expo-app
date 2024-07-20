import { useMemo } from "react";
import {
  FoodItem,
  FoodItemString,
  FoodItemServing,
  FoodItemServingString,
} from "@types"; // Import your types

function useParseFoodItem(
  foodItemString?: FoodItemString
): FoodItem | undefined {
  return useMemo(() => {
    if (!foodItemString) return undefined;

    const parseServing = (serving: FoodItemServingString): FoodItemServing => ({
      calcium: parseInt(serving.calcium, 10),
      calories: parseInt(serving.calories, 10),
      carbohydrate: parseFloat(serving.carbohydrate),
      cholesterol: parseInt(serving.cholesterol, 10),
      fat: parseFloat(serving.fat),
      fiber: parseFloat(serving.fiber),
      iron: parseFloat(serving.iron),
      measurement_description: serving.measurement_description,
      metric_serving_amount: parseFloat(serving.metric_serving_amount),
      metric_serving_unit: serving.metric_serving_unit,
      monounsaturated_fat: parseInt(serving.monounsaturated_fat, 10),
      number_of_units: parseFloat(serving.number_of_units),
      polyunsaturated_fat: parseFloat(serving.polyunsaturated_fat),
      potassium: parseInt(serving.potassium, 10),
      protein: parseFloat(serving.protein),
      saturated_fat: parseFloat(serving.saturated_fat),
      serving_description: serving.serving_description,
      serving_id: parseInt(serving.serving_id, 10),
      serving_url: serving.serving_url,
      sodium: parseInt(serving.sodium, 10),
      sugar: parseFloat(serving.sugar),
      vitamin_a: parseInt(serving.vitamin_a, 10),
      vitamin_c: parseFloat(serving.vitamin_c),
      vitamin_d: parseInt(serving.vitamin_d, 10),
    });

    return {
      food_id: parseInt(foodItemString.food_id, 10),
      food_name: foodItemString.food_name,
      food_type: foodItemString.food_type,
      food_url: foodItemString.food_url,
      servings: {
        serving: Array.isArray(foodItemString.servings.serving)
          ? foodItemString.servings.serving.map(parseServing)
          : parseServing(foodItemString.servings.serving),
      },
    };
  }, [foodItemString]);
}

export default useParseFoodItem;
