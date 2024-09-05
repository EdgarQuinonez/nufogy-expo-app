import { Form, Spinner, Text } from "tamagui";
import { Redirect, Stack } from "expo-router";

import { useSession } from "@providers/AuthContext";
import {
  hasEmptyFields,
  ProfileProvider,
  useProfile,
} from "@providers/ProfileContext";
import { FoodContextProvider } from "@providers/FoodContext";
import { UserProfile } from "@types";
import { FormDataProvider } from "@providers/FormProfileContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "globalStyles";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ ...globalStyles.container, justifyContent: "center" }}
      >
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <ProfileProvider>
      <FoodContextProvider>
        <FormDataProvider>
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
            <Stack.Screen
              name="talkJack"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="createProfile"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </FormDataProvider>
      </FoodContextProvider>
    </ProfileProvider>
  );
}
