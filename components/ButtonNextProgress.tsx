import { Check, ChevronRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { colors } from "globalStyles";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button, Form, Text, View } from "tamagui";

interface ButtonProgressNextProps {
  step: number;
  nextScreen: string;

  onPress: () => void;
  disabled?: boolean;
  totalSteps: number;
}

const ButtonProgressNext: React.FC<ButtonProgressNextProps> = ({
  step,
  nextScreen,

  onPress = () => {},
  disabled = false,
  totalSteps,
}) => {
  const isLastStep = step === totalSteps;

  const handlePress = () => {
    onPress();
  };

  return (
    <View
      h={128}
      w={"100%"}
      ai={"center"}
      jc={"center"}
      bg={colors.background.main}
    >
      <View pos={"relative"} ai={"center"} jc={"center"}>
        <View pos={"absolute"} h={56} w={56} ai={"center"} jc={"center"}>
          <CircularProgress
            value={(step / totalSteps) * 100}
            radius={28}
            activeStrokeWidth={6}
            inActiveStrokeWidth={6}
            inActiveStrokeColor="transparent"
            activeStrokeColor={colors.secondary}
            strokeLinecap="square"
          />
        </View>

        {!isLastStep ? (
          <Button
            w={48}
            h={48}
            bg={disabled ? colors.text.dim : colors.primary}
            borderRadius={9999}
            disabled={disabled}
            onPress={handlePress}
          >
            <ChevronRight size={24} color={colors.background.main} />
          </Button>
        ) : (
          <Form.Trigger asChild>
            <Button
              w={48}
              h={48}
              bg={disabled ? colors.text.dim : colors.primary}
              borderRadius={9999}
              disabled={disabled}
            >
              <Check size={24} color={colors.background.main} />
            </Button>
          </Form.Trigger>
        )}
      </View>
    </View>
  );
};

export default ButtonProgressNext;
