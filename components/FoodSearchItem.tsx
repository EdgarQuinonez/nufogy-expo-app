import { ChevronRight, Utensils } from "@tamagui/lucide-icons";
import { colors } from "globalStyles";
import React from "react";
import { Button, Label, Paragraph, View, XStack, YStack } from "tamagui";

export type Props = {
  food_name: string;
  food_description: string;
};

export default function FoodSearchItem({ food_name, food_description }: Props) {
  return (
    <Button width={"100%"} asChild>
      <XStack
        ai={"center"}
        jc={"flex-start"}
        gap={"$2"}
        borderBottomWidth={1}
        borderBottomColor={colors.text.dim}
        px={"$4"}
        py={"$4"}
      >
        <Utensils color={colors.text.main} />
        <YStack flex={1}>
          <Paragraph
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontWeight={"700"}
            color={colors.text.main}
          >
            {food_name}
          </Paragraph>
          <Paragraph
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            color={colors.text.main}
          >
            {food_description}
          </Paragraph>
        </YStack>
        <ChevronRight />
      </XStack>
    </Button>
  );
}
