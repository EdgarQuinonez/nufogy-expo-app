import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Paragraph, ScrollView, View, XStack, YStack } from "tamagui";
import { globalStyles } from "globalStyles";
import { Beef, CakeSlice, X } from "@tamagui/lucide-icons";
import Avocado from "@assets/icons/Avocado";
import MonthWeekdayStrip from "@components/MonthWeekdayStrip";
import DiaryDayView from "@components/DiaryDayView";
import CircularProgress from "react-native-circular-progress-indicator";

export default function DiaryScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

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
            <DiaryDayView />
          </YStack>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
