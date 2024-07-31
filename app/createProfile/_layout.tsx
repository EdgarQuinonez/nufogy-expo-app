import { useSession } from "@providers/AuthContext";
import { useProfile } from "@providers/ProfileContext";
import { Redirect, Stack } from "expo-router";
import { Text } from "tamagui";

export default function CreateProfileLayout() {
  const { session, isLoading } = useSession();
  const { userProfile, isLoading: profileIsLoading } = useProfile();

  if (isLoading || profileIsLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  } else if (userProfile) {
    return <Redirect href="/" />;
  }

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
