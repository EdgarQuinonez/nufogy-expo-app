import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import { colors, globalStyles } from "globalStyles";
import React, { useState } from "react";
import { Button, Paragraph, View, XStack, YStack } from "tamagui";

export type Props = {
  selectedDate: Date;
  onSelectDateChange: (date: Date) => void;
};

export default function MonthWeekdayStrip({
  selectedDate,
  onSelectDateChange,
}: Props) {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());

  const getWeekdaysFromMonday = (date: Date) => {
    const day = date.getDay(); // 1
    const days = [];
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - day + (day == 0 ? -6 : 1) + i);
      days.push(newDate);
    }
    return days;
  };

  const monthsFull = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const monthsShort = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const months = monthsFull.map((full, index) => ({
    short: monthsShort[index],
    full,
  }));

  const days = ["D", "L", "M", "X", "J", "V", "S"];

  const handlePreviousMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    setCurrentMonth(newMonth);
  };

  const dayNumbers =
    selectedDate.getMonth() === currentMonth
      ? getWeekdaysFromMonday(selectedDate)
      : getWeekdaysFromMonday(
          new Date(selectedDate.getFullYear(), currentMonth, 1)
        );

  return (
    <YStack ai={"center"} jc={"center"} maxWidth={"100%"}>
      {/* Month nav */}
      <XStack ai={"center"} jc={"center"} gap={"$2"}>
        <Button onPress={handlePreviousMonth} chromeless>
          <ChevronLeft color={colors.text.main} />
        </Button>
        <Paragraph fontWeight={"bold"} fontSize={"$6"} color={colors.text.main}>
          {months[currentMonth].short}
        </Paragraph>
        <Button onPress={handleNextMonth} chromeless>
          <ChevronRight color={colors.text.main} />
        </Button>
      </XStack>
      {/* Week Days Strip */}
      <XStack ai={"center"} jc={"space-around"} w={"100%"} h={"$6"} px={"$2"}>
        {dayNumbers.map((day) => {
          const isCurrentMonth = day.getMonth() === currentMonth;
          const isSelectedDate =
            day.toDateString() === selectedDate.toDateString();
          return (
            <Button
              key={day.getTime()}
              ai={"center"}
              jc={"center"}
              bg={"$colorTransparent"}
              py={"$2"}
              h={"100%"}
              hoverStyle={{ opacity: 0.8 }}
              pressStyle={{ opacity: 0.9 }}
              opacity={isCurrentMonth ? 1 : 0.25}
              onPress={() => onSelectDateChange(day)}
              chromeless
            >
              <YStack ai={"center"} jc={"center"} gap={"$1"}>
                <Paragraph
                  opacity={isSelectedDate ? 0.8 : 0.5}
                  color={colors.text.main}
                  fontWeight={isSelectedDate ? "bold" : "normal"}
                >
                  {days[day.getDay()]}
                </Paragraph>
                <Paragraph fontWeight={"bold"} color={colors.text.main}>
                  {day.getDate()}
                </Paragraph>
                <View
                  w={8}
                  h={8}
                  borderRadius={6}
                  mt={"$2"}
                  bg={isSelectedDate ? colors.accent : "$colorTransparent"}
                />
              </YStack>
            </Button>
          );
        })}
      </XStack>
    </YStack>
  );
}
