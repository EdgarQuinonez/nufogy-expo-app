import { Beef, CakeSlice } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import { Button, Paragraph, View, XStack } from "tamagui";
import { FunctionComponent } from "react";
import { colors } from "globalStyles";
import * as Progress from "react-native-progress";

interface MacroDisplayProps {
  macroType: "protein" | "carbohydrate" | "fat";
  value: number;
  target: number;
  unit?: string;
}

const MacroDisplay: FunctionComponent<MacroDisplayProps> = ({
  macroType,
  value,
  target,
  unit = "g",
}) => {
  let icon, label, backgroundColor;
  switch (macroType) {
    case "protein":
      icon = <Beef />;
      label = "Proteína";
      backgroundColor = colors.protein;
      break;
    case "carbohydrate":
      icon = <CakeSlice />;
      label = "Carbohidratos";
      backgroundColor = colors.carbohydrate;
      break;
    case "fat":
      icon = <Avocado width={26} height={26} />;
      label = "Grasas";
      backgroundColor = colors.fat;
      break;
    default:
      icon = null;
      label = "Unknown Macro";
      backgroundColor = "#CCCCCC";
  }

  return (
    <XStack w={"100%"} ai={"center"} jc={"center"}>
      {/* Container for Custom and Fill Overlap */}
      <View flex={1} pos={"relative"}>
        {/* Custom Progress Bar */}
        <XStack
          borderColor={colors.text.main}
          borderWidth={1}
          backgroundColor={"transparent"}
          borderRadius="$4"
          ai="center"
          jc="space-between"
          pl="$2"
          zIndex={3}
          h={48}
        >
          <XStack gap="$2">
            {icon}
            <Paragraph mr="$2" fontWeight="bold">
              {label}
            </Paragraph>
          </XStack>
          {/* { Progress Percentage } */}
          <XStack w={"$6"} ai={"center"} jc={"flex-end"} pr={"$2"}>
            <Paragraph fontWeight={"bold"} fontSize={"$6"}>
              {Math.round((value / target) * 100)}&nbsp;
            </Paragraph>
            <Paragraph color="$gray10" pl={"$1"}>
              %
            </Paragraph>
          </XStack>
        </XStack>
        {/* Progress Bar Fill */}
        <Progress.Bar
          progress={value / target}
          color={backgroundColor}
          unfilledColor="transparent"
          borderWidth={0}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 12,
            zIndex: 2,
          }}
          width={null}
          height={48}
        />
        {/* Custom Bar Background */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: 12,
          }}
          bg={colors.background.main}
          zIndex={1}
        />
      </View>
      {/* Target amount */}
      <XStack gap={"$1"} w={"$7"} ai={"center"} jc={"flex-start"} ml={"$2"}>
        <Paragraph color={colors.text.main}>{Math.round(value)}</Paragraph>
        <Paragraph fontWeight={"bold"} color={colors.text.dim}>
          /
        </Paragraph>
        <Paragraph color={colors.text.main}>{Math.round(target)}</Paragraph>
        <Paragraph fontWeight={"bold"} color={colors.text.dim}>
          {unit}
        </Paragraph>
      </XStack>
    </XStack>
  );
};

export default MacroDisplay;
