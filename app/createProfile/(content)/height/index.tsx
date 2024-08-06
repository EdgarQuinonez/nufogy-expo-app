import {
  View,
  Text,
  YStack,
  Paragraph,
  H4,
  Input,
  Label,
  XStack,
} from "tamagui";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import ButtonProgressNext from "@components/ButtonNextProgress";
import { Controller } from "react-hook-form";
import { useFormData } from "@providers/FormProfileContext";

export default function HeightScreen() {
  const {
    methods: {
      control,

      formState: { errors },
    },
  } = useFormData();

  return (
    <>
      <YStack
        bg={colors.background.main}
        f={1}
        ai={"center"}
        jc={"center"}
        gap={"$2"}
        px={"$4"}
      >
        <H4 color={colors.text.main}>¿Cuánto mides?</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Tu altura descalzo y derecho en la mañana.
        </Paragraph>
        <View
          w={118}
          h={118}
          bg={colors.secondary}
          ai={"center"}
          jc={"center"}
          borderRadius={"$4"}
          mt={"$4"}
        >
          <XStack ai={"center"} jc={"center"}>
            <Controller
              name="height"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  unstyled
                  keyboardType="numeric"
                  returnKeyType={"done"}
                  color={colors.text.main}
                  placeholder={"0"}
                  placeholderTextColor={colors.text.main}
                  onChangeText={(text) => onChange(text)}
                  value={value?.toString() || ""}
                  fontSize={48}
                  maxWidth={82}
                />
              )}
            />

            <Paragraph
              alignSelf="flex-end"
              ml={"$2"}
              pb={"$2"}
              color={colors.text.main}
              fontSize={18}
            >
              cm
            </Paragraph>
          </XStack>
        </View>
      </YStack>
    </>
  );
}
