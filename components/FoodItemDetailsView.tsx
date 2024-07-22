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
import { useAuth } from "@utils/useAuth";
import useParseFoodItem from "@utils/useParseFoodItem";
import useNutritionCalculator from "@utils/useNutritionCalculator";
import { FoodContext } from "@providers/FoodContext";
import calculateNutritionSummary from "@utils/nutritionSummary";
import { useToastController } from "@tamagui/toast";

export type Props = {
  mealTypeId?: string | string[];
  foodItemId: string | string[] | undefined;
};

export default function FoodItemDetailsView({ mealTypeId, foodItemId }: Props) {
  // const [dateTime, setDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const authToken = useAuth();
  const toast = useToastController();

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/fs/getingridient/${foodItemId}`;
  const {
    loading,
    error,
    value: foodItem,
  } = useFetch<GetFoodItemResponseData>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  const parsedFoodItem = useParseFoodItem(foodItem?.data);

  const serving = Array.isArray(parsedFoodItem?.servings.serving)
    ? parsedFoodItem?.servings.serving[0]
    : parsedFoodItem?.servings.serving;

  const {
    selectedServing,
    setSelectedServing,
    unitAmount,
    setUnitAmount,
    calculatedNutritionValues,
    handleMacroInputChange,
  } = useNutritionCalculator(serving);

  const [placeholderUnit, setPlaceholderUnit] = useState(
    selectedServing?.number_of_units.toString() || "1"
  );

  useEffect(() => {
    if (serving) {
      setSelectedServing(serving);
      setUnitAmount(serving.number_of_units);
    }
  }, [serving]);

  useEffect(() => {
    if (selectedServing) {
      setPlaceholderUnit(selectedServing.number_of_units.toString());
    }
  }, [selectedServing]);

  const router = useRouter();
  const { handleSubmit } = useForm();
  const { daySummary, setFoodLogs, selectedDate, setSelectedDate } =
    useContext(FoodContext);

  const saveFood = async () => {
    try {
      const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs/`;
      if (parsedFoodItem && selectedServing && typeof mealTypeId === "string") {
        const bodyData: FoodLogRequestBody = {
          fs_id: parsedFoodItem.food_id,
          fs_serving: selectedServing.serving_id,
          meal_type: parseInt(mealTypeId),
          metric_serving_amount: selectedServing.metric_serving_amount,
          metric_serving_unit: selectedServing.metric_serving_unit,
          dateTime: selectedDate.toISOString(),
        };

        const response = await axios.post(apiEndpoint, bodyData, {
          headers: {
            Authorization: `Token ${authToken}`,
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

  const handleServingChange = (newServing: FoodItemServing) => {
    setSelectedServing(newServing);

    setUnitAmount(newServing.number_of_units);
  };

  const caloriePercentage = useMemo(() => {
    if (calculatedNutritionValues) {
      const calorieTarget = 2000; // TODO: Replace with actual target
      return Math.round(
        (calculatedNutritionValues.calories / calorieTarget) * 100
      );
    }
  }, [calculatedNutritionValues]);

  return (
    <Form onSubmit={handleSubmit(saveFood)} flex={1}>
      {loading ? (
        <YStack
          f={1}
          // ai={"center"}
          jc={"flex-start"}
          px={"$2"}
          pt={"$12"}
        >
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
        selectedServing &&
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
                    onMacroInputChange={handleMacroInputChange}
                  />,
                  <MicrosSlide
                    calculatedNutritionValues={{
                      sodium: calculatedNutritionValues?.sodium || 0,
                      sugar: calculatedNutritionValues?.sugar || 0,
                      fiber: calculatedNutritionValues?.fiber || 0,
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
                        placeholder={placeholderUnit}
                        onChangeText={(text) => {
                          setUnitAmount(
                            parseFloat(text) || selectedServing.number_of_units
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
                        onServingChange={handleServingChange}
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
