import { XCircle } from "@tamagui/lucide-icons";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Button, H1, Paragraph, View } from "tamagui";
import SearchBar from "@components/SearchBar";

export type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export default function AddIngredientFormModal({
  visible,
  onRequestClose,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (visible) {
      StatusBar.setBarStyle("dark-content");
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor="$background"
        zIndex={100}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          position="absolute"
          top="$2"
          right="$2"
          onPress={onRequestClose}
          chromeless
        >
          <XCircle />
        </Button>

        <H1 fontSize={"$9"}>Añadir a desayuno</H1>
        <SearchBar value="" setSearchQuery={setSearchQuery} size={"$4"} />

        <Paragraph>AddIngredientFormModal</Paragraph>
        {/* ... your other form elements ... */}
      </View>
    </Modal>
  );
}
