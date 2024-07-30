import {
  View,
  Text,
  XStack,
  H3,
  Paragraph,
  Button,
  YStack,
  Form,
  Label,
  Input,
  H4,
  H2,
  H5,
  Circle,
  Square,
} from "tamagui";
import React, { useState, useMemo, useEffect, useContext } from "react";
import {
  ArrowLeft,
  Beef,
  Bot,
  CakeSlice,
  Check,
  Clock,
  Info,
  Shapes,
  Weight,
} from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import CircularProgress from "react-native-circular-progress-indicator";
import SelectDropdown from "./SelectDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, parse } from "date-fns";
import ProjectedProgressBar from "./ProjectedProgressBar";
import { useRouter } from "expo-router";
import {
  FoodItem,
  FoodItemServing,
  FoodItemServingString,
  GetFoodItemResponseData,
  FoodLogRequestBody,
  StoredValue,
} from "@types";
import useFetch from "@utils/useFetch";
import MicronutrientBar from "@components/MicronutrientBar";
import MacroInputField from "@components/MacroInputField";
import DonutGraph from "./DonutGraph";
import MacroCalorieSlide from "@components/MacroCalorieSlide";
import MicrosSlide from "@components/MicrosSlide";
import FoodInfoSlides from "./FoodInfoSlides";
import axios from "axios";
import { useForm } from "react-hook-form";

import useParseFoodItem from "@utils/useParseFoodItem";
import useNutritionCalculator from "@utils/useNutritionCalculator";
import { FoodContext } from "@providers/FoodContext";
import calculateNutritionSummary from "@utils/nutritionSummary";
import { useToastController } from "@tamagui/toast";
import useProfile from "@utils/useProfile";
import useRDI from "@utils/useRDI";
import { useSession } from "@providers/AuthContext";

export type Props = {
  mealTypeId?: string | string[];
  foodItemId: string | string[] | undefined;
};

export default function FoodItemDetailsView({ mealTypeId, foodItemId }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { session } = useSession();
  const { rdi } = useRDI();
  const toast = useToastController();
  const router = useRouter();
  const { handleSubmit } = useForm();

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/fs/getingridient/${foodItemId}`;
  const {
    loading,
    error,
    value: foodItem,
  } = useFetch<GetFoodItemResponseData>(
    apiEndpoint,
    { headers: { Authorization: session ? `Token ${session}` : "" } },
    [session]
  );
  const { daySummary, setFoodLogs, selectedDate, setSelectedDate } =
    useContext(FoodContext);

  const parsedFoodItem = useParseFoodItem(foodItem?.data);

  const defaultServing = Array.isArray(parsedFoodItem?.servings.serving)
    ? parsedFoodItem?.servings.serving[0]
    : parsedFoodItem?.servings.serving;

  const { serving, setServing, setAmount, calculatedNutritionValues } =
    useNutritionCalculator();

  const saveFood = async () => {
    try {
      const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs/`;
      if (
        calculatedNutritionValues &&
        parsedFoodItem &&
        serving &&
        typeof mealTypeId === "string"
      ) {
        const bodyData: FoodLogRequestBody = {
          fs_id: parsedFoodItem.food_id,
          fs_serving: serving.serving_id,
          meal_type: parseInt(mealTypeId),
          // Calculate metric_serving_amount from units (user input)
          metric_serving_amount:
            (calculatedNutritionValues?.number_of_units /
              serving.number_of_units) *
            serving.metric_serving_amount,
          metric_serving_unit: serving.metric_serving_unit,
          dateTime: selectedDate.toISOString(),
        };

        const response = await axios.post(apiEndpoint, bodyData, {
          headers: {
            Authorization: `Token ${session}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.show("Alimento guardado con éxito", {
            message: "¡Buen provecho!",
          });
          const newFoodLog = response.data;
          setFoodLogs((prevLogs) => [...prevLogs, newFoodLog]);
          router.back();
        } else {
          toast.show("Error", {
            message: "Hubo un error al guardar el alimento.",
          });
          console.error("Failed to save food:", response.status);
        }
      }
    } catch (error) {
      console.error("Error saving food:", (error as any).message);
    }
  };

  const onChangeDateTime = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate instanceof Date) {
      setSelectedDate(selectedDate);
    } else {
      console.warn("Invalid date selected:", selectedDate);
    }
  };

  const caloriePercentage = useMemo(() => {
    if (calculatedNutritionValues) {
      const calorieTarget = rdi;
      return Math.round(
        (calculatedNutritionValues.calories / calorieTarget) * 100
      );
    }
  }, [calculatedNutritionValues]);

  useEffect(() => {
    // Initially set user's current time as the selected time
    const setToCurrentTime = () => {
      const newSelectedDate = selectedDate;
      const currentTime = new Date();
      const hours = currentTime.getHours();
      const minutes = currentTime.getMinutes();
      newSelectedDate.setHours(hours);
      newSelectedDate.setMinutes(minutes);

      setSelectedDate(newSelectedDate);
    };
    setToCurrentTime();

    // Initially calculate nutrition values for default serving
    if (defaultServing) {
      setServing(defaultServing);
    }
  }, [defaultServing]);

  return (
    <Form onSubmit={handleSubmit(saveFood)} flex={1}>
      {loading ? (
        <YStack f={1} jc={"flex-start"} px={"$2"} pt={"$12"}>
          <Square
            h={"$4"}
            w={"$8"}
            backgroundColor={"$gray5"}
            alignSelf="flex-start"
          />
        </YStack>
      ) : error ? (
        <YStack f={1} jc="center" ai="center">
          <H2>Error loading food details</H2>
          <Paragraph>{error.message}</Paragraph>
          <Button onPress={() => router.back()}>Go Back</Button>
        </YStack>
      ) : (
        foodItem &&
        parsedFoodItem &&
        calculatedNutritionValues && (
          <YStack f={1} jc={"space-between"}>
            {/* Content */}
            <View>
              {/* Header */}
              <XStack ai={"center"} jc={"space-between"} w={"100%"} py={"$2"}>
                <Button onPress={() => router.back()} px={"$4"} chromeless>
                  <ArrowLeft />
                </Button>

                <H3>Guardar Alimento</H3>
                <Button px={"$4"} onPress={saveFood} chromeless>
                  <Check />
                </Button>
              </XStack>
              {/* Food Name */}
              <H4 alignSelf="flex-start" py={"$4"} color={"$color12"} px={"$2"}>
                {parsedFoodItem?.food_name}
              </H4>
              {/* Food Nutri Info Details Slides */}
              <FoodInfoSlides
                slides={[
                  <MacroCalorieSlide
                    calculatedNutritionValues={calculatedNutritionValues}
                    onMacroInputChange={setAmount}
                  />,
                  <MicrosSlide
                    calculatedNutritionValues={{
                      sodium:
                        Math.round(calculatedNutritionValues?.sodium) || 0,
                      sugar: Math.round(calculatedNutritionValues?.sugar) || 0,
                      fiber: Math.round(calculatedNutritionValues?.fiber) || 0,
                    }}
                    currentIntakeAmounts={{
                      sodium: daySummary.sodium,
                      sugar: daySummary.sugar,
                      fiber: daySummary.fiber,
                    }}
                    // TODO: Calculate user's recommended intake
                    totalAmounts={{ sodium: 1000, sugar: 25, fiber: 50 }}
                  />,
                ]}
              />

              {/* Kcal ratio label */}
              <XStack
                overflow="hidden"
                ai={"center"}
                jc={"center"}
                gap={"$1"}
                pb={"$4"}
                px={"$2"}
              >
                <Info size={12} color={"$gray11"} />
                <Paragraph fontSize={13} color={"$gray11"}>
                  Esta porción representa un {caloriePercentage || 0}% de tus
                  calorías objetivo.
                </Paragraph>
              </XStack>
              {/* Amount and unit inputs */}
              <YStack gap="$2" px={"$2"} pb={"$4"}>
                {/* Amount Input with Logo */}
                <XStack ai={"center"} jc={"flex-end"} gap={"$2"} w={"100%"}>
                  <Label fontWeight={"bold"}>Cantidad</Label>
                  {/* Capsule */}
                  <XStack
                    px={"$2"}
                    py={"$2"}
                    height={"$4"}
                    borderRadius={"$4"}
                    borderColor={"$gray11"}
                    borderWidth={1}
                    ai={"center"}
                    jc={"space-between"}
                    w={"$14"}
                  >
                    {/* Units Input field with Icon */}
                    <XStack flex={1} gap={"$2"}>
                      <Weight />
                      <Input
                        unstyled={true}
                        keyboardType="numeric"
                        returnKeyType="done"
                        placeholder={(
                          Math.round(
                            calculatedNutritionValues.number_of_units * 10
                          ) / 10
                        ).toString()}
                        onChangeText={(text) => {
                          setAmount(
                            parseFloat(text) ||
                              calculatedNutritionValues.number_of_units
                          );
                        }}
                        textAlign="left"
                        pl={"$4"}
                        pr={"$2"}
                        flex={1}
                      />
                    </XStack>
                    {/* Select dropdown for Units*/}

                    <XStack
                      ai={"center"}
                      jc={"center"}
                      w={"40%"}
                      blw={1}
                      borderColor={"$color11"}
                    >
                      <SelectDropdown
                        onServingChange={setServing}
                        serving={parsedFoodItem?.servings.serving}
                      />
                    </XStack>
                  </XStack>
                </XStack>
                {/* Meal Time Input with DateTimePicker */}
                <XStack ai={"center"} jc={"flex-end"} gap={"$2"} w={"100%"}>
                  <Label fontWeight={"bold"}>Hora</Label>

                  <Button
                    unstyled={true}
                    onPress={() => setShowDatePicker(true)}
                    borderRadius={"$4"}
                    borderColor={"$gray11"}
                    borderWidth={1}
                    ai={"center"}
                    jc={"center"}
                    h={"$4"}
                    w={"$14"}
                    px={"$2"}
                    py={"$2"}
                  >
                    <XStack>
                      <Clock />
                      {/* Hour and minutes here should display the users current time */}
                      <Paragraph flex={1} textAlign={"center"}>
                        {format(selectedDate, "HH:mm")}
                      </Paragraph>
                    </XStack>
                  </Button>
                </XStack>
              </YStack>

              {/* Jack Dice */}
              <View
                borderRadius={"$4"}
                bw={1}
                borderColor={"$gray5"}
                mx={"$2"}
                px={"$3"}
                py={"$4"}
              >
                <XStack
                  ai={"center"}
                  jc={"flex-start"}
                  w={"100%"}
                  gap={"$2"}
                  pb={"$2"}
                >
                  <Shapes />
                  <Paragraph fontWeight={"bold"}>Patrón alimenticio</Paragraph>
                </XStack>

                <Paragraph>
                  {/* TODO: Replace with actual gpt output */}
                  Has consumido Chicken Breast los últimos 5 días de la semana,
                  recuerda variar tus fuentes de proteína para asegurar una
                  ingesta equilibrada de nutrientes.
                </Paragraph>
              </View>
            </View>

            {/* Save and cancel buttons */}
            <XStack
              w={"100%"}
              ai={"center"}
              jc={"flex-end"}
              py={"$2"}
              px={"$2"}
              gap={"$1"}
              alignSelf={"flex-end"}
            >
              <Button
                unstyled={true}
                backgroundColor={"#E15252"}
                px={"$4"}
                py={"$3"}
                borderRadius={"$4"}
                onPress={() => {
                  router.back();
                }}
                pressStyle={{ opacity: 0.8 }}
              >
                <XStack gap={"$1"} ai={"center"} jc={"center"}>
                  <ArrowLeft color={"$background"} />
                  <Paragraph color={"$background"}>Cancelar</Paragraph>
                </XStack>
              </Button>
              <Button
                unstyled={true}
                backgroundColor={"#1E1940"}
                px={"$4"}
                py={"$3"}
                borderRadius={"$4"}
                color={"$background"}
                onPress={saveFood}
                pressStyle={{ opacity: 0.8 }}
              >
                <XStack gap={"$1"} ai={"center"} jc={"center"}>
                  <Paragraph color={"$background"}>Guardar</Paragraph>
                  <Check color={"$background"} />
                </XStack>
              </Button>
            </XStack>
          </YStack>
        )
      )}

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </Form>
  );
}
