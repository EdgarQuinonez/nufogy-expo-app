import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddIngredientFormModal from "@components/AddIngredientFormModal";
import { Button, H1, Paragraph, View, XStack, YStack } from "tamagui";
import { globalStyles } from "globalStyles";
import { Beef, CakeSlice, X } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";

export default function DiaryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddFoodPress = () => {
    setIsModalVisible(true);
  };

  const onSelectedDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <YStack>
        <XStack>
          <Paragraph>Circular Progress Bar</Paragraph>

          {/* Macro Slide */}
          <YStack>
            <Button>
              <XStack>
                <Beef />
                <Paragraph>999 gr</Paragraph>
              </XStack>
            </Button>
            <Button>
              <XStack>
                <CakeSlice />
                <Paragraph>999 gr</Paragraph>
              </XStack>
            </Button>
            <Button>
              <XStack>
                <Avocado width={28} height={28} />
                <Paragraph>999 gr</Paragraph>
              </XStack>
            </Button>
          </YStack>
        </XStack>
        {/* Slide position */}
        {/* <XStack>
          <Paragraph>Slide position</Paragraph>
        </XStack> */}
      </YStack>
      <YStack>
        <MonthWeekdayStrip
          selectedDate={selectedDate}
          onSelectDateChange={onSelectedDateChange}
        />
        <DiaryDayView />
      </YStack>
      {/* <Button onPress={handleAddFoodPress}>Añadir comida</Button> */}

      <AddIngredientFormModal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
    </SafeAreaView>
  );
}
