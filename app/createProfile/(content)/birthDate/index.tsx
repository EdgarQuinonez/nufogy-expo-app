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
import { useFormData } from "@providers/FormProfileContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "@tamagui/lucide-icons";
import { format } from "date-fns";
import { Controller } from "react-hook-form";

export default function AgeScreen() {
  const {
    methods: {
      control,
      setValue,
      formState: { errors },
    },
  } = useFormData();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChangeDateTime = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);

    if (selectedDate instanceof Date) {
      setValue("birthDate", selectedDate);
    } else {
      console.warn("Invalid date selected:", selectedDate);
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
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { value } }) => (
            <Button
              unstyled={true}
              onPress={() => {
                setShowDatePicker(true);
              }}
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
                <Calendar color={colors.text.main} />
                <Paragraph
                  flex={1}
                  textAlign={"center"}
                  color={colors.text.main}
                >
                  {value ? format(value, "dd/M/yyyy") : "dd/mm/aaaa"}
                </Paragraph>
              </XStack>
            </Button>
          )}
        />
      </YStack>

      {showDatePicker && (
        <DateTimePicker
          value={
            typeof control._formValues.birthDate === "string"
              ? new Date()
              : control._formValues.birthDate
          }
          mode="date"
          display="default"
          onChange={onChangeDateTime}
        />
      )}
    </>
  );
}
