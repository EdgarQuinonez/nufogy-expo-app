import { ChevronRight, Utensils } from "@tamagui/lucide-icons";
import React from "react";
import { Button, Label, Paragraph, View, XStack, YStack } from "tamagui";

export type Props = {
  food_name: string;
  food_description: string;
};

export default function FoodSearchItem({ food_name, food_description }: Props) {
  return (
    <Button unstyled={true} asChild>
      <XStack
        ai={"center"}
        jc={"flex-start"}
        width={"100%"}
        borderBottomWidth={1}
        borderBottomColor={"$borderColor"}
        px={"$4"}
        py={"$2"}
        gap={"$2"}
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
