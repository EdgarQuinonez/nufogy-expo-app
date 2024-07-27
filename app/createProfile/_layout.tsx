import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function CreateProfileLayout() {
  //   StatusBar.setBarStyle("dark-content");
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="weight/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="height/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="goal/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="activityLevel/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="age/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sex/index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
