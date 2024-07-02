import { Search } from "@tamagui/lucide-icons";
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
  const { borderColor, background025 } = useTheme();

  useEffect(() => {
    setSearchQuery(text);
  }, [text]);

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
      <Search size="$2" />
      <Input
        unstyled={true}
        flex={1}
        size={size}
        value={text}
        onChangeText={setText}
        placeholder="ej. Atún en agua masa drenada..."
      />
    </XStack>
  );
}
