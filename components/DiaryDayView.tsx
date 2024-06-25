import React, { useEffect } from "react";
import { Paragraph, View, Text, YStack, XStack, ScrollView } from "tamagui";
import { StyleSheet } from "react-native";

export default function DiaryDayView() {
  //   useEffect(() => {
  //     const d = new Date();
  //     const nowMarker = document.querySelector(
  //       ".dayview-now-marker"
  //     ) as HTMLElement | null;
  //     const gridCellContainer = document.querySelector(
  //       ".dayview-gridcell-container"
  //     ) as HTMLElement | null;

  //     if (nowMarker && gridCellContainer) {
  //       nowMarker.style.top =
  //         (gridCellContainer.getBoundingClientRect().height / 24) *
  //           (d.getHours() + d.getMinutes() / 60) +
  //         "px";
  //     }
  //   }, []);

  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`
  );

  return (
    <View p={"$4"} maxWidth={"100%"}>
      <Paragraph pl={"$7"}>Comidas del día</Paragraph>
      <ScrollView>
        <XStack position="relative" alignItems="stretch" flex={1} pt={"$2"}>
          {/* Timestrings */}
          <YStack
            h={"auto"}
            minWidth={80}
            overflow={"hidden"}
            flex={0}
            ai={"flex-start"}
          >
            {hours.map((hour, index) => (
              <View key={index} h={80} position={"relative"}>
                <Text
                  color={"$gray10"}
                  fontSize={"$2"}
                  pos={"relative"}
                  top={-10}
                >
                  {hour}
                </Text>
              </View>
            ))}
          </YStack>
          {/* Tile Area */}
          <View flex={1} ai={"flex-start"}>
            <View
              bbw={1}
              bbc={"$gray8"}
              pos={"relative"}
              miw={"100%"}
              fd={"column"}
              verticalAlign={"top"}
            >
              {/* Grid lines */}
              <View zi={1} btw={1} btc={"$gray8"}>
                {hours.map((_, index) => (
                  <View
                    key={index}
                    h={80}
                    pos={"relative"}
                    bbw={1}
                    bbc={"$gray8"}
                  />
                ))}
              </View>
              <View
                pos={"absolute"}
                zIndex={504}
                btw={2}
                btc={"$red10"}
                left={0}
                right={8}
                pointerEvents={"none"}
              />
              <View w={8} brw={1} brc={"$red10"} />
              <View
                pos={"relative"}
                paddingHorizontal={"$4"}
                flex={1}
                brw={1}
                brc={"white"}
                overflow={"visible"}
              >
                {/* Generate grid cells dynamically. Based on meals */}
              </View>
              <View pos={"absolute"} l={0} t={0} b={0} />
            </View>
          </View>
        </XStack>
      </ScrollView>
    </View>
  );
}
