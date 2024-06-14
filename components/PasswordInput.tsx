import { Eye, EyeOff } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { RefCallBack } from "react-hook-form";
import { Button, Input, SizeTokens, XStack, useTheme } from "tamagui";

export type Props = {
  onChange: (text: string) => void;
  onBlur: () => void;
  value: string;
  inputRef: RefCallBack;
  size: SizeTokens;
};
export default function PasswordInput({
  onChange,
  onBlur,
  value,
  inputRef,
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
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        ref={inputRef}
        size={size}
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
