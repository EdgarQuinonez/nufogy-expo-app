import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React from "react";
import {
  Button,
  Input,
  SizeTokens,
  XStack,
  YStack,
  useTheme,
  Text,
  Variable,
} from "tamagui";
import zxcvbn from "zxcvbn";

export type Props = {
  size: SizeTokens;
  onPasswordChange: (password: string, confirmed: boolean) => void;
};

// New default export component
export default function PasswordStrengthInputGroup({
  size,
  onPasswordChange,
}: Props): JSX.Element {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // Calculate strength based on the first password
  const result = zxcvbn(password);
  const strength: number = result.score;
  const { borderColor, background025, red, yellow, green } = useTheme();
  const strengthColor = strength < 2 ? red : strength < 4 ? yellow : green;
  const borderStrengthColor =
    strength < 2 ? `${red}5` : strength < 4 ? `${yellow}5` : `${green}5`;
  const isPasswordConfirmed = password === confirmPassword && password !== "";

  React.useEffect(() => {
    onPasswordChange(password, isPasswordConfirmed);
  }, [password, confirmPassword, isPasswordConfirmed, onPasswordChange]);

  return (
    <YStack gap="$4">
      <PasswordInput
        value={password}
        onPasswordChange={onPasswordChange}
        handleTextChange={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        strengthColor={strengthColor}
        borderStrengthColor={borderStrengthColor}
        size={size}
      />
      <PasswordInput
        value={confirmPassword}
        onPasswordChange={onPasswordChange}
        handleTextChange={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        strengthColor={strengthColor}
        borderStrengthColor={
          isPasswordConfirmed ? borderStrengthColor : borderColor
        }
        size={size}
        placeholder="Confirm Password"
      />
      <Text color={strengthColor} fontSize="$2">
        {strength < 2 ? "Weak" : strength < 4 ? "Medium" : "Strong"}
      </Text>
    </YStack>
  );
}

// PasswordInput component (modified)
function PasswordInput({
  value,
  handleTextChange,
  showPassword,
  setShowPassword,
  strengthColor,
  borderStrengthColor,
  size,
  placeholder = "Password",
}: Props & {
  value: string;
  handleTextChange: (text: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  strengthColor: any;
  borderStrengthColor: any;
  placeholder?: string;
}): JSX.Element {
  const { background025 } = useTheme();
  return (
    <XStack // This XStack is for the input and eye icon
      alignItems="center"
      gap="$2"
      borderColor={borderStrengthColor} // Updated border color
      borderWidth={1}
      backgroundColor={background025}
      borderRadius={"$4"}
    >
      <Input
        unstyled={true}
        flex={1}
        size={size}
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={!showPassword}
        placeholder={placeholder}
      />
      <Button
        size={size}
        onPress={() => setShowPassword(!showPassword)}
        chromeless
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </Button>
    </XStack>
  );
}
