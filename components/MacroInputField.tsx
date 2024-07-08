import { View, Text, XStack, Paragraph, Input } from "tamagui";
import type { IconProps } from "@tamagui/helpers-icon";
import React from "react";
import { globalStyles } from "globalStyles";

export type Props = {
  icon: React.NamedExoticComponent<IconProps> | React.JSX.Element;
  name: "Proteína" | "Carbohidratos" | "Grasas";
  amount: number;
  macrosSum: number;
};

export default function MacroInputField({
  icon,
  name,
  amount,
  macrosSum,
}: Props) {
  return (
    <View
      style={
        name === "Proteína"
          ? globalStyles.protein
          : name === "Carbohidratos"
          ? globalStyles.carbs
          : name === "Grasas"
          ? globalStyles.fat
          : {}
      }
      flex={1}
      borderRadius={"$2"}
      ai={"center"}
      jc={"center"}
      px={"$2"}
      py={"$4"}
      w={228}
      h={40}
    >
      <XStack
        gap="$2"
        ai={"center"}
        w={"100%"}
        justifyContent={"space-between"}
      >
        {/* Label */}
        <Paragraph textAlign={"left"} fontWeight={"bold"}>
          {name}
        </Paragraph>

        {/* Percentage and input field */}
        <XStack flex={1} gap={"$1"} ai={"center"} justifyContent={"flex-end"}>
          {/* Macros ratio */}

          <Paragraph textAlign={"center"} fontWeight={"bold"}>
            {Math.round((amount / macrosSum) * 100)}%
          </Paragraph>
          {/* Input with Icon */}
          <XStack
            borderRadius={"$2"}
            py={4}
            px={2}
            w={80}
            bg={"$background"}
            ai={"center"}
            jc={"center"}
          >
            {icon}
            <Input
              unstyled={true}
              keyboardType="numeric"
              placeholder={amount.toFixed(1)}
              flex={1}
              px={"$2"}
              textAlign="right"
            />
            <Text color={"$gray10"}>g</Text>
          </XStack>
        </XStack>
      </XStack>
    </View>
  );
}
