import { Tabs } from "expo-router";
import { useTheme } from "tamagui";
import { Bot, LayoutGrid, Notebook, Salad } from "@tamagui/lucide-icons";
import TopBar from "@components/TopBar";

export default function TabLayout() {
  const theme = useTheme();

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
