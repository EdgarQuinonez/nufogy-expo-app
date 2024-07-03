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
} from "tamagui";
import React from "react";
import {
  ArrowLeft,
  Beef,
  CakeSlice,
  Check,
  Clock,
  Info,
  Weight,
} from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import CircularProgress from "react-native-circular-progress-indicator";
import SelectDropdown from "./SelectDropdown";

export type Props = {
  mealTypeId: string | string[] | undefined;
  foodItemId: string | string[] | undefined;
};

export default function FoodItemDetailsView({ mealTypeId, foodItemId }: Props) {
  const saveFood = () => {
    // handle food logging
  };
  return (
    <Form onSubmit={saveFood}>
      {/* Header */}
      <XStack ai={"center"} jc={"space-between"}>
        <ArrowLeft />
        <H3>Guardar Alimento</H3>
        <Check />
      </XStack>
      {/* Kcal circle and macros inputs */}
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
      {/* Kcal ratio label */}
      <XStack>
        <Info />
        <Paragraph>
          Esta porción representa un 15% de tus calorías objetivo.
        </Paragraph>
      </XStack>
      {/* Amount and unit inputs */}
      <YStack gap="$2">
        {/* Amount Input with Logo */}
        <XStack ai={"center"} jc={"flex-end"} gap={"$2"} w={"100%"}>
          <Label fontWeight={"bold"}>Cantidad</Label>
          <XStack
            px={"$2"}
            height={"$4"}
            borderRadius={"$7"}
            borderColor={"$gray11"}
            borderWidth={1}
            ai={"center"}
            jc={"center"}
            gap={"$2"}
            w={"$16"}
          >
            <Weight />

            <Input
              unstyled={true}
              keyboardType="numeric"
              placeholder={"100"}
              textAlign="center"
              w={"$7"}
            />
            {/* Select dropdown for Units*/}

            <XStack w={"$7"} blw={1}>
              <SelectDropdown />
            </XStack>
          </XStack>
        </XStack>
        {/* Meal Time Input with Logo */}
        <XStack ai={"center"} jc={"flex-end"} gap={"$2"} w={"100%"}>
          <Label fontWeight={"bold"}>Hora de Comida</Label>
          <XStack
            px={"$2"}
            height={"$4"}
            borderRadius={"$7"}
            borderColor={"$gray11"}
            borderWidth={1}
            ai={"center"}
            jc={"space-between"}
            w={"$16"}
          >
            <Clock />
            <View w={"100%"} ai={"center"} jc={"center"}>
              <Input
                unstyled={true}
                keyboardType="numeric"
                placeholder={"100"}
                textAlign="center"
                w={"100%"}
              />
            </View>
          </XStack>
        </XStack>
      </YStack>
    </Form>
  );
}
