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
} from "tamagui";
import React, { useState } from "react";
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
import { format } from "date-fns";
import ProjectedProgressBar from "./ProjectedProgressBar";
import { useRouter } from "expo-router";

export type Props = {
  mealTypeId: string | string[] | undefined;
  foodItemId: string | string[] | undefined;
};

export default function FoodItemDetailsView({ mealTypeId, foodItemId }: Props) {
  const [dateTime, setDateTime] = useState(new Date()); // Store the selected date and time
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of the picker

  const router = useRouter();

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

  return (
    <Form onSubmit={saveFood} px={"$2"} flex={1}>
      <YStack f={1} jc={"space-between"}>
        {/* Content */}
        <View>
          {/* Header */}
          <XStack ai={"center"} jc={"space-between"} w={"100%"} py={"$2"}>
            <ArrowLeft />
            <H3>Guardar Alimento</H3>
            <Check />
          </XStack>
          <H4 alignSelf="flex-start" py={"$4"} color={"$color12"}>
            Pollo a la plancha
          </H4>
          {/* Kcal circle and macros inputs */}
          <XStack ai={"center"} justifyContent={"space-between"} pb={"$2"}>
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
              Esta porción representa un 15% de tus calorías objetivo.
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
                    placeholder={"100"}
                    px={"$2"}
                  />
                </XStack>
                {/* Select dropdown for Units*/}

                <XStack
                  ai={"center"}
                  jc={"center"}
                  w={"$7"}
                  blw={1}
                  borderColor={"$color11"}
                >
                  <SelectDropdown />
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
            gap={"$2"}
            pb={"$2"}
          >
            {/* <Paragraph alignSelf="flex-start" size={"$5"} fontWeight={"bold"}>
              Micronutrientes destacados
            </Paragraph>
          */}
            <YStack ai={"center"} jc={"flex-start"} w={"100%"} gap={"$1"}>
              <XStack
                ai={"center"}
                jc={"flex-start"}
                w={"100%"}
                maxWidth={"100%"}
              >
                <Paragraph
                  fontWeight={"bold"}
                  w={"$5"}
                  textAlign="right"
                  pr={"$2"}
                >
                  Sodio
                </Paragraph>
                <ProjectedProgressBar
                  currentProgress={0.5}
                  projectedProgress={0.7}
                />
                <XStack ai={"center"} jc={"center"} gap={"$1"}>
                  <XStack>
                    <Paragraph>+</Paragraph>
                    <Paragraph fontWeight={"bold"}>999</Paragraph>
                  </XStack>
                  <Paragraph>mg</Paragraph>
                </XStack>
              </XStack>

              <XStack
                ai={"center"}
                jc={"flex-start"}
                w={"100%"}
                maxWidth={"100%"}
              >
                <Paragraph
                  fontWeight={"bold"}
                  w={"$5"}
                  textAlign="right"
                  pr={"$2"}
                >
                  Azúcar
                </Paragraph>
                <ProjectedProgressBar
                  currentProgress={0.5}
                  projectedProgress={0.7}
                />
                <XStack ai={"center"} jc={"center"} gap={"$1"}>
                  <XStack>
                    <Paragraph>+</Paragraph>
                    <Paragraph fontWeight={"bold"}>999</Paragraph>
                  </XStack>
                  <Paragraph>mg</Paragraph>
                </XStack>
              </XStack>

              <XStack
                ai={"center"}
                jc={"flex-start"}
                w={"100%"}
                maxWidth={"100%"}
              >
                <Paragraph
                  fontWeight={"bold"}
                  w={"$5"}
                  textAlign="right"
                  pr={"$2"}
                >
                  Fibra
                </Paragraph>
                <ProjectedProgressBar
                  currentProgress={0.5}
                  projectedProgress={0.7}
                />
                <XStack ai={"center"} jc={"center"} gap={"$1"}>
                  <XStack>
                    <Paragraph>+</Paragraph>
                    <Paragraph fontWeight={"bold"}>999</Paragraph>
                  </XStack>
                  <Paragraph>mg</Paragraph>
                </XStack>
              </XStack>
            </YStack>
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
              recuerda variar tus fuentes de proteína para asegurar una ingesta
              equilibrada de nutrientes.
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
