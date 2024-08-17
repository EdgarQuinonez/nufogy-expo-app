import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Avatar, XStack, H2, Button, H4 } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import nufogyLogo from "@assets/images/nufogy_logo.png";
import {
  Cog,
  Settings,
  Settings2,
  UserCog,
  UserCog2,
} from "@tamagui/lucide-icons";
import { colors } from "globalStyles";

const nufogyLogoUri = Image.resolveAssetSource(nufogyLogo).uri;

export type Props = {
  title: string;
};

const TopBar = ({ title }: Props) => {
  return (
    <XStack
      width="100%"
      height={48}
      paddingHorizontal="$4"
      py="$2"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor={"$colorTransparent"}
    >
      <XStack gap={"$2"}>
        <Image source={{ uri: nufogyLogoUri, width: 32, height: 32 }} />
        <H4 color={colors.text.main}>{title}</H4>
      </XStack>

      <Link href={"/(app)/(settings)/profile"} asChild>
        <Button unstyled chromeless pressStyle={{ opacity: 0.5 }}>
          <Settings
            color={colors.text.main}
            pressStyle={{ opacity: 0.5, color: colors.text.dim }}
          />
        </Button>
      </Link>
    </XStack>
  );
};

export default TopBar;
