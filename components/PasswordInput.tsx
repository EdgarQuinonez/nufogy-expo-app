import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { UserLoginInputs } from "@types";
import { colors } from "globalStyles";
import React, { useState } from "react";
import {
  RefCallBack,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { Button, Input, SizeTokens, XStack, useTheme } from "tamagui";

export type Props = {
  onChange: (text: string) => void;
  onBlur: () => void;
  value: string;
  inputRef: RefCallBack;
  size: SizeTokens;
  handleSubmit: (
    onValid: SubmitHandler<UserLoginInputs>,
    onInvalid?: SubmitErrorHandler<UserLoginInputs> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
};
export default function PasswordInput({
  onChange,
  onBlur,
  value,
  inputRef,
  size,
  handleSubmit,
}: Props): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <XStack
      alignItems="center"
      gap="$2"
      // borderColor={colors.text.dim}
      borderWidth={1}
      bg={colors.background.accent}
      borderRadius={"$4"}
      focusStyle={{ borderColor: colors.text.dim }}
    >
      <Input
        unstyled={true}
        returnKeyType="send"
        autoCapitalize="none"
        autoCorrect={false}
        flex={1}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        ref={inputRef}
        size={size}
        secureTextEntry={!showPassword}
        onSubmitEditing={() => handleSubmit}
      />
      <Button
        size={size}
        onPress={() => setShowPassword(!showPassword)}
        chromeless
      >
        {showPassword ? (
          <Eye color={colors.text.dim} />
        ) : (
          <EyeOff color={colors.text.dim} />
        )}
      </Button>
    </XStack>
  );
}
