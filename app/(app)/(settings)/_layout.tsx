import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function SettingsLayout() {
  StatusBar.setBarStyle("dark-content");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="profile/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
