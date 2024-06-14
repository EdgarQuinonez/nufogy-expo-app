import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIngredientFormModal from "@components/AddIngredientFormModal";
import { Button, H1, Paragraph, View } from "tamagui";
import { globalStyles } from "globalStyles";

export default function DiaryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddFoodPress = () => {
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <H1>Diario</H1>
      <Button onPress={handleAddFoodPress}>Añadir comida</Button>

      <AddIngredientFormModal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
