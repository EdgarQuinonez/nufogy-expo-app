import { Text } from "tamagui";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@providers/AuthContext";
import { ProfileProvider } from "@providers/ProfileContext";
import { FoodContextProvider } from "@providers/FoodContext";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <ProfileProvider>
      <FoodContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen
        name="(auth)"
        options={{
          headerShown: false,
        }}
      /> */}
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
    </ProfileProvider>
  );
}
