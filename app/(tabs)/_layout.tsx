import { Tabs } from "expo-router";
import { useTheme } from "tamagui";
import { Atom, Bot, LayoutGrid, Notebook, Salad } from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.red10.val,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <LayoutGrid color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="diary/index"
        options={{
          title: "Diario",
          tabBarIcon: ({ color }) => <Notebook color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="diets/index"
        options={{
          title: "Dietas",
          tabBarIcon: ({ color }) => <Salad color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="jack/index"
        options={{
          title: "Jack",
          tabBarIcon: ({ color }) => <Bot color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
