import { DaySummary, DiaryFoodLog } from "@types";
import parseFoodItemString from "@utils/parseFoodItemString";

export const calculateNutritionSummary = (
  foodLogs: DiaryFoodLog[]
): DaySummary => {
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
      const multiplier =
        foodLog.metric_serving_amount / serving.metric_serving_amount;

      const calculatedNutritionValues = {
        protein: serving.protein * multiplier,
        carbohydrate: serving.carbohydrate * multiplier,
        fat: serving.fat * multiplier,
        calories: serving.calories * multiplier,
        sodium: serving.sodium * multiplier,
        sugar: serving.sugar * multiplier,
        fiber: serving.fiber * multiplier,
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
