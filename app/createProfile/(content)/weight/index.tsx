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
import { useFormData } from "@providers/FormProfileContext";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfile } from "@types";

export default function WeightScreen() {
  const {
    methods: {
      control,
      register,
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
        <H4 color={colors.text.main}>¿Cuánto pesas?</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Tu peso en la mañana después de ir al baño y antes de comer o beber
          algo, usando ropa ligera.
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
              name="weight"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  unstyled
                  keyboardType="numeric"
                  returnKeyType={"done"}
                  color={colors.text.main}
                  autoComplete="off"
                  placeholder={"0"}
                  placeholderTextColor={colors.text.main}
                  fontSize={48}
                  maxWidth={82}
                  onChangeText={(text) => onChange(text)}
                  value={value?.toString() || ""}
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
              kg
            </Paragraph>
          </XStack>
        </View>
      </YStack>
    </>
  );
}
