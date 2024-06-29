import { View, Text, XStack, YStack, Input, Select, Paragraph } from "tamagui";
import React from "react";
import { Utensils, X } from "@tamagui/lucide-icons";
import { globalStyles } from "globalStyles";

export default function FoodItem() {
  return (
    <XStack
      ai={"center"}
      jc={"flex-start"}
      w={"100%"}
      backgroundColor={"$background"}
      borderRadius={"$4"}
      py={"$1"}
      px={"$2"}
    >
      <View pr={"$2"}>
        <Utensils />
      </View>
      {/* Amount and Unit Input */}
      <YStack ai={"center"} jc={"center"} pr={"$2"}>
        <Input size={"$2"} placeholder="100" minWidth={"$3"} maxWidth={"$3"} />
        <Select size={"$2"}>
          <Select.Item index={0} value="g">
            g
          </Select.Item>
        </Select>
      </YStack>
      {/* Food Details */}
      <YStack flex={1} ai={"flex-start"} jc={"space-between"}>
        {/* Upper */}
        <XStack flex={1} w={"100%"} ai={"center"} jc={"space-between"}>
          {/* Food Name */}
          <Paragraph>Huevo Frito</Paragraph>
          {/* Calories */}
          <XStack gap={"$1"}>
            <Paragraph fontWeight={"bold"} fontSize={"$6"}>
              9999
            </Paragraph>
            <Paragraph color={"$gray10"}>kcal</Paragraph>
          </XStack>
        </XStack>
        {/* Lower */}
        <XStack flex={1} gap={"$2"}>
          {/* Macros */}
          {/* Protein */}
          <XStack ai={"center"} jc={"center"} gap={"$1"}>
            {/* Colored Dot */}
            <View
              style={globalStyles.protein}
              h={"$0.75"}
              w={"$0.75"}
              borderRadius={"$true"}
            />

            {/* Amount */}
            <Paragraph>999</Paragraph>
            {/* Unit */}
            <Paragraph color={"$gray10"}>g</Paragraph>
          </XStack>
          {/* Carbs */}
          <XStack ai={"center"} jc={"center"} gap={"$1"}>
            {/* Colored Dot */}
            <View
              style={globalStyles.carbs}
              h={"$0.75"}
              w={"$0.75"}
              borderRadius={"$true"}
            />

            {/* Amount */}
            <Paragraph>999</Paragraph>
            {/* Unit */}
            <Paragraph color={"$gray10"}>g</Paragraph>
          </XStack>
          {/* Fat */}
          <XStack ai={"center"} jc={"center"} gap={"$1"}>
            {/* Colored Dot */}
            <View
              style={globalStyles.fat}
              h={"$0.75"}
              w={"$0.75"}
              borderRadius={"$true"}
            />

            {/* Amount */}
            <Paragraph>999</Paragraph>
            {/* Unit */}
            <Paragraph color={"$gray10"}>g</Paragraph>
          </XStack>
        </XStack>
      </YStack>
    </XStack>
  );
}
