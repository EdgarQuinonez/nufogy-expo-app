export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginInputs {
  username: string;
  password: string;
}

export interface UserRegistrationInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FoodSearchItem {
  food_id: number;
  food_name: string;
  brand_name: string;
  food_type: string;
  food_url: string;
  food_description: string;
}

export interface FoodSearchResponseData {
  data: FoodSearchItem[];
  message: string;
}

export interface FoodItem {
  food_id: number;
  food_name: string;
  food_type: string;
  food_url: string;
  servings: {
    serving: FoodItemServing | FoodItemServing[];
  };
}

export interface FoodItemServing {
  calcium: number;
  calories: number;
  carbohydrate: number;
  cholesterol: number;
  fat: number;
  fiber: number;
  iron: number;
  measurement_description: string;
  metric_serving_amount: number;
  metric_serving_unit: string;
  monounsaturated_fat: number;
  number_of_units: number;
  polyunsaturated_fat: number;
  potassium: number;
  protein: number;
  saturated_fat: number;
  serving_description: string;
  serving_id: number;
  serving_url: string;
  sodium: number;
  sugar: number;
  vitamin_a: number;
  vitamin_c: number;
  vitamin_d: number;
}
export interface FoodItemString {
  food_id: string;
  food_name: string;
  food_type: string;
  food_url: string;
  servings: {
    serving: FoodItemServingString | FoodItemServingString[];
  };
}

export interface FoodItemServingString {
  calcium: string;
  calories: string;
  carbohydrate: string;
  cholesterol: string;
  fat: string;
  fiber: string;
  iron: string;
  measurement_description: string;
  metric_serving_amount: string;
  metric_serving_unit: string;
  monounsaturated_fat: string;
  number_of_units: string;
  string_of_units: string;
  polyunsaturated_fat: string;
  potassium: string;
  protein: string;
  saturated_fat: string;
  serving_description: string;
  serving_id: string;
  serving_url: string;
  sodium: string;
  sugar: string;
  vitamin_a: string;
  vitamin_c: string;
  vitamin_d: string;
}

export interface CalculatedNutritionValues {
  protein: number;
  carbohydrate: number;
  fat: number;
  calories: number;
  sodium: number;
  sugar: number;
  fiber: number;
  number_of_units: number;
}

export interface GetFoodItemResponseData {
  message: string;
  data: FoodItemString;
}

export interface MealType {
  id: number;
  name: string;
  active: boolean;
  user: number;
}

export interface FoodLogRequestBody {
  fs_id: number;
  metric_serving_amount: number;
  metric_serving_unit: string;
  meal_type: number;
  fs_serving: number;
  dateTime: string;
}

export interface DiaryFoodLog {
  id: number;
  dateTime: string;
  fs_id: number;
  fs_object: FoodItemString;
  fs_serving: number;
  meal_type: number;
  metric_serving_amount: number;
  metric_serving_unit: string;
  user_id: number;
}

export interface DaySummary {
  protein: number;
  carbohydrate: number;
  fat: number;
  calories: number;
  sodium: number;
  sugar: number;
  fiber: number;
}

export type physical_activity =
  | "sedentary"
  | "lightly"
  | "moderate"
  | "very"
  | "extra";

export interface UserProfile {
  id: number;
  weight: number;
  height: number;
  medical_conditions: UserProfileMedicalConditions;
  goal: number;
  physical_activity: physical_activity;
  age: number;
  sex: "male" | "female";
  user_model: number;
}

export interface CreateProfileFormValues {
  weight: number;
  height: number;
  goal: number;
  physical_activity: physical_activity;
  age: number;
  sex: "male" | "female";
}

export interface UserProfileMedicalConditions {
  diabetes: boolean;
  allergies: ("peanuts" | "dust")[];
  hypertension: boolean;
}
export type StoredValue = string | number | boolean | object | null;
