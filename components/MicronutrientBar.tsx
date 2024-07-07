import { XStack, Paragraph } from "tamagui";
import React from "react";
import ProjectedProgressBar from "@components/ProjectedProgressBar";

export type Props = {
  name: string;
  currentIntakeAmount: number;
  amount: number;
  unit: "mg" | "g";
  totalAmount: number;
};

export default function MicronutrientBar({
  name,
  currentIntakeAmount,
  amount,
  unit,
  totalAmount,
}: Props) {
  const currentProgress = currentIntakeAmount / totalAmount;
  const projectedProgress = (currentIntakeAmount + amount) / totalAmount;

  return (
    <XStack ai={"center"} jc={"flex-start"} w={"100%"} maxWidth={"100%"}>
      <Paragraph fontWeight={"bold"} w={"$5"} textAlign="right" pr={"$2"}>
        {name}
      </Paragraph>
      <ProjectedProgressBar
        currentProgress={currentProgress}
        projectedProgress={projectedProgress}
      />
      <XStack ai={"center"} jc={"flex-start"} gap={"$1"} w={"$6"}>
        <XStack>
          <Paragraph>+</Paragraph>
          <Paragraph fontWeight={"bold"}>{amount}</Paragraph>
        </XStack>
        <Paragraph w={"$1.5"}>{unit}</Paragraph>
      </XStack>
    </XStack>
  );
}
