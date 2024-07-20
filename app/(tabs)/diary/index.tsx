import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { globalStyles } from "globalStyles";
import { Beef, CakeSlice, X } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";
import CircularProgress from "react-native-circular-progress-indicator";
import { DiaryFoodLog, StoredValue } from "@types";
import { getItem } from "@utils/AsyncStorage";
import { useAuth } from "@utils/useAuth";
import useFetch from "@utils/useFetch";

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const authToken = useAuth();
  // TODO: I don't know if it will be different url, but somehow you need to let the backend know which date you want to get the logs from and then filter for the day
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs `;
  const {
    loading,
    error,
    value: foodItems,
  } = useFetch<DiaryFoodLog[]>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  const dayFilteredFoodItems =
    foodItems?.filter((foodItem) => {
      const foodItemDate = new Date(foodItem.dateTime);
      return (
        foodItemDate.getDate() === selectedDate.getDate() &&
        foodItemDate.getMonth() === selectedDate.getMonth() &&
        foodItemDate.getFullYear() === selectedDate.getFullYear()
      );
    }) || [];

  const onSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={[globalStyles.diaryBackground, globalStyles.container]}
      >
        {/* Day summary  */}
        <YStack px={"$2"} pb="$4" w={"100%"}>
          {/* Circle progress bar  */}
          <XStack ai={"center"} justifyContent={"space-between"}>
            <CircularProgress
              radius={65}
              value={50}
              maxValue={100}
              progressValueColor="#FF0000"
              title="KCAL"
              titleColor="#000"
              titleStyle={{ fontSize: 12, fontWeight: "bold" }}
            />

            {/* Macro Slide */}
            <YStack gap="$2" flex={1} pl={"$4"}>
              <Button
                unstyled={true}
                backgroundColor={"#EF7D7D"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <Beef />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Proteína
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        999&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>

              <Button
                unstyled={true}
                backgroundColor={"#41BF84"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <CakeSlice />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Carbohidratos
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        999&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>

              <Button
                unstyled={true}
                backgroundColor={"#77ABD9"}
                borderRadius={"$4"}
                ai={"center"}
                jc={"center"}
                pl={"$2"}
              >
                <XStack
                  gap="$2"
                  ai={"center"}
                  w={"100%"}
                  justifyContent={"space-between"}
                >
                  <XStack gap="$2">
                    <Avocado width={26} height={26} />
                    <Paragraph mr={"$2"} fontWeight={"bold"}>
                      Grasas
                    </Paragraph>
                  </XStack>
                  <XStack gap={"$1"} ai={"center"} justifyContent={"center"}>
                    <View
                      pl={"$3"}
                      pr={"$2"}
                      py={"$2"}
                      backgroundColor={"$background"}
                      borderTopLeftRadius={"$7"}
                      borderBottomLeftRadius={"$7"}
                      borderTopRightRadius={"$4"}
                      borderBottomRightRadius={"$4"}
                    >
                      <Paragraph>
                        999&nbsp;
                        <Paragraph color={"$gray10"}>g</Paragraph>
                      </Paragraph>
                    </View>
                  </XStack>
                </XStack>
              </Button>
            </YStack>
          </XStack>
        </YStack>
        {/* Lower 2 / 3. Calendar and Meal types  */}
        <View px={"$2"}>
          <YStack
            backgroundColor={"$background"}
            borderRadius={"$7"}
            borderBottomLeftRadius={"$0"}
            borderBottomRightRadius={"$0"}
          >
            <MonthWeekdayStrip
              selectedDate={selectedDate}
              onSelectDateChange={onSelectedDateChange}
            />
            {dayFilteredFoodItems && (
              <DiaryDayView foodItems={dayFilteredFoodItems} />
            )}
          </YStack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
