import { XCircle } from "@tamagui/lucide-icons";
import React from "react";
import { Modal } from "react-native";
import { Button, Paragraph, View } from "tamagui";

export type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export default function AddIngredientFormModal({
  visible,
  onRequestClose,
}: Props) {
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

        <Paragraph>AddIngredientFormModal</Paragraph>
        {/* ... your other form elements ... */}
      </View>
    </Modal>
  );
}
