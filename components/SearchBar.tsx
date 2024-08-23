import { Search } from "@tamagui/lucide-icons";
import { colors } from "globalStyles";
import React, { useEffect, useState } from "react";
import { Input, SizeTokens, XStack, useTheme } from "tamagui";

export type Props = {
  setSearchQuery: (text: string) => void;
  size: SizeTokens;
};

export default function SearchBar({
  setSearchQuery,
  size,
}: Props): JSX.Element {
  const [text, setText] = useState("");

  useEffect(() => {
    setSearchQuery(text);
  }, [text]);

  return (
    <XStack
      alignItems="center"
      gap="$2"
      borderColor={colors.text.dim}
      borderWidth={1}
      backgroundColor={colors.background.main}
      borderRadius="$4"
      px="$2"
    >
      <Search size="$2" color={colors.text.main} />
      <Input
        unstyled={true}
        flex={1}
        size={size}
        value={text}
        autoComplete="off"
        onChangeText={setText}
        color={colors.text.main}
        placeholderTextColor={colors.text.dim1}
        placeholder="ej. Atún en agua masa drenada..."
      />
    </XStack>
  );
}
