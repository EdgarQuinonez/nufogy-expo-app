import { Stack } from "expo-router";

export default function AddIngredientFormLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, presentation: "modal" }}>
      <Stack.Screen name="mealType/[mealTypeId]/index" />
      <Stack.Screen name="mealType/[mealTypeId]/foodItemDetails/[foodItemId]" />
    </Stack>
  );
}
