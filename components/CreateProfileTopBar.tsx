import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Avatar, XStack, H2, Button, View } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, ChevronLeft } from "@tamagui/lucide-icons";

const CreateProfileTopBar = () => {
  return (
    <SafeAreaView>
      <XStack
        width="100%"
        height={72}
        paddingHorizontal="$2"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor={"$colorTransparent"}
      >
        <Button chromeless>
          <ChevronLeft size={24} />
        </Button>

        <View h={24} w={24} />
      </XStack>
    </SafeAreaView>
  );
};

export default CreateProfileTopBar;
