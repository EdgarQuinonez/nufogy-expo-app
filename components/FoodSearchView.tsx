import React, { useRef, useState } from "react";
import { ArrowLeft, Check } from "@tamagui/lucide-icons";

import { Button, H3, Paragraph, ScrollView, View, XStack } from "tamagui";
import SearchBar from "@components/SearchBar";
import FoodSearchItem from "@components/FoodSearchItem";
import { FoodSearchResponseData } from "@types";
import useFetch from "@utils/useFetch";

import { debounce } from "tamagui";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@utils/useAuth";

export type Props = {};

export default function FoodSearchView({}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const { mealTypeId } = useLocalSearchParams();
  const { authToken } = useAuth();

  const router = useRouter();

  const debouncedSetSearchQuery = useRef(debounce(setSearchQuery, 270)).current;

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
        <Button
          icon={<ArrowLeft size={24} />}
          w={"$4"}
          px={"$2"}
          onPress={() => router.back()}
          chromeless
        />

        <H3>Añadir comida</H3>
        <View w={"$4"} px={"$2"} backgroundColor={"$colorTransparent"} />
      </XStack>

      <SearchBar setSearchQuery={debouncedSetSearchQuery} size={"$4"} />

      {/* FoodSearchItems result container */}

      <View
        marginTop={"$4"}
        flex={1}
        borderColor={"$border"}
        borderWidth={1}
        borderRadius={"$2"}
      >
        {loading ? (
          <View flex={1} justifyContent="center" alignItems="center" w={"100%"}>
            {/* Center the loading message */}
            <Paragraph>Cargando alimentos...</Paragraph>
          </View>
        ) : error ? (
          <View flex={1} justifyContent="center" alignItems="center" w={"100%"}>
            {/* Center the error message */}
            <Paragraph>Error: {error.message}</Paragraph>
          </View>
        ) : foods && foods.data && foods.data.length > 0 ? (
          <ScrollView w={"100%"}>
            {foods.data.map((item) => (
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
            ))}
          </ScrollView>
        ) : (
          <View flex={1} justifyContent="center" alignItems="center" w={"100%"}>
            <Paragraph>No se encontraron alimentos.</Paragraph>
          </View>
        )}
      </View>
      {/* Save and cancel buttons */}
      <XStack
        w={"100%"}
        ai={"center"}
        jc={"flex-end"}
        py={"$2"}
        gap={"$1"}
        alignSelf={"flex-end"}
      >
        {/* <Button
          unstyled={true}
          backgroundColor={"#E15252"}
          px={"$4"}
          py={"$3"}
          borderRadius={"$4"}
          onPress={() => {
            router.back();
          }}
        >
          <XStack gap={"$1"} ai={"center"} jc={"center"}>
            <ArrowLeft color={"$background"} />
            <Paragraph color={"$background"}>Cancelar</Paragraph>
          </XStack>
        </Button> */}
        <Button
          unstyled={true}
          flex={1}
          backgroundColor={"$green10"}
          px={"$4"}
          py={"$3"}
          borderRadius={"$4"}
          color={"$background"}
          onPress={() => {
            router.back();
          }}
          pressStyle={{ opacity: 0.8 }}
        >
          <XStack gap={"$1"} ai={"center"} jc={"center"}>
            <Paragraph color={"$background"} fontWeight={"bold"}>
              Terminar
            </Paragraph>
            <Check ml={"$0.25"} color={"$background"} />
          </XStack>
        </Button>
      </XStack>
    </View>
  );
}
