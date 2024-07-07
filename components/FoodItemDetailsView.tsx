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
import React, { useState, useMemo } from "react";
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
  StoredValue,
} from "@types";
import useFetch from "@utils/useFetch";
import MicronutrientBar from "@components/MicronutrientBar";
import MacroInputField from "@components/MacroInputField";

export type Props = {
  mealTypeId: string | string[] | undefined;
  foodItemId: string | string[] | undefined;
  authToken: StoredValue;
};

export default function FoodItemDetailsView({
  mealTypeId,
  foodItemId,
  authToken,
}: Props) {
  const [dateTime, setDateTime] = useState(new Date()); // Store the selected date and time
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of the picker

  const router = useRouter();

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/fs/getingridient/${foodItemId}`;

  const saveFood = () => {
    // ... your food logging logic
  };

  const onChangeDateTime = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate instanceof Date) {
      setDateTime(selectedDate);
    } else {
      console.warn("Invalid date selected:", selectedDate);
    }
  };

  const {
    loading,
    error,
    value: foodItem,
  } = useFetch<GetFoodItemResponseData>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  const parsedFoodItem: FoodItem | undefined = useMemo(() => {
    if (foodItem) {
      const { data } = foodItem;
      const parseServing = (
        serving: FoodItemServingString
      ): FoodItemServing => {
        return {
          calcium: parseInt(serving.calcium),
          calories: parseInt(serving.calories),
          carbohydrate: parseFloat(serving.carbohydrate),
          cholesterol: parseInt(serving.cholesterol),
          fat: parseFloat(serving.fat),
          fiber: parseFloat(serving.fiber),
          iron: parseFloat(serving.iron),
          measurement_description: serving.measurement_description,
          metric_serving_amount: parseFloat(serving.metric_serving_amount),
          metric_serving_unit: serving.metric_serving_unit,
          monounsaturated_fat: parseInt(serving.monounsaturated_fat),
          number_of_units: parseFloat(serving.number_of_units),
          polyunsaturated_fat: parseFloat(serving.polyunsaturated_fat),
          potassium: parseInt(serving.potassium),
          protein: parseFloat(serving.protein),
          saturated_fat: parseFloat(serving.saturated_fat),
          serving_description: serving.serving_description,
          serving_id: parseInt(serving.serving_id),
          serving_url: serving.serving_url,
          sodium: parseInt(serving.sodium),
          sugar: parseFloat(serving.sugar),
          vitamin_a: parseInt(serving.vitamin_a),
          vitamin_c: parseFloat(serving.vitamin_c),
          vitamin_d: parseInt(serving.vitamin_d),
        };
      };

      return {
        food_id: parseInt(data.food_id),
        food_name: data.food_name,
        food_type: data.food_type,
        food_url: data.food_url,
        servings: {
          serving: Array.isArray(data.servings.serving)
            ? data.servings.serving.map(parseServing)
            : parseServing(data.servings.serving),
        },
      };
    }
  }, [foodItem]);

  const serving = useMemo(() => {
    return Array.isArray(parsedFoodItem?.servings.serving)
      ? parsedFoodItem?.servings.serving[0]
      : parsedFoodItem?.servings.serving;
  }, [parsedFoodItem]);

  const caloriePercentage = useMemo(() => {
    if (serving) {
      const calorieTarget = 2000; // TODO: Replace with actual target
      return Math.round((serving?.calories / calorieTarget) * 100);
    }
  }, [serving]);

  return (
    <Form onSubmit={saveFood} px={"$2"} flex={1}>
      {loading ? (
        <YStack f={1} jc={"space-between"}>
          {/* Loading Placeholders */}
          <XStack ai={"center"} jc={"space-between"} w={"100%"} py={"$2"}>
            <Square size="$6" borderRadius="$2" />
            <Square size="$10" borderRadius="$2" />
            <Square size="$6" borderRadius="$2" />
          </XStack>

          <Square height="$4" width="70%" borderRadius="$4" />
          <XStack ai={"center"} justifyContent={"space-between"} pb={"$2"}>
            <Circle size="$14" />
            <Square size="$10" height="$12" borderRadius="$2" />
          </XStack>

          {/* Add more placeholders for other content areas */}
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
        serving && (
          <YStack f={1} jc={"space-between"}>
            {/* Content */}
            <View>
              {/* Header */}
              <XStack ai={"center"} jc={"space-between"} w={"100%"} py={"$2"}>
                <Button onPress={() => router.back()} chromeless>
                  <ArrowLeft />
                </Button>

                <H3>Guardar Alimento</H3>
                <Button chromeless>
                  <Check />
                </Button>
              </XStack>
              {/* Food Name */}
              <H4 alignSelf="flex-start" py={"$4"} color={"$color12"}>
                {parsedFoodItem?.food_name}
              </H4>
              {/* Kcal circle and macros inputs */}
              <XStack ai={"center"} justifyContent={"space-between"} pb={"$2"}>
                {serving && (
                  <CircularProgress
                    radius={65}
                    value={serving.calories} // Calories from serving
                    maxValue={2000}
                    progressValueColor="#FF0000"
                    title="KCAL"
                    titleColor="#000"
                    titleStyle={{ fontSize: 12, fontWeight: "bold" }}
                  />
                )}

                {/* Macro Slide */}
                <YStack gap="$2" flex={1} pl={"$4"}>
                  <MacroInputField
                    icon={<Beef />}
                    name={"Proteína"}
                    amount={serving.protein}
                    macrosSum={
                      serving.protein + serving.carbohydrate + serving.fat
                    }
                  />
                  <MacroInputField
                    icon={<CakeSlice />}
                    name={"Carbohidratos"}
                    amount={serving.carbohydrate}
                    macrosSum={
                      serving.protein + serving.carbohydrate + serving.fat
                    }
                  />
                  <MacroInputField
                    icon={<Avocado />}
                    name={"Grasas"}
                    amount={serving.fat}
                    macrosSum={
                      serving.protein + serving.carbohydrate + serving.fat
                    }
                  />
                </YStack>
              </XStack>
              {/* Kcal ratio label */}
              <XStack
                overflow="hidden"
                ai={"center"}
                jc={"center"}
                gap={"$1"}
                pb={"$4"}
              >
                <Info size={12} color={"$gray11"} />
                <Paragraph fontSize={13} color={"$gray11"}>
                  Esta porción representa un {caloriePercentage}% de tus
                  calorías objetivo.
                </Paragraph>
              </XStack>
              {/* Amount and unit inputs */}
              <YStack gap="$2" pb={"$4"}>
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
                    {/* Input field with Icon */}
                    <XStack flex={1} gap={"$2"}>
                      <Weight />

                      <Input
                        unstyled={true}
                        keyboardType="numeric"
                        placeholder={serving.number_of_units.toString()}
                        textAlign="center"
                        px={"$2"}
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
                        {format(dateTime, "HH:mm")}
                      </Paragraph>
                    </XStack>
                  </Button>
                </XStack>
              </YStack>

              {/* Micros Highlights */}

              <YStack
                ai={"center"}
                jc={"flex-start"}
                w={"100%"}
                gap={"$1"}
                pb={"$4"}
              >
                {/* TODO: Replace with actual values */}
                <MicronutrientBar
                  name={"Sodio"}
                  currentIntakeAmount={0}
                  amount={serving?.sodium || 0}
                  unit={"mg"}
                  totalAmount={1000}
                />
                <MicronutrientBar
                  name={"Azúcar"}
                  currentIntakeAmount={0}
                  amount={serving?.sugar || 0}
                  unit={"g"}
                  totalAmount={25}
                />
                <MicronutrientBar
                  name={"Fibra"}
                  currentIntakeAmount={2}
                  amount={serving?.fiber || 0}
                  unit={"g"}
                  totalAmount={50}
                />
              </YStack>

              {/* Jack Dice */}
              <View
                borderRadius={"$4"}
                bw={1}
                borderColor={"$gray10"}
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
                  {/* Replace with actual gpt output */}
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
          value={dateTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </Form>
  );
}
