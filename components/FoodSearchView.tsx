import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, XCircle } from "@tamagui/lucide-icons";
import { Platform, StatusBar } from "react-native";
import { Modal } from "react-native";
import {
  Button,
  H1,
  H3,
  H4,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from "tamagui";
import SearchBar from "@components/SearchBar";
import FoodSearchItem from "@components/FoodSearchItem";
import { FoodSearchResponseData, StoredValue } from "@types";
import useFetch from "@utils/useFetch";
import { getItem } from "@utils/AsyncStorage";
import { debounce } from "tamagui";
import { KeyboardAvoidingView } from "react-native";
import { globalStyles } from "globalStyles";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

export type Props = {
  authToken: StoredValue;
};

export default function FoodSearchView({ authToken }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { mealTypeId } = useLocalSearchParams();

  const router = useRouter();

  const debouncedSetSearchQuery = useRef(debounce(setSearchQuery, 300)).current;

  const apiEndpoint = `${
    process.env.EXPO_PUBLIC_API_BASE_URL
  }/diary/fs/searchlist/?query=${
    searchQuery === "" ? "Chicken Breast" : searchQuery
  }`;

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
    <View flex={1} px={"$4"}>
      {/* TopBar */}
      <XStack w={"100%"} ai={"center"} jc={"space-between"} py={"$4"}>
        <Button onPress={() => router.back()} chromeless asChild>
          <ArrowLeft />
        </Button>
        <H3>Añadir a desayuno</H3>
        <View w={"24px"} backgroundColor={"$colorTransparent"} />
      </XStack>

      <SearchBar setSearchQuery={debouncedSetSearchQuery} size={"$4"} />

      {/* FoodSearchItems result container */}

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
            <Paragraph px={"$2"}>Error: {error.message}</Paragraph>
          ) : foods && foods.data && foods.data.length > 0 ? (
            foods.data.map((item) => (
              <Link
                key={item.food_id}
                href={{
                  pathname:
                    "/(addIngredientFormModal)/mealType/[mealTypeId]/foodItemDetails/[foodItemId]",
                  params: { mealTypeId: mealTypeId, foodItemId: item.food_id },
                }}
              >
                <FoodSearchItem
                  food_name={item.food_name}
                  food_description={item.food_description}
                />
              </Link>
            ))
          ) : (
            <Paragraph px={"$2"}>No se encontraron alimentos.</Paragraph>
          )}
        </ScrollView>
      </YStack>
      <XStack py={"$4"} justifyContent="center" gap="$2" alignSelf="flex-end">
        <Button
          onPress={() => router.back()}
          icon={<ArrowLeft />}
          backgroundColor={"$red11Dark"}
        >
          Cancelar
        </Button>
        <Button
          onPress={() => router.back()}
          iconAfter={<Check />}
          backgroundColor={"$blue11Dark"}
        >
          Añadir
        </Button>
      </XStack>
    </View>
  );
}
