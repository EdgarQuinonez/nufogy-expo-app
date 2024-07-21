import { DiaryFoodLog } from "@types";
import parseFoodItemString from "@utils/parseFoodItemString";

export const calculateNutritionSummary = (foodLogs: DiaryFoodLog[]) => {
  const summary = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    calories: 0,
    sodium: 0,
    sugar: 0,
    fiber: 0,
  };

  foodLogs.forEach((foodLog) => {
    const foodItem = parseFoodItemString(foodLog.fs_object);

    const serving = Array.isArray(foodItem?.servings.serving)
      ? foodItem?.servings.serving[0]
      : foodItem?.servings.serving;
    if (serving) {
      const calculatedNutritionValues = {
        protein: serving.protein,
        carbohydrate: serving.carbohydrate,
        fat: serving.fat,
        calories: serving.calories,
        sodium: serving.sodium,
        sugar: serving.sugar,
        fiber: serving.fiber,
      };

      summary.protein += calculatedNutritionValues?.protein || 0;
      summary.carbohydrate += calculatedNutritionValues?.carbohydrate || 0;
      summary.fat += calculatedNutritionValues?.fat || 0;
      summary.calories += calculatedNutritionValues?.calories || 0;
      summary.sodium += calculatedNutritionValues?.sodium || 0;
      summary.sugar += calculatedNutritionValues?.sugar || 0;
      summary.fiber += calculatedNutritionValues?.fiber || 0;
    }
  });
  return summary;
};

export default calculateNutritionSummary;
