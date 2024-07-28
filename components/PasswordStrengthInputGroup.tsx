import { CheckCircle, Eye, EyeOff } from "@tamagui/lucide-icons";
import { UserRegistrationInputs } from "@types";
import { colors } from "globalStyles";
import React, { useState, useEffect, useRef } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";
import {
  Button,
  Input,
  SizeTokens,
  XStack,
  YStack,
  useTheme,
  Label,
  Paragraph,
} from "tamagui";
import zxcvbn from "zxcvbn";

export type Props = {
  size: SizeTokens;
  onPasswordChange: (password: string, confirmed: boolean) => void;
  control: Control<UserRegistrationInputs>;
  errors: FieldErrors<FieldValues>;
};

export default function PasswordStrengthInputGroup({
  size,
  onPasswordChange,
  control,
  errors,
}: Props): JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = zxcvbn(password);
  const strength: number = result.score;

  const strengthColor =
    strength < 2 ? "red" : strength < 4 ? "orange" : "green";

  const isPasswordConfirmed = password === confirmPassword && password !== "";

  useEffect(() => {
    onPasswordChange(password, isPasswordConfirmed);
  }, [password, confirmPassword, onPasswordChange]);

  return (
    <YStack gap="$1" marginTop="$2">
      <Label color={colors.text.main}>Contraseña</Label>
      <PasswordInput
        control={control}
        size={size}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        name="password"
      />
      {password.length > 0 && (
        <Paragraph fontSize="$2" color={strengthColor}>
          {strength < 2 ? "Débil" : strength < 4 ? "Media" : "Fuerte"}
        </Paragraph>
      )}
      {errors.password && (
        <Paragraph color="red">{errors.password.message}</Paragraph>
      )}
      <Label color={colors.text.main}>Confirmar contraseña</Label>
      <PasswordInput
        control={control}
        size={size}
        setPassword={setConfirmPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        name="confirmPassword"
      />
      {errors.confirmPassword && (
        <Paragraph color="red">{errors.confirmPassword.message}</Paragraph>
      )}
      {isPasswordConfirmed ? (
        <XStack jc={"center"} ai={"center"} width={"100%"} gap={"$2"}>
          <CheckCircle color="green" />
          <Label color={colors.text.main}>Las contraseñas coinciden</Label>
        </XStack>
      ) : null}
    </YStack>
  );
}

export type PasswordInputProps = {
  control: Control<UserRegistrationInputs>;
  size: SizeTokens;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  name: "password" | "confirmPassword" | "username" | "email";
};

function PasswordInput({
  control,
  size,
  setPassword,
  showPassword,
  setShowPassword,
  name,
}: PasswordInputProps): JSX.Element {
  return (
    <YStack>
      <XStack
        alignItems="center"
        gap="$2"
        // borderColor={colors.text.dim}
        borderWidth={1}
        bg={colors.background.accent}
        borderRadius={"$4"}
        focusStyle={{ borderColor: colors.text.dim }}
      >
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              onChangeText={(text) => {
                onChange(text);
                setPassword(text);
              }}
              onBlur={onBlur}
              autoCapitalize="none"
              returnKeyType={name === "password" ? "next" : "done"}
              autoCorrect={false}
              autoComplete="off"
              value={value}
              ref={ref}
              unstyled={true}
              flex={1}
              size={size}
              secureTextEntry={!showPassword}
            />
          )}
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
    </YStack>
  );
}
