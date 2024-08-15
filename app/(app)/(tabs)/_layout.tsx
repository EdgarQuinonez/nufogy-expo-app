import { Redirect, Tabs, useLocalSearchParams } from "expo-router";
import { Paragraph, useTheme } from "tamagui";
import { Bot, LayoutGrid, Notebook, Salad } from "@tamagui/lucide-icons";
import TopBar from "@components/TopBar";
import { hasEmptyFields, useProfile } from "@providers/ProfileContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "globalStyles";

export default function TabLayout() {
  const theme = useTheme();
  const params = useLocalSearchParams();
  const { userProfile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ ...globalStyles.container, justifyContent: "center" }}
      >
        <Paragraph>Loading...</Paragraph>
      </SafeAreaView>
    );
  }

  if (!userProfile || hasEmptyFields(userProfile)) {
    return <Redirect href="/createProfile" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        header: () => <TopBar />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <LayoutGrid color={color} />,
        }}
      />
      <Tabs.Screen
        name="diary/index"
        options={{
          title: "Diario",
          tabBarIcon: ({ color }) => <Notebook color={color} />,
        }}
      />
      <Tabs.Screen
        name="diets/index"
        options={{
          title: "Dietas",
          tabBarIcon: ({ color }) => <Salad color={color} />,
        }}
      />
      <Tabs.Screen
        name="jack/index"
        options={{
          title: "Jack",
          tabBarIcon: ({ color }) => <Bot color={color} />,
        }}
      />
    </Tabs>
  );
}
