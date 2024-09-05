import { View, Text, XStack, YStack, Input, Select, Paragraph, Button } from "tamagui";
import React, { useContext, useState } from "react";
import { ArrowLeftRight, Dot, Utensils, X } from "@tamagui/lucide-icons";
import { colors, globalStyles } from "globalStyles";
import {
  DiaryFoodLog,
  FoodItemServing,
  SwapMealBody,
  SwapMealResponse,
} from "@types";
import SelectDropdown from "@components/SelectDropdown";
import useNutritionCalculator from "@utils/useNutritionCalculator";
import parseFoodItemString from "@utils/parseFoodItemString";
import { calculateNutritionValues } from "@utils/nutritionValuesCalculator";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import { FoodContext } from "@providers/FoodContext";
import axios from "axios";
import { useSession } from "@providers/AuthContext";

  // export default function SwipeableFoodItem({ foodLog }: FoodItemProps) {
  //   const { foodLogs, setFoodLogs } = useContext(FoodContext);
  //   const transalateX = useSharedValue(0);
  //   const width = useWindowDimensions().width;
  //   const direction = useSharedValue(0);
    
  //   async function swapMeal() {
  //     const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/jack/swapmeal/`;
  //     try {
  //       // POST request to swap meal
  //       const bodyFoodLog = parseFoodLog(foodLog);

  //       const response = await axios.post(apiEndpoint, bodyFoodLog);

  //       if (response.status === 200) {
  //         const updatedFoodLog = response.data;
  //         console.log(response.data)

  //         setFoodLogs((prevLogs) => {
  //           const newLogs = prevLogs.filter((log) => log.id !== foodLog.id);
  //           return [...newLogs, updatedFoodLog];
  //         });
  //       } else {
  //         console.error(
  //           "Failed to swap the meal:",
  //           response.status,
  //           response.data
  //         );
  //       }
  //     } catch (error) {
  //       console.log("Error swaping meal: ", error);
  //     }
  //   };

  //   const renderLeftActions = () => {};

  //   const pan = Gesture.Pan()
  //     .onUpdate(({ translationX }) => {
  //       const isSwipeRight = translationX > 0;
  //       direction.value = isSwipeRight ? 1 : -1;
  //       transalateX.value = translationX;
  //     })
  //     .onEnd(() => {
  //       if (Math.abs(transalateX.value) > 150) {
  //         transalateX.value = withTiming(
  //           width * direction.value,
  //           undefined,
  //           (isFinished) => {
  //             if (isFinished) {
  //               swapMeal()
  //             }
  //           }
  //         );
  //       } else {
  //         transalateX.value = withTiming(0, { duration: 500 });
  //       }
  //     });

  //   const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [{ translateX: transalateX.value }],
  //     };
  //   });

  //   return (
  //     <GestureDetector gesture={pan}>
  //       <Animated.View style={animatedStyle}>
  //         {/* <LeftActions translateX={transalateX} width={width} /> */}
  //         <FoodItem foodLog={foodLog} />
  //       </Animated.View>
  //     </GestureDetector>
  //   );
  // }

export type FoodItemProps = {
  foodLog: DiaryFoodLog;
};

export function FoodItem({ foodLog }: FoodItemProps) {
  const { fs_object, fs_serving, metric_serving_amount } = foodLog;
  const {setFoodLogs} = useContext(FoodContext);
  const foodName = fs_object.food_name;
  const [isPressed, setIsPressed] = useState(false);
  const { session } = useSession();


  async function swapMeal() {
    const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/jack/swapmeal/`;
    try {
      // POST request to swap meal
      const bodyFoodLog = parseFoodLog(foodLog);
      const response = await axios.post(apiEndpoint, bodyFoodLog, {
        headers: {
          Authorization: `Token ${session}`,
        },
      });
  
      if (response.status === 200) {
        const updatedFoodLog = response.data.ingredient; // Ensure this matches DiaryFoodLog structure
        console.log('Updated Food Log:', updatedFoodLog);
        
        setFoodLogs((prevLogs) => {
          // Check if new food log is properly formatted
          if (!updatedFoodLog || !updatedFoodLog.id) {
            console.error('Invalid updated food log:', updatedFoodLog);
            return prevLogs; // Return the old state if the new one is invalid
          }
  
          const newLogs = prevLogs.filter((log) => log.id !== foodLog.id);
          return [...newLogs, updatedFoodLog];
        });
      } else {
        console.error(
          'Failed to swap the meal:',
          response.status,
          response.data
        );
      }
    } catch (error) {
      console.error('Error swapping meal:', (error as any).response?.data || error);
    } finally {
      setIsPressed(false);
    }
  }
  

  const foodItem = parseFoodItemString(fs_object);
  const servingData = Array.isArray(foodItem?.servings.serving)
    ? foodItem?.servings.serving.find((ser) => ser.serving_id === fs_serving)
    : foodItem?.servings.serving;

  const calculatedNutritionValues = calculateNutritionValues(
    metric_serving_amount,
    servingData
  );

  return (
    servingData &&
    calculatedNutritionValues && (
      <View>
      
    {
      !isPressed ? (
        <Button onPress={()=> setIsPressed(true)}>
          <XStack
            ai={"center"}
            jc={"flex-start"}
            w={"100%"}
            backgroundColor={"$background"}
            borderRadius={"$4"}
            py={"$1"}
            px={"$2"}
          >
            <View pr={"$2"}>
              <Utensils color={colors.text.main} />
            </View>

            <YStack flex={1} ai={"flex-start"} jc={"space-between"}>
              {/* Upper */}
              <XStack flex={1} w={"100%"} ai={"center"} jc={"space-between"}>
                {/* Food Name */}
                <XStack ai={"flex-start"} jc={"center"}>
                  <XStack
                    ai={"center"}
                    jc={"center"}
                    maxWidth={"$12"}
                    overflow="hidden"
                    h={23}
                  >
                    {/* TODO: Figure out text wrap and text overflow */}
                    <Text
                      numberOfLines={1}
                      color={colors.text.main}
                      ellipse={true}
                      ellipsizeMode="tail"
                    >
                      {foodName}
                    </Text>
                  </XStack>
                  <Dot color={colors.text.dim1} />
                  <Paragraph color={colors.text.main}>
                    {Math.round(metric_serving_amount)}
                  </Paragraph>
                  <Paragraph ml={"$1"} color={colors.text.dim1}>
                    {servingData.metric_serving_unit}
                  </Paragraph>
                </XStack>
                {/* Calories */}
                <XStack gap={"$1"}>
                  <Paragraph
                    fontWeight={"bold"}
                    fontSize={"$6"}
                    color={colors.text.main}
                  >
                    {Math.round(calculatedNutritionValues.calories)}
                  </Paragraph>
                  <Paragraph color={colors.text.dim1}>kcal</Paragraph>
                </XStack>
              </XStack>
              {/* Lower */}
              <XStack flex={1} gap={"$2"}>
                {/* Protein */}
                <MacroDisplay
                  color={colors.protein}
                  amount={calculatedNutritionValues?.protein}
                  unit="g"
                />
                {/* Carbs */}
                <MacroDisplay
                  color={colors.carbohydrate}
                  amount={calculatedNutritionValues?.carbohydrate}
                  unit="g"
                />
                {/* Fat */}
                <MacroDisplay
                  color={colors.fat}
                  amount={calculatedNutritionValues?.fat}
                  unit="g"
                />
              </XStack>
            </YStack>
          </XStack>
        </Button>
      ) : (
        <Button onPress={swapMeal} bg={colors.text.main}>
          <ArrowLeftRight color={colors.background.main}/>
        </Button>

      )
    }  
      </View>
    )
  );
}

export interface LeftActionsProps {
  translateX: SharedValue<number>;
  width: number;
}

export function LeftActions({ translateX, width }: LeftActionsProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        translateX.value,
        [0, width],
        [0, width],
        Extrapolation.CLAMP
      ),
      backgroundColor: colors.text.main,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <ArrowLeftRight color={colors.background.main} />
    </Animated.View>
  );
}

function MacroDisplay({
  color,
  amount,
  unit,
}: {
  color: string;
  amount?: number;
  unit: string;
}) {
  return (
    <XStack ai={"center"} jc={"center"} gap={"$1"} w={"$4"}>
      <View bg={color} h={"$0.75"} w={"$0.75"} borderRadius={"$true"} />
      <Paragraph color={colors.text.main}>{Math.round(amount || 0)}</Paragraph>
      <Paragraph color={colors.text.dim1}>{unit}</Paragraph>
    </XStack>
  );
}

function parseFoodLog(foodLog: DiaryFoodLog): SwapMealBody {
  const { fs_object } = foodLog;

  const servingData = Array.isArray(fs_object.servings.serving)
    ? fs_object.servings.serving[0]
    : fs_object?.servings.serving;

  if (!servingData) {
    throw new Error("Serving data not found");
  }

  return {
    ingredient: {
      ...foodLog,
      fs_object: {
        ...fs_object,
        servings: {
          serving: servingData,
        },
      },
    },
  };
}
