import React from "react";
import { Paragraph, View, YStack, H4, Square } from "tamagui";
import MealType from "@components/MealType";
import { DiaryFoodLog, MealType as MealTypeTypes } from "@types";
import useFetch from "@utils/useFetch";
import { useSession } from "@providers/AuthContext";
import { colors } from "globalStyles";

export type Props = {
  foodLogs: DiaryFoodLog[];
};

export default function DiaryDayView({ foodLogs }: Props) {
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/mealtype/`;
  const { session } = useSession();
  const {
    loading,
    error,
    value: mealTypes,
  } = useFetch<MealTypeTypes[]>(
    apiEndpoint,
    { headers: { Authorization: session ? `Token ${session}` : "" } },
    [session]
  );

  return (
    <View maxWidth={"100%"}>
      <H4 pl={"$4"} py={"$2"} color={colors.text.main}>
        Comidas del día
      </H4>

      {loading ? (
        <YStack
          ai={"flex-start"}
          jc={"center"}
          w={"100%"}
          p={"$2"}
          flex={1}
          gap={"$2"}
        >
          <Square
            h={184}
            w={"100%"}
            bg={colors.background.accent}
            borderRadius={"$4"}
          />
          <Square
            h={184}
            w={"100%"}
            bg={colors.background.accent}
            borderRadius={"$4"}
          />
          <Square
            h={184}
            w={"100%"}
            bg={colors.background.accent}
            borderRadius={"$4"}
          />
        </YStack>
      ) : error ? (
        <View ai="center" jc="center" flex={1}>
          <H4 color="$red10">Error al cargar las comidas</H4>
          <Paragraph mt="$2">Por favor, intentalo de nuevo.</Paragraph>
        </View>
      ) : (
        <YStack
          ai={"center"}
          jc={"flex-start"}
          px={"$2"}
          gap={"$2"}
          py={"$2"}
          flex={1}
        >
          {mealTypes &&
            mealTypes.map((mealType) => {
              if (mealType.active) {
                return (
                  <MealType
                    key={mealType.id}
                    mealTypeId={mealType.id}
                    name={mealType.name}
                    foodLogs={foodLogs}
                  />
                );
              }
            })}
        </YStack>
      )}
    </View>
  );
}
