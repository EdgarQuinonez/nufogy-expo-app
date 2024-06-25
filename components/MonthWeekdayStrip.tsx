import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import React, { useEffect, useState } from "react";
import { Button, Paragraph, XStack, YStack } from "tamagui";

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
    <YStack>
      <XStack>
        <Button onPress={handlePreviousMonth}>
          <ChevronLeft />
        </Button>
        <Paragraph>{months[currentMonth].short}</Paragraph>
        <Button onPress={handleNextMonth}>
          <ChevronRight />
        </Button>
      </XStack>
      <XStack>
        {dayNumbers.map((day) => (
          <Button key={day.getTime()}>
            <YStack>
              <Paragraph>{days[day.getDay()]}</Paragraph>
              <Paragraph>{day.getDate()}</Paragraph>
            </YStack>
          </Button>
        ))}
      </XStack>
    </YStack>
  );
}
