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
  Square,
} from "tamagui";
import {
  Coffee,
  EggFried,
  UtensilsCrossed,
  CookingPot,
  PlusCircle,
  Fish,
  Loader,
} from "@tamagui/lucide-icons";
import type { IconProps } from "@tamagui/helpers-icon";
import React, { useContext } from "react";
import { colors, globalStyles } from "globalStyles";
import FoodItem from "./FoodItem";
import { FoodContext } from "@providers/FoodContext";
import { Link } from "expo-router";
import useFetch from "@utils/useFetch";
import { DiaryFoodLog, FoodLogRequestBody } from "@types";

import calculateNutritionSummary from "@utils/nutritionSummary";
import { LinearGradient } from "@tamagui/linear-gradient";

const MacroSummaryItem = ({
  label,
  value,
}: {
  label: "protein" | "carbohydrate" | "fat";
  value: number;
}) => {
  let color;
  switch (label) {
    case "protein":
      color = colors.protein;
      break;
    case "carbohydrate":
      color = colors.carbohydrate;
      break;
    case "fat":
      color = colors.fat;
      break;
    default:
      color = "$gray6";
  }

  return (
    <Button
      unstyled={true}
      disabled={true}
      h={48}
      w={48}
      borderRadius={"$4"}
      backgroundColor={color}
    >
      <XStack
        w={"100%"}
        h={"fit"}
        backgroundColor={"$background"}
        ai={"center"}
        jc={"center"}
        borderRadius={"$4"}
        borderBottomEndRadius={"$6"}
        borderBottomStartRadius={"$6"}
        gap={"$1"}
      >
        <Paragraph color={colors.text.main} fontWeight={"bold"} fontSize={"$4"}>
          {value}
        </Paragraph>
        <Paragraph opacity={0.75} fontSize={"$2"} color={colors.text.dim1}>
          g
        </Paragraph>
      </XStack>
    </Button>
  );
};

export type Props = {
  mealTypeId: number;
  name: string;
  foodLogs: DiaryFoodLog[];
  isGeneratingDiet: boolean;
};

export default function MealType({
  mealTypeId,
  name,
  foodLogs,
  isGeneratingDiet,
}: Props) {
  const { handleAddFoodPress } = useContext(FoodContext);

  let icon: React.ReactElement<IconProps>;
  let mealTypeColor: string;

  const filteredFoodLogs =
    foodLogs?.filter((item) => item.meal_type === mealTypeId) || [];

  const mealSummary = calculateNutritionSummary(filteredFoodLogs);

  switch (name.toLowerCase()) {
    case "desayuno":
      icon = <EggFried color={colors.text.main} />;
      mealTypeColor = colors.breakfast;
      break;
    case "comida":
      icon = <CookingPot color={colors.text.main} />;
      mealTypeColor = colors.lunch;
      break;
    case "cena":
      icon = <Fish />;
      mealTypeColor = colors.dinner;
      break;
    default:
      icon = <UtensilsCrossed color={colors.text.main} />;
      mealTypeColor = "$gray6";
  }

  return (
    <View w={"100%"}>
      <YStack
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
          <XStack ai={"center"} jc={"flex-start"} gap={"$2"}>
            {icon}
            {/* Title */}
            <H4
              textOverflow={"ellipsis"}
              overflow={"hidden"}
              color={colors.text.main}
            >
              {name}
            </H4>
          </XStack>

          {/* Meal Summary Buttons */}
          <XStack gap={"$1"}>
            <MacroSummaryItem
              label="protein"
              value={Math.round(mealSummary.protein)}
            />
            <MacroSummaryItem
              label="carbohydrate"
              value={Math.round(mealSummary.carbohydrate)}
            />
            <MacroSummaryItem label="fat" value={Math.round(mealSummary.fat)} />
          </XStack>
        </XStack>
        {/* Food Items */}

        {filteredFoodLogs.length > 0 || isGeneratingDiet ? (
          <YStack w={"100%"} gap={"$1"}>
            {filteredFoodLogs.map((foodLog, i) => (
              <FoodItem key={i} foodLog={foodLog} />
            ))}
            {isGeneratingDiet && (
              <YStack w={"100%"} ai={"center"} jc={"flex-start"}>
                <FoodItemSkeleton />
                <FoodItemSkeleton />
                <FoodItemSkeleton />
              </YStack>
            )}
          </YStack>
        ) : (
          <View
            w={"100%"}
            ai={"center"}
            jc={"center"}
            h={"$6"}
            bg={colors.background.main}
            // borderRadius={"$4"}
            borderStyle={"dashed"}
            borderWidth={"$0.5"}
          >
            <Paragraph color={colors.text.main}>
              No has agregado ningún alimento.
            </Paragraph>
          </View>
        )}

        {/* Add food item btn */}
        <Link
          href={{
            pathname: "/(app)/(addIngredientFormModal)/mealType/[mealTypeId]",
            params: { mealTypeId: mealTypeId },
          }}
          asChild
        >
          <Button
            bg={colors.text.main}
            ai={"center"}
            jc={"center"}
            w={"100%"}
            onPress={() => {
              handleAddFoodPress();
            }}
          >
            <Paragraph color={colors.background.main} fontWeight={"bold"}>
              Agregar
            </Paragraph>
            <PlusCircle color={colors.background.main} />
          </Button>
        </Link>
      </YStack>
      <Paragraph mt={"$0.25"} color={"$gray10"} fontSize={"$2"}>
        Total de calorías: {Math.round(mealSummary.calories)}
      </Paragraph>
    </View>
  );
}

function FoodItemSkeleton() {
  return (
    <LinearGradient
      colors={[
        colors.background.accent,
        colors.background.main,
        colors.background.accent,
      ]}
      start={[0, 0]}
      end={[1, 1]}
      height={72}
      width={"100%"}
      borderRadius={"$4"}
    />
  );
}
