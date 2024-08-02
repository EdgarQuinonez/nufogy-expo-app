import CreateProfileTopBar from "@components/CreateProfileTopBar";
import { useSession } from "@providers/AuthContext";
import { useProfile } from "@providers/ProfileContext";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { colors } from "globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "tamagui";

export default function CreateProfileContentLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <CreateProfileTopBar />,
        headerShown: true,
      }}
    >
      <Stack.Screen name="weight/index" />
      <Stack.Screen name="height/index" />
      <Stack.Screen name="goal/index" />
      <Stack.Screen name="activityLevel/index" />
      <Stack.Screen name="age/index" />
      <Stack.Screen name="sex/index" />
      <Stack.Screen name="thankYou/index" />
    </Stack>
  );
}
