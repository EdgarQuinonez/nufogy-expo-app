import { Text } from "tamagui";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@providers/AuthContext";
import { ProfileProvider, useProfile } from "@providers/ProfileContext";
import { FoodContextProvider } from "@providers/FoodContext";
import { UserProfile } from "@types";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const { userProfile, isLoading: profileIsLoading } = useProfile();

  if (isLoading || profileIsLoading) {
    return <Text>Loading...</Text>;
  }

  // if (!session) {
  //   return <Redirect href="/sign-in" />;
  // } else if (!userProfile || hasEmptyFields(userProfile)) {
  //   return <Redirect href="/createProfile" />;
  // }

  if (session) {
    return <Redirect href="/createProfile" />;
  }

  return (
    <FoodContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(settings)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(addIngredientFormModal)"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </FoodContextProvider>
  );
}

function hasEmptyFields(userProfile: UserProfile): boolean {
  const fieldsToCheck: (keyof UserProfile)[] = [
    "weight",
    "height",
    "goal",
    "physical_activity",
    "age",
    "sex",
  ];

  for (const field of fieldsToCheck) {
    if (userProfile[field] === undefined || userProfile[field] === null) {
      return true;
    }
  }

  return false;
}
