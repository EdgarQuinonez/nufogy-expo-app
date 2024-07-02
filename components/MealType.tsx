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
import { EggFried, PlusCircle } from "@tamagui/lucide-icons";
import React, { useContext } from "react";
import { globalStyles } from "globalStyles";
import FoodItem from "./FoodItem";
import { FoodContext } from "@providers/FoodContext";
import { Link } from "expo-router";

export default function MealType() {
  const { handleAddFoodPress } = useContext(FoodContext);

  return (
    <YStack
      flex={1}
      ai={"flex-start"}
      jc={"center"}
      w={"100%"}
      backgroundColor={"$yellow5"}
      px={"$2"}
      borderRadius={"$4"}
      py={"$2"}
      gap={"$2"}
    >
      {/* Header */}
      <XStack w={"100%"} ai={"center"} jc={"space-between"}>
        {/* Icon */}
        <XStack ai={"center"} jc={"flex-start"} gap={"$2"} flex={1}>
          <EggFried />
          {/* Title */}
          <H4 textOverflow={"ellipsis"} overflow={"hidden"}>
            Desayuno
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
          params: { mealTypeId: 1 }, // TODO: Replace with actual id from server fetch
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
