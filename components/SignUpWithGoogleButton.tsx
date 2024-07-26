import React from "react";
import { Button, Label, YStack } from "tamagui";
import Google from "@assets/icons/Google";
import { colors } from "globalStyles";

export default function SignUpWithGoogleButton() {
  return (
    <YStack alignItems="center" justifyContent="center">
      <Label color={colors.text.main}>Iniciar con</Label>
      <Button icon={Google} width={"100%"} bg={colors.background.accent}>
        Google
      </Button>
    </YStack>
  );
}
