import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  SizeTokens,
  XStack,
  YStack,
  useTheme,
  Text,
  Label,
} from "tamagui";
import zxcvbn from "zxcvbn";

export type Props = {
  size: SizeTokens;
  onPasswordChange: (password: string, confirmed: boolean) => void;
};

export default function PasswordStrengthInputGroup({
  size,
  onPasswordChange,
}: Props): JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = zxcvbn(password);
  const strength: number = result.score;

  const strengthColor =
    strength < 2 ? "red" : strength < 4 ? "orange" : "green";

  const matchBorderColor = confirmPassword === password ? "green" : "red";
  const isPasswordConfirmed = password === confirmPassword && password !== "";

  useEffect(() => {
    onPasswordChange(password, isPasswordConfirmed);
  }, [password, confirmPassword, onPasswordChange]);

  return (
    <YStack gap="$1" marginTop="$2">
      <Label>Contraseña</Label>
      <PasswordInput
        size={size}
        setPassword={setPassword}
        password={password}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {password.length > 0 && (
        <Text fontSize="$2" color={strengthColor}>
          {strength < 2 ? "Débil" : strength < 4 ? "Media" : "Fuerte"}
        </Text>
      )}
      <Label>Confirmar contraseña</Label>
      <PasswordInput
        size={size}
        setPassword={setConfirmPassword}
        password={confirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </YStack>
  );
}

export type PasswordInputProps = {
  size: SizeTokens;
  setPassword: (password: string) => void;
  password: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
};

function PasswordInput({
  size,
  setPassword,
  password,
  showPassword,
  setShowPassword,
}: PasswordInputProps): JSX.Element {
  const { background025 } = useTheme();
  return (
    <XStack
      alignItems="center"
      gap="$2"
      borderWidth={1}
      backgroundColor={background025}
      borderRadius={"$4"}
    >
      <Input
        unstyled={true}
        flex={1}
        size={size}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
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
