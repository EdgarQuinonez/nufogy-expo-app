import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Avatar, XStack, H2, Button } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import nufogyLogo from "@assets/images/nufogy_logo.png";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

const TopBar = () => {
  return (
    <XStack
      width="100%"
      height={72}
      paddingHorizontal="$2"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={"$colorTransparent"}
      pos={"absolute"}
      top={0}
      left={0}
      right={0}
      zIndex={1}
    >
      <Image source={{ uri: nufogyLogoUri, width: 48, height: 48 }} />

      <Link href={"/(app)/(settings)/profile"}>
        <Avatar circular size="$6">
          <Avatar.Image
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
      </Link>
    </XStack>
  );
};

export default TopBar;
