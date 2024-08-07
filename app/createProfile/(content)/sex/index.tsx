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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.main }}>
      <YStack f={1} ai="center" jc="center" gap="$2" px="$4">
        <H4 color={colors.text.main}>Sexo de nacimiento</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Elige una opción:
        </Paragraph>
        <ScrollView contentContainerStyle={{ ai: "center", jc: "center" }}>
          <XStack gap="$2" mt="$4">
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
      icon = <Car color={colors.text.main} />;
      bgColor = colors.sedentary;
      break;
    case "female":
      title = "Femenino";
      icon = <Bone color={colors.text.main} />;
      bgColor = colors.lightly;
      break;
  }
  // TODO: Adjust colors and icons (use svgr sandbox to convert icons)
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
        {icon}
        <Paragraph fontWeight={"bold"} color={colors.text.main} fontSize={"$6"}>
          {title}
        </Paragraph>
      </YStack>
    </Button>
  );
}
