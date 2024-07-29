import { View, Text, Button } from "tamagui";
import React from "react";
import { removeItem } from "@utils/AsyncStorage";
import { useRouter } from "expo-router";
import useProfile from "@utils/useProfile";
import { colors } from "globalStyles";
import { useAuth } from "@utils/useAuth";

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const { loading, error, userProfile } = useProfile();

  return (
    <View flex={1} ai={"center"} jc={"center"}>
      <Text>ProfileScreen</Text>
      <Button
        bg={"$red9"}
        onPress={logout}
        fontWeight={"bold"}
        color={colors.background.main}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}
