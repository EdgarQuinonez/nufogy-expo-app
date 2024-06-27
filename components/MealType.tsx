import { View, Text, YStack, XStack, H3, Button, Paragraph, H5 } from "tamagui";
import { EggFried } from "@tamagui/lucide-icons";
import React from "react";
import { globalStyles } from "globalStyles";

export default function MealType() {
  return (
    <YStack
      flex={1}
      ai={"flex-start"}
      jc={"center"}
      w={"100%"}
      backgroundColor={"$yellow5"}
      px={"$2"}
      borderRadius={"$4"}
    >
      {/* Header */}
      <XStack w={"100%"} ai={"center"} jc={"space-between"} py={"$2"}>
        {/* Icon */}
        <XStack ai={"center"} jc={"center"} gap={"$2"}>
          <EggFried />
          {/* Title */}
          <H5>Desayuno</H5>
        </XStack>

        {/* Meal Summary Buttons */}
        <XStack>
          {/* Protein Btn */}
          <Button
            unstyled={true}
            disabled={true}
            h={"$6"}
            w={"$6"}
            borderRadius={"$4"}
            style={globalStyles.protein}
          >
            <YStack
              w={"100%"}
              h={"fit"}
              backgroundColor={"$background"}
              ai={"center"}
              jc={"center"}
              borderBottomEndRadius={"$6"}
              borderBottomStartRadius={"$6"}
            >
              {/* Amount */}
              <Paragraph fontWeight={"bold"} fontSize={"$4"}>
                9999
                {/* Unit */}
              </Paragraph>
              <Paragraph
                opacity={0.75}
                fontSize={"$2"}
                color={"$gray10"}
                mt={"$-2"}
              >
                g
              </Paragraph>
            </YStack>
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
}
