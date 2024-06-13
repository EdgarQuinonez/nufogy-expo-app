import React from "react";
import { Button, Label, YStack } from "tamagui";
import Google from "@assets/icons/Google";

export default function SignUpWithGoogleButton() {
  return (
    <YStack alignItems="center" justifyContent="center">
      <Label>Iniciar con</Label>
      <Button icon={Google} width={"100%"}>
        Google
      </Button>
    </YStack>
  );
}
