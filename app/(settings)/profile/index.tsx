import { View, Text, Button } from "tamagui";
import React from "react";
import { removeItem } from "@utils/AsyncStorage";
import { useRouter } from "expo-router";
import useProfile from "@utils/useProfile";
import { colors } from "globalStyles";

export default function ProfileScreen() {
  const router = useRouter();
  const { loading, error, userProfile } = useProfile();

  const handleLogout = async () => {
    try {
      await removeItem("authToken");

      router.replace("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View flex={1} ai={"center"} jc={"center"}>
      <Text>ProfileScreen</Text>
      <Button
        bg={"$red9"}
        onPress={handleLogout}
        fontWeight={"bold"}
        color={colors.background.main}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}
