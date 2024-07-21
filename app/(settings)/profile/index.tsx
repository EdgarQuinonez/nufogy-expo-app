import { View, Text, Button } from "tamagui";
import React from "react";
import { removeItem } from "@utils/AsyncStorage";
import { useRouter } from "expo-router";
import useProfile from "@utils/useProfile";

export default function ProfileScreen() {
  const router = useRouter();
  const { loading, error, profile } = useProfile();

  console.log(profile);

  const handleLogout = async () => {
    try {
      await removeItem("authToken");

      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View flex={1} ai={"flex-start"} jc={"center"}>
      <Text>ProfileScreen</Text>
      <Button onPress={handleLogout}>Cerrar sesión</Button>
    </View>
  );
}
