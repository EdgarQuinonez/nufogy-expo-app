import { XCircle } from "@tamagui/lucide-icons";
import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import {
  Button,
  H1,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from "tamagui";
import SearchBar from "@components/SearchBar";
import FoodSearchItem from "@components/FoodSearchItem";
import { FoodSearchResponseData } from "@types";
import useFetch from "@utils/useFetch";
import { getItem } from "@utils/AsyncStorage";

type StoredValue = string | number | boolean | object | null;

export type Props = {
  visible: boolean;
  onRequestClose: () => void;
};

export default function AddIngredientFormModal({
  visible,
  onRequestClose,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [authToken, setAuthToken] = useState<StoredValue | null>(null);

  const apiEndpoint = `${
    process.env.EXPO_PUBLIC_API_BASE_URL
  }/diary/fs/searchlist/?query=${
    searchQuery === "" ? "Chicken Breast" : searchQuery
  }`;

  // Default initial query. Replace this later with user most used foods

  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await getItem("authToken");
      setAuthToken(token);
    };

    if (visible) {
      StatusBar.setBarStyle("dark-content");
      fetchAuthToken();
    }
  }, [visible]);

  const {
    loading,
    error,
    value: foods,
  } = useFetch<FoodSearchResponseData>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [searchQuery, authToken]
  );

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
          overflow={"scroll"}
        >
          <ScrollView w={"100%"}>
            {loading ? (
              <Paragraph px={"$2"}>Cargando alimentos...</Paragraph>
            ) : error ? (
              <Paragraph>Error: {error.message}</Paragraph>
            ) : foods && foods.data && foods.data.length > 0 ? (
              foods.data.map((item) => (
                <FoodSearchItem
                  key={item.food_id}
                  food_name={item.food_name}
                  food_description={item.food_description}
                />
              ))
            ) : (
              <Paragraph px={"$2"}>No se encontraron alimentos.</Paragraph>
            )}
          </ScrollView>
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
