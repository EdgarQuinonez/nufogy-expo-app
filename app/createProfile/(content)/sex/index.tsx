import {
  View,
  Text,
  YStack,
  Paragraph,
  H4,
  Image,
  Button,
  XStack,
  ScrollView,
} from "tamagui";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import { Bike, Bone, Car, Dot, Heart } from "@tamagui/lucide-icons";
import BicepsFlexed from "@assets/icons/BicepsFlexed";
import { useFormData } from "@providers/FormProfileContext";
import { Controller } from "react-hook-form";
import GenderMale from "@assets/icons/GenderMale";
import GenderFemale from "@assets/icons/GenderFemale";

export interface SexButtonProps {
  sex: string;
  onPress: () => void;
  isSelected?: boolean;
}

export default function SexScreen() {
  const {
    methods: { control },
  } = useFormData();

  const sex = ["male", "female"];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
      }}
    >
      <YStack f={1} ai="center" jc="center" gap="$2">
        <H4 color={colors.text.main}>Sexo de nacimiento</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Elige una opción:
        </Paragraph>
        <ScrollView contentContainerStyle={{ ai: "center", jc: "center" }}>
          <XStack gap="$2" mt="$4" mx={"$4"} ai={"center"} jc={"center"}>
            {sex.map((sex, i) => (
              <Controller
                key={i}
                name="sex"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SexButton
                    sex={sex}
                    onPress={() => onChange(sex)}
                    isSelected={value === sex}
                  />
                )}
              />
            ))}
          </XStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  );
}

function SexButton({ sex, onPress, isSelected }: SexButtonProps) {
  let title;
  let icon;
  let bgColor;

  switch (sex) {
    case "male":
      title = "Masculino";
      icon = (
        <GenderMale
          color={colors.maleGender}
          width={"100%"}
          height={"100%"}
          viewBox="0 0 120 120"
        />
      );
      bgColor = colors.background.accent;
      break;
    case "female":
      title = "Femenino";
      icon = (
        <GenderFemale
          color={colors.femaleGender}
          width={"100%"}
          height={"100%"}
          viewBox="0 0 120 120"
        />
      );
      bgColor = colors.background.accent;
      break;
  }

  return (
    <Button
      onPress={onPress}
      bg={bgColor}
      borderColor={colors.text.main}
      borderWidth={isSelected ? 2 : 0}
      ai={"center"}
      jc={"center"}
      w={"50%"}
      h={"$20"}
    >
      <YStack ai={"center"} jc={"center"}>
        <View w={"100%"} h={"$16"}>
          {icon}
        </View>
        <Paragraph fontWeight={"bold"} color={colors.text.main} fontSize={"$6"}>
          {title}
        </Paragraph>
      </YStack>
    </Button>
  );
}
