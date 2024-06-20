import { CheckCircle, Eye, EyeOff } from "@tamagui/lucide-icons";
import { UserRegistrationInputs } from "@types";
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
      <Label>Contraseña</Label>
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
      <Label>Confirmar contraseña</Label>
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
          <Label>Las contraseñas coinciden</Label>
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
  const { background025 } = useTheme();

  return (
    <YStack>
      <XStack
        alignItems="center"
        gap="$2"
        borderWidth={1}
        backgroundColor={background025}
        borderRadius={"$4"}
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
          {showPassword ? <Eye /> : <EyeOff />}
        </Button>
      </XStack>
    </YStack>
  );
}
