import {
  View,
  Text,
  YStack,
  Paragraph,
  H4,
  Button,
  XStack,
  ScrollView,
} from "tamagui";
import { Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import { Bike, Bone, Car, Dot, Heart } from "@tamagui/lucide-icons";
import BicepsFlexed from "@assets/icons/BicepsFlexed";
import { useFormData } from "@providers/FormProfileContext";
import { Controller } from "react-hook-form";
import GenderMale from "@assets/icons/GenderMale";
import GenderFemale from "@assets/icons/GenderFemale";
import nufogyLogo from "@assets/images/nufogy_logo.png";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

export default function ThankYouScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background.main,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{ uri: nufogyLogoUri }}
        style={{ width: 172, height: 172 }}
      />
      <YStack f={1} ai="center" jc="center" gap="$2">
        <H4 color={colors.text.main}>Bienvenido a Nufogy</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Disfruta de una experiencia única
        </Paragraph>
      </YStack>
    </SafeAreaView>
  );
}
