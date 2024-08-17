import TopBar from "@components/TopBar";
import React from "react";
import { Paragraph, View } from "tamagui";

export default function JackScreen() {
  return (
    <View>
      <TopBar title="Jack: Asistente Virtual" />
      <Paragraph>Jack Screen</Paragraph>
    </View>
  );
}
