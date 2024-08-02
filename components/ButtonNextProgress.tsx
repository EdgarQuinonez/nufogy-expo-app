import { Check, ChevronRight } from "@tamagui/lucide-icons";
import { useRouter } from "expo-router";
import { colors } from "globalStyles";
import CircularProgress from "react-native-circular-progress-indicator";
import { Button, Text, View } from "tamagui";

interface ButtonProgressNextProps {
  step: number;
  nextScreen: string;
  disabled?: boolean;
}
const ButtonProgressNext: React.FC<ButtonProgressNextProps> = ({
  step,
  nextScreen,
  disabled = false,
}) => {
  const router = useRouter();

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
            value={(step / 6) * 100}
            radius={28}
            activeStrokeWidth={6}
            inActiveStrokeWidth={6}
            inActiveStrokeColor="transparent"
            activeStrokeColor={colors.secondary}
            strokeLinecap="square"
          />
        </View>
        <Button
          w={48}
          h={48}
          bg={colors.primary}
          borderRadius={9999}
          onPress={() => router.push(nextScreen)}
          disabled={disabled}
        >
          {step === 6 ? (
            <Check size={24} color={colors.background.main} />
          ) : (
            <ChevronRight size={24} color={colors.background.main} />
          )}
        </Button>
      </View>
    </View>
  );
};

export default ButtonProgressNext;
