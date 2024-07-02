import { ChevronRight, Utensils } from "@tamagui/lucide-icons";
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
        borderBottomColor={"$borderColor"}
        px={"$4"}
        py={"$4"}
      >
        <Utensils />
        <YStack flex={1}>
          <Paragraph
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontWeight={"700"}
          >
            {food_name}
          </Paragraph>
          <Paragraph
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {food_description}
          </Paragraph>
        </YStack>
        <ChevronRight />
      </XStack>
    </Button>
  );
}
