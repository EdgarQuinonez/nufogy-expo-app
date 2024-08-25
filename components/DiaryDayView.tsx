import React, { useContext, useState } from "react";
import { Paragraph, View, YStack, H4, Square, Button } from "tamagui";
import MealType from "@components/MealType";
import { DiaryFoodLog, MealType as MealTypeTypes } from "@types";
import useFetch from "@utils/useFetch";
import { useSession } from "@providers/AuthContext";
import { colors } from "globalStyles";
import { Wand2 } from "@tamagui/lucide-icons";
import { useProfile } from "@providers/ProfileContext";
import axios from "axios";
import useRDI from "@utils/useRDI";
import { FoodContext } from "@providers/FoodContext";

export type Props = {
  foodLogs: DiaryFoodLog[];
};

export default function DiaryDayView({ foodLogs }: Props) {
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/mealtype/`;
  const { setFoodLogs } = useContext(FoodContext);
  const { session } = useSession();
  const { rdi, macrosTargets } = useRDI();

  const {
    loading,
    error,
    value: mealTypes,
  } = useFetch<MealTypeTypes[]>(
    apiEndpoint,
    { headers: { Authorization: session ? `Token ${session}` : "" } },
    [session]
  );

  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);

  const handleGenerateDiet = async () => {
    try {
      setIsGeneratingDiet(true); // Set loading flag to true
      const newFoodLogs = await simulateGenerateDiet(
        foodLogs,
        session,
        rdi,
        macrosTargets
      );

      if (newFoodLogs) {
        setFoodLogs(newFoodLogs);
      }
      // TODO: POST newFoodLogs to the API in bulk
    } catch (error) {
      console.error("Error generating diet:", error);
    } finally {
      setIsGeneratingDiet(false); // Reset loading flag after generation
    }
  };

  return (
    <View maxWidth={"100%"}>
      <H4 color={colors.text.main} pl={"$4"} py={"$2"}>
        Comidas del día
      </H4>
      <View px={"$4"}>
        {/* Generate Diet Btn */}
        <Button
          px={"$2"}
          py={"$3"}
          ai={"center"}
          jc={"center"}
          bg={colors.accent}
          borderColor={colors.text.main}
          borderWidth={1}
          onPress={() => handleGenerateDiet()}
        >
          <Paragraph
            color={colors.background.main}
            fontWeight={"bold"}
            lineHeight={16}
          >
            Generar Dieta
          </Paragraph>
          <Wand2 color={colors.background.main} />
        </Button>
      </View>

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
                    isGeneratingDiet={isGeneratingDiet}
                  />
                );
              }
            })}
        </YStack>
      )}
    </View>
  );
}

async function generateDiet(
  existingFoodLogs: DiaryFoodLog[],
  session: string | null | undefined,
  calorieGoal: number,
  macrosTargets: { protein: number; carbs: number; fat: number }
) {
  let isLoading = false;

  try {
    if (!session) {
      throw new Error("Necesitas estar autenticado para generar una dieta.");
    }

    isLoading = true;

    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs/generate_diet/`;

    const response = await axios.post(apiEndpoint, {
      headers: {
        Authorization: `Token ${session}`,
      },
      data: {
        existingFoodLogs,
        calorieGoal,
        macrosTargets,
      },
    });

    isLoading = false;
    return response.data;
  } catch (error) {
    isLoading = false;
    console.error("Error generating diet:", error);
    throw error;
  }
}

async function simulateGenerateDiet(
  existingFoodLogs: DiaryFoodLog[],
  session: string | null | undefined,
  calorieGoal: number,
  macrosTargets: { protein: number; carbs: number; fat: number },
  timeout = 2000
) {
  let isLoading = false;

  try {
    if (!session) {
      throw new Error("Necesitas estar autenticado para generar una dieta.");
    }

    isLoading = true;
    const simulatedResponse = new Promise<{ data: DiaryFoodLog[] }>(
      (resolve, reject) => {
        setTimeout(() => {
          resolve({ data: existingFoodLogs });
        }, timeout);
      }
    );

    const response = await Promise.race<{ data: DiaryFoodLog[] }>([
      simulatedResponse,
      new Promise((_, reject) =>
        setTimeout(reject, timeout, new Error("Timeout"))
      ),
    ]);

    if (response) {
      isLoading = false;

      return response.data;
    }
  } catch (error) {
    isLoading = false;
    console.error("Error simulating diet generation:", error);
    throw error;
  }
}
