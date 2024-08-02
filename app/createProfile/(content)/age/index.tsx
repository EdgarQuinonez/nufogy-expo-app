import {
  View,
  Text,
  YStack,
  Paragraph,
  H4,
  Input,
  Label,
  XStack,
  Button,
} from "tamagui";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "globalStyles";
import ButtonProgressNext from "@components/ButtonNextProgress";

export default function WeightScreen() {
  const [birthDate, setBirthDate] = useState<Date>();

  const dayRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const yearRef = useRef<any>(null);

  const handleInputFocus = () => {
    if (dayRef.current) {
      dayRef.current.focus();
    }
  };

  const handleInputChange = (
    inputRef: any,
    nextInputRef: any,
    maxLength: number,
    value: string
  ) => {
    if (value.length >= maxLength) {
      if (nextInputRef.current) {
        nextInputRef.current.focus();
      }

      // Check for two-digit year in the year field
      if (inputRef === yearRef && value.length === 2) {
        const currentYear = new Date().getFullYear();
        const twoDigitYear = parseInt(value, 10);

        // Determine the century based on current year
        const prefix = twoDigitYear <= currentYear % 100 ? "20" : "19";
        inputRef.current.value = prefix + value;
        inputRef.current.blur();
      }
    }
  };

  return (
    <>
      <YStack
        bg={colors.background.main}
        f={1}
        ai={"center"}
        jc={"center"}
        gap={"$2"}
        px={"$4"}
      >
        <H4 color={colors.text.main}>¿Cuál es tu fecha de nacimiento?</H4>

        <Button
          unstyled
          ai={"center"}
          jc={"center"}
          bg={"$colorTransparent"}
          onPress={handleInputFocus}
        >
          <XStack w={"100%"}>
            {/* DAY */}
            <YStack ai={"center"} jc={"center"}>
              <Label>Día</Label>
              <View>
                <Input
                  ref={dayRef}
                  placeholder="DD"
                  keyboardType="numeric"
                  returnKeyType="next"
                  maxLength={2}
                  onChangeText={(text) =>
                    handleInputChange(dayRef, monthRef, 2, text)
                  }
                />
              </View>
            </YStack>
            {/* MONTH */}
            <YStack ai={"center"} jc={"center"}>
              <Label>Mes</Label>
              <View>
                <Input
                  ref={monthRef}
                  placeholder="MM"
                  keyboardType="numeric"
                  returnKeyType="next"
                  maxLength={2}
                  onChangeText={(text) =>
                    handleInputChange(monthRef, yearRef, 2, text)
                  }
                />
              </View>
            </YStack>
            {/* DAY */}
            <YStack ai={"center"} jc={"center"}>
              <Label>Año</Label>
              <View>
                <Input
                  ref={yearRef}
                  placeholder="YY"
                  keyboardType="numeric"
                  returnKeyType="next"
                  maxLength={2}
                  onChangeText={(text) =>
                    handleInputChange(yearRef, yearRef, 2, text)
                  }
                />
              </View>
            </YStack>
          </XStack>
        </Button>
      </YStack>
    </>
  );
}
