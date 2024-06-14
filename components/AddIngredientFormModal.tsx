import { XCircle } from "@tamagui/lucide-icons";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import { Button, H1, View, XStack, YStack } from "tamagui";
import SearchBar from "@components/SearchBar";
import FoodSearchItem from "@components/FoodSearchItem";
import { FoodSearchItemType } from "@types";
import useFetch from "@utils/useFetch";

export type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export default function AddIngredientFormModal({
  visible,
  onRequestClose,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  // const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/fs/searchList/?query=${searchQuery}`;
  const apiEndpoint = `https://nufogy-api.fly.dev//diary/fs/searchList/?query=${searchQuery}`;

  // const foods: FoodSearchItemType[] = [
  //   {
  //     food_id: 1,
  //     food_name: "Apple",
  //     brand_name: "Fruit Co.",
  //     food_type: "Fruit",
  //     food_url: "https://example.com/apple",
  //     food_description: "A delicious and healthy fruit.",
  //   },
  //   {
  //     food_id: 2,
  //     food_name: "Banana",
  //     brand_name: "Fruit Co.",
  //     food_type: "Fruit",
  //     food_url: "https://example.com/banana",
  //     food_description: "A popular tropical fruit.",
  //   },
  //   {
  //     food_id: 3,
  //     food_name: "Carrot",
  //     brand_name: "Vegetable Co.",
  //     food_type: "Vegetable",
  //     food_url: "https://example.com/carrot",
  //     food_description: "A crunchy and nutritious vegetable.",
  //   },
  // ];
  const { value: foods } = useFetch(apiEndpoint, {}, [searchQuery]);
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
        px="$4"
        py="$6"
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
        <SearchBar
          value={searchQuery}
          setSearchQuery={setSearchQuery}
          size={"$4"}
        />

        <YStack
          marginTop={"$4"}
          flex={1}
          width={"100%"}
          justifyContent="flex-start"
          alignItems="flex-start"
          borderColor={"$border"}
          borderWidth={1}
          borderRadius={"$2"}
        >
          {foods.map((item) => (
            <FoodSearchItem
              key={item.food_id}
              food_name={item.food_name}
              food_description={item.food_description}
            />
          ))}
        </YStack>
        <XStack
          marginTop={"$4"}
          justifyContent="center"
          gap="$2"
          alignSelf="flex-end"
        >
          <Button onPress={onRequestClose}>Cancelar</Button>
          <Button onPress={onRequestClose}>Añadir</Button>
        </XStack>
      </View>
    </Modal>
  );
}
