import CreateProfileTopBar from "@components/CreateProfileTopBar";
import { useSession } from "@providers/AuthContext";
import { useProfile } from "@providers/ProfileContext";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { colors } from "globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, View } from "tamagui";

export default function CreateProfileLayout() {
  const router = useRouter();
  const { session, isLoading } = useSession();
  const { userProfile, isLoading: profileIsLoading } = useProfile();
  const canGoBack = router.canGoBack();

  if (isLoading || profileIsLoading) {
    return <Text>Loading...</Text>;
  }

  // if (!session) {
  //   return <Redirect href="/sign-in" />;
  // } else if (userProfile) {
  //   return <Redirect href="/" />;
  // }

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
    </Stack>
  );
}
