import {
  View,
  Text,
  YStack,
  XStack,
  H3,
  Button,
  Paragraph,
  H5,
  H4,
} from "tamagui";
import {
  Coffee,
  EggFried,
  UtensilsCrossed,
  CookingPot,
  PlusCircle,
  Fish,
} from "@tamagui/lucide-icons";
import type { IconProps } from "@tamagui/helpers-icon";
import React, { useContext } from "react";
import { globalStyles } from "globalStyles";
import FoodItem from "./FoodItem";
import { FoodContext } from "@providers/FoodContext";
import { Link } from "expo-router";
import useFetch from "@utils/useFetch";
import { LoggedFood } from "@types";
import { useAuth } from "@utils/useAuth";

export type Props = {
  mealTypeId: number;
  name: string;
};

export default function MealType({ mealTypeId, name }: Props) {
  const { handleAddFoodPress } = useContext(FoodContext);

  const authToken = useAuth();

  let icon: React.ReactElement<IconProps>;
  let mealTypeColor: string;

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs `;
  const {
    loading,
    error,
    value: foodItems,
  } = useFetch<LoggedFood[]>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  console.log(foodItems);

  switch (name.toLowerCase()) {
    case "desayuno":
      icon = <EggFried />;
      mealTypeColor = "$yellow9";
      break;
    case "comida":
      icon = <CookingPot />;
      mealTypeColor = "$orange7";
      break;
    case "cena":
      icon = <Fish />;
      mealTypeColor = "$purple7";
      break;
    default:
      icon = <UtensilsCrossed />;
      mealTypeColor = "$gray6";
  }

  return (
    <YStack
      flex={1}
      ai={"flex-start"}
      jc={"center"}
      w={"100%"}
      backgroundColor={mealTypeColor}
      px={"$2"}
      borderRadius={"$4"}
      py={"$2"}
      gap={"$2"}
    >
      {/* Header */}
      <XStack w={"100%"} ai={"center"} jc={"space-between"}>
        <XStack ai={"center"} jc={"flex-start"} gap={"$2"} flex={1}>
          {icon}
          {/* Title */}
          <H4 textOverflow={"ellipsis"} overflow={"hidden"}>
            {name}
          </H4>
        </XStack>

        {/* Meal Summary Buttons */}
        <XStack gap={"$1"}>
          {/* Protein Btn */}
          <Button
            unstyled={true}
            disabled={true}
            h={"$4"}
            w={"$4"}
            borderRadius={"$4"}
            style={globalStyles.protein}
          >
            <YStack
              w={"100%"}
              h={"fit"}
              backgroundColor={"$background"}
              ai={"center"}
              jc={"center"}
              borderRadius={"$4"}
              borderBottomEndRadius={"$6"}
              borderBottomStartRadius={"$6"}
            >
              {/* Amount */}
              <Paragraph fontWeight={"bold"} fontSize={"$4"}>
                9999
                {/* Unit */}
              </Paragraph>
              <Paragraph
                opacity={0.75}
                fontSize={"$2"}
                color={"$gray10"}
                mt={"$-3"}
              >
                g
              </Paragraph>
            </YStack>
          </Button>
          {/* Carbs Btn */}
          <Button
            unstyled={true}
            disabled={true}
            h={"$4"}
            w={"$4"}
            borderRadius={"$4"}
            style={globalStyles.carbs}
          >
            <YStack
              w={"100%"}
              h={"fit"}
              backgroundColor={"$background"}
              ai={"center"}
              borderRadius={"$4"}
              jc={"center"}
              borderBottomEndRadius={"$6"}
              borderBottomStartRadius={"$6"}
            >
              {/* Amount */}
              <Paragraph fontWeight={"bold"} fontSize={"$4"}>
                9999
                {/* Unit */}
              </Paragraph>
              <Paragraph
                opacity={0.75}
                fontSize={"$2"}
                color={"$gray10"}
                mt={"$-3"}
              >
                g
              </Paragraph>
            </YStack>
          </Button>
          {/* Fat Btn */}
          <Button
            unstyled={true}
            disabled={true}
            h={"$4"}
            w={"$4"}
            borderRadius={"$4"}
            style={globalStyles.fat}
          >
            <YStack
              w={"100%"}
              h={"fit"}
              backgroundColor={"$background"}
              ai={"center"}
              borderRadius={"$4"}
              jc={"center"}
              borderBottomEndRadius={"$6"}
              borderBottomStartRadius={"$6"}
            >
              {/* Amount */}
              <Paragraph fontWeight={"bold"} fontSize={"$4"}>
                9999
                {/* Unit */}
              </Paragraph>
              <Paragraph
                opacity={0.75}
                fontSize={"$2"}
                color={"$gray10"}
                mt={"$-3"}
              >
                g
              </Paragraph>
            </YStack>
          </Button>
        </XStack>
      </XStack>
      {/* Food Items */}
      <YStack flex={1} w={"100%"}>
        <FoodItem />
      </YStack>
      {/* Add food item btn */}
      <Link
        href={{
          pathname: "/(addIngredientFormModal)/mealType/[mealTypeId]",
          params: { mealTypeId: mealTypeId },
        }}
        asChild
      >
        <Button
          icon={PlusCircle}
          scaleIcon={1.5}
          w={"100%"}
          variant={"outlined"}
          backgroundColor={"$background"}
          onPress={() => {
            handleAddFoodPress();
          }}
        >
          Agregar Comida
        </Button>
      </Link>
    </YStack>
  );
}
