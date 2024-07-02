import { Text, YStack, Input, View } from "tamagui";
import { useRouter, useLocalSearchParams, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import FoodSearchView from "@components/FoodSearchView";
import { getItem } from "@utils/AsyncStorage";
import { StoredValue } from "@types";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "globalStyles";

export default function FoodSearchViewWrapper() {
  const [authToken, setAuthToken] = useState<StoredValue>("");

  const fetchAuthToken = async () => {
    const token = await getItem("authToken");
    setAuthToken(token);
  };

  useEffect(() => {
    fetchAuthToken();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {typeof authToken === "string" && authToken.length > 0 ? (
        <FoodSearchView authToken={authToken} />
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
}
