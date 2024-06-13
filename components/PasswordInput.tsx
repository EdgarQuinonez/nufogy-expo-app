import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { RegisterOptions } from "react-hook-form";
import { Button, Input, SizeTokens, XStack, useTheme } from "tamagui";

export type Props = {
  value: string;
  handleTextChange: (text: string) => void;
  size: SizeTokens;
};

export default function PasswordInput({
  value,
  handleTextChange,
  size,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const { borderColor, background025 } = useTheme();

  return (
    <XStack
      alignItems="center"
      gap="$2"
      borderColor={borderColor}
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
