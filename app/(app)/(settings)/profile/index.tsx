import { View, Text, Button } from "tamagui";
import React from "react";
import { removeItem } from "@utils/AsyncStorage";
import { useRouter } from "expo-router";
import useProfile from "@utils/useProfile";
import { colors } from "globalStyles";
import { useSession } from "@providers/AuthContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useSession();
  const { loading, error, userProfile } = useProfile();

  const handleSignOut = () => {
    signOut();
    router.replace("/sign-in");
    router.back();
  };

  return (
    <View flex={1} ai={"center"} jc={"center"}>
      <Text>ProfileScreen</Text>
      <Button
        bg={"$red9"}
        onPress={handleSignOut}
        fontWeight={"bold"}
        color={colors.background.main}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}
