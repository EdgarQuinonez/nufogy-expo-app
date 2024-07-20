import { Beef, CakeSlice } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import { Button, Paragraph, View, XStack } from "tamagui";
import { FunctionComponent } from "react";

interface MacroDisplayProps {
  macroType: "protein" | "carbohydrate" | "fat";
  value: number;
  unit?: string;
}

const MacroDisplay: FunctionComponent<MacroDisplayProps> = ({
  macroType,
  value,
  unit = "g",
}) => {
  // Determine icon, label, and color based on macroType
  let icon, label, backgroundColor;
  switch (macroType) {
    case "protein":
      icon = <Beef />;
      label = "Proteína";
      backgroundColor = "#EF7D7D";
      break;
    case "carbohydrate":
      icon = <CakeSlice />;
      label = "Carbohidratos";
      backgroundColor = "#41BF84";
      break;
    case "fat":
      icon = <Avocado width={26} height={26} />;
      label = "Grasas";
      backgroundColor = "#77ABD9";
      break;
    default:
      // Handle invalid macroType gracefully, you can throw an error or set default values here
      icon = null;
      label = "Unknown Macro";
      backgroundColor = "#CCCCCC"; // A default color
  }

  // The rest of the component is the same as before, using the values from the switch case
  return (
    <Button
      unstyled={true}
      backgroundColor={backgroundColor}
      borderRadius="$4"
      ai="center"
      jc="center"
      pl="$2"
    >
      <XStack gap="$2" ai="center" w="100%" justifyContent="space-between">
        <XStack gap="$2">
          {icon}
          <Paragraph mr="$2" fontWeight="bold">
            {label}
          </Paragraph>
        </XStack>
        <XStack gap="$1" ai="center" justifyContent="center">
          <View
            pl="$3"
            pr="$2"
            py="$2"
            w={"$6"}
            ai={"center"}
            jc={"flex-end"}
            backgroundColor="$background"
            borderTopLeftRadius="$7"
            borderBottomLeftRadius="$7"
            borderTopRightRadius="$4"
            borderBottomRightRadius="$4"
          >
            <Paragraph>
              {Math.round(value)}&nbsp;
              <Paragraph color="$gray10">{unit}</Paragraph>
            </Paragraph>
          </View>
        </XStack>
      </XStack>
    </Button>
  );
};

export default MacroDisplay;
