import React from "react";
import { Goal } from "@tamagui/lucide-icons";
import { colors } from "globalStyles";
import CircularProgress from "react-native-circular-progress-indicator";
import { XStack, Paragraph, View } from "tamagui";

export type Props = {
  consumedCalories: number;
  rdi: number;
};

export default function TargetSlide({ consumedCalories, rdi }: Props) {
  return (
    <XStack w={"100%"} px={"$4"}>
      <View>
        <CircularProgress
          radius={72}
          value={consumedCalories}
          maxValue={consumedCalories <= rdi ? rdi : consumedCalories}
          activeStrokeWidth={18}
          inActiveStrokeWidth={18}
          progressValueColor={colors.text.main}
          activeStrokeColor={colors.primary}
          circleBackgroundColor={colors.background.main}
          inActiveStrokeColor="#E0E0E0"
          title="KCAL"
          titleColor={colors.text.main}
          titleStyle={{ fontSize: 12, fontWeight: "bold" }}
        />
      </View>
      <View f={1} ai={"flex-end"} jc={"flex-start"} px={"$6"}>
        <XStack
          ai={"center"}
          jc={"center"}
          px={"$2"}
          py={"$3"}
          gap={"$4"}
          borderRadius={"$2"}
          //   bg={colors.background.main}
          w={"100%"}
        >
          <Goal color={colors.primary} size={32} />
          <View>
            <Paragraph color={colors.text.main} fontWeight={300}>
              Objetivo:{" "}
            </Paragraph>
            <Paragraph
              fontSize={"$8"}
              fontWeight={"bold"}
              color={colors.text.main}
            >
              {Math.round(rdi)}
            </Paragraph>
          </View>
        </XStack>
      </View>
    </XStack>
  );
}
