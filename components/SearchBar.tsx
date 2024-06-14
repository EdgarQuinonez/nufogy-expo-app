import { Search } from "@tamagui/lucide-icons";
import React, { useState } from "react";
import { Input, SizeTokens, XStack, useTheme } from "tamagui";

export type Props = {
  value: string;
  setSearchQuery: (text: string) => void;
  size: SizeTokens;
};

export default function SearchBar({
  value,
  setSearchQuery,
  size,
}: Props): JSX.Element {
  const { borderColor, background025 } = useTheme();

  return (
    <XStack
      alignItems="center"
      gap="$2"
      borderColor={borderColor}
      borderWidth={1}
      backgroundColor={background025}
      borderRadius="$4"
      px="$2"
    >
      <Search size="$4" color={borderColor} />
      <Input
        unstyled={true}
        flex={1}
        size={size}
        value={value}
        onChangeText={setSearchQuery}
        placeholder="ej. Atún en agua masa drenada..."
      />
    </XStack>
  );
}
