import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { Avatar, XStack, H2, Button } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem, removeItem } from "@utils/AsyncStorage";

const TopBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, []);

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
        <H2>Nufogy</H2>
        {isLoggedIn ? (
          <Link href={"/(settings)/profile"}>
            <Avatar circular size="$6">
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Avatar circular size="$6">
              <Avatar.Image
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          </Link>
        )}
      </XStack>
    </SafeAreaView>
  );
};

export default TopBar;
