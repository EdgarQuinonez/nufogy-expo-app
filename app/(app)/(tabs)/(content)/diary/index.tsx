import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { colors, globalStyles } from "globalStyles";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";
import CircularProgress from "react-native-circular-progress-indicator";
import MacroDisplay from "@components/MacroDisplay";
import { FoodContext } from "@providers/FoodContext";
import FoodInfoSlides from "@components/FoodInfoSlides";
import { Goal } from "@tamagui/lucide-icons";
import useRDI from "@utils/useRDI";
import TopBar from "@components/TopBar";
import TargetSlide from "@components/TargetSlide";
import MacrosSlide from "@components/MacrosSlide";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DiaryScreen() {
  const { rdi, macrosTargets } = useRDI();
  const { selectedDate, setSelectedDate, getDayFilteredFoodLogs, daySummary } =
    useContext(FoodContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dayFilteredFoodLogs = getDayFilteredFoodLogs(selectedDate);

  const onSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const onChangeDateTime = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate instanceof Date) {
      setSelectedDate(selectedDate);
    } else {
      console.warn("Invalid date selected:", selectedDate);
    }
  };

  return (
    <ScrollView bg={colors.background.diary}>
      <TopBar title="Diario" />

      {/* Day summary  */}
      <YStack pt="$4" pb={"$2"} w={"100%"}>
        <FoodInfoSlides
          slides={[
            <TargetSlide consumedCalories={daySummary.calories} rdi={rdi} />,
            <MacrosSlide
              protein={[daySummary.protein, macrosTargets.protein]}
              carbohydrate={[daySummary.carbohydrate, macrosTargets.carbs]}
              fat={[daySummary.fat, macrosTargets.fat]}
            />,
          ]}
        />
      </YStack>
      {/* Lower 2 / 3. Calendar and Meal types  */}
      <View px={"$2"}>
        <YStack
          backgroundColor={colors.background.main}
          borderRadius={"$7"}
          borderBottomLeftRadius={"$0"}
          borderBottomRightRadius={"$0"}
        >
          <MonthWeekdayStrip
            selectedDate={selectedDate}
            onSelectDateChange={onSelectedDateChange}
            setShowDatePicker={setShowDatePicker}
          />
          {dayFilteredFoodLogs && (
            <DiaryDayView foodLogs={dayFilteredFoodLogs} />
          )}
        </YStack>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </ScrollView>
  );
}
