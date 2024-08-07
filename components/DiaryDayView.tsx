import React from "react";
import { Paragraph, View, YStack, H4 } from "tamagui";
import MealType from "@components/MealType";
import { DiaryFoodLog, MealType as MealTypeTypes } from "@types";
import useFetch from "@utils/useFetch";
import { useSession } from "@providers/AuthContext";

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
      <H4 pl={"$4"} py={"$2"}>
        Comidas del día
      </H4>

      {loading ? (
        <View ai="center" jc="center" flex={1}>
          <Paragraph mt="$2">Cargando comidas...</Paragraph>
        </View>
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
