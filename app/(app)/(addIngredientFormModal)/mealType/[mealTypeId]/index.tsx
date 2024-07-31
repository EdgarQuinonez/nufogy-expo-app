import FoodSearchView from "@components/FoodSearchView";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "globalStyles";
import { KeyboardAvoidingView } from "react-native";

export default function FoodSearchViewWrapper() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView>
        <FoodSearchView />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
