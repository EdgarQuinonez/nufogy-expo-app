import ButtonNextProgress from "@components/ButtonNextProgress";

import CreateProfileTopBar from "@components/CreateProfileTopBar";
import { useSession } from "@providers/AuthContext";
import { FormDataProvider, useFormData } from "@providers/FormProfileContext";
import { useProfile } from "@providers/ProfileContext";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "globalStyles";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Form, Text, View } from "tamagui";

export default function CreateProfileLayout() {
  const router = useRouter();
  const {
    methods: {
      handleSubmit,
      formState: { errors, isValid },
    },
    step,
    nextScreen,
  } = useFormData();
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

  const onSubmit = () => {
    if (step === 7) {
      console.log("submitting form");
    } else {
      throw new Error("Form is not complete.");
    }
  };

  return (
    <Form f={1}>
      <Slot />
      <ButtonNextProgress
        step={step}
        nextScreen={nextScreen}
        disabled={!isValid}
        onPress={
          step === 7 ? handleSubmit(onSubmit) : () => router.push(nextScreen)
        }
      />
    </Form>
  );
}
