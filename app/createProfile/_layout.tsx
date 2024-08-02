import ButtonNextProgress from "@components/ButtonNextProgress";

import CreateProfileTopBar from "@components/CreateProfileTopBar";
import { useSession } from "@providers/AuthContext";
import { useProfile } from "@providers/ProfileContext";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "globalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Form, Text, View } from "tamagui";

export default function CreateProfileLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { session, isLoading } = useSession();
  const { userProfile, isLoading: profileIsLoading } = useProfile();

  if (isLoading || profileIsLoading) {
    return <Text>Loading...</Text>;
  }

  // if (!session) {
  //   return <Redirect href="/sign-in" />;
  // } else if (userProfile) {
  //   return <Redirect href="/" />;
  // }

  let step;
  let nextScreen;
  switch (segments[2]) {
    case "weight":
      step = 1;
      nextScreen = "/createProfile/(content)/height";
      break;
    case "height":
      step = 2;
      nextScreen = "/createProfile/(content)/goal";
      break;
    case "goal":
      step = 3;
      nextScreen = "/createProfile/(content)/activityLevel";
      break;
    case "activityLevel":
      step = 4;
      nextScreen = "/createProfile/(content)/age";
      break;
    case "age":
      step = 5;
      nextScreen = "/createProfile/(content)/thankYou";
      break;
    case "thankYou":
      step = 6;
      nextScreen = "/";
      break;
    default:
      step = 1;
      nextScreen = "/createProfile/(content)/height";
  }

  return (
    <Form f={1}>
      <Slot />
      <ButtonNextProgress step={step} nextScreen={nextScreen} />
    </Form>
  );
}
