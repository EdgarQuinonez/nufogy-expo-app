import ButtonNextProgress from "@components/ButtonNextProgress";

import CreateProfileTopBar from "@components/CreateProfileTopBar";
import { useSession } from "@providers/AuthContext";
import {
  FormDataProvider,
  useFormData,
  FormData,
} from "@providers/FormProfileContext";
import { useProfile } from "@providers/ProfileContext";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { CreateProfileFormValues } from "@types";
import { differenceInYears } from "date-fns";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "globalStyles";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Form, Text, View } from "tamagui";

export default function CreateProfileLayout() {
  const router = useRouter();
  const {
    methods: {
      handleSubmit,
      trigger,
      formState: { errors },
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

  if (!session) {
    return <Redirect href="/sign-in" />;
  } else if (userProfile) {
    return <Redirect href="/" />;
  }
  const handleNext = async () => {
    const isStepValid = await trigger();
    if (isStepValid) router.push(nextScreen);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const { birthDate, thankYou, ...rest } = data as any;
      const age = differenceInYears(new Date(), birthDate);

      const requestData: CreateProfileFormValues = {
        age,
        physical_activity: rest.activityLevel,
        sex: rest.sex,
        weight: parseFloat(rest.weight),
        height: parseFloat(rest.height),
        goal: parseFloat(rest.goal),
      };
      const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/profile/update`;
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} error. ${response.body}`);
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Form f={1} onSubmit={handleSubmit(onSubmit)}>
      <StatusBar style="dark" />
      <Slot />

      <ButtonNextProgress
        step={step}
        nextScreen={nextScreen}
        onPress={handleNext}
        totalSteps={7}
      />
    </Form>
  );
}
