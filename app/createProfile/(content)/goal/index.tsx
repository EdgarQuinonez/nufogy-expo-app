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

export default function GoalScreen() {
  const [goal, setGoal] = useState(0);

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
        <H4 color={colors.text.main}>¿Cuál es tu peso objetivo?</H4>
        <Paragraph color={colors.text.dim1} textAlign="center">
          Tu peso ideal
        </Paragraph>
        <View
          w={118}
          h={118}
          bg={colors.accent}
          ai={"center"}
          jc={"center"}
          borderRadius={"$4"}
          mt={"$4"}
        >
          <XStack ai={"center"} jc={"center"}>
            <Input
              unstyled
              keyboardType="numeric"
              returnKeyType={"done"}
              color={colors.text.main}
              placeholder={"0"}
              placeholderTextColor={colors.text.main}
              onChangeText={(text) => setGoal(parseFloat(text))}
              fontSize={48}
              maxWidth={82}
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
