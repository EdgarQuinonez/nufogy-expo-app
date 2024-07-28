import "../tamagui-web.css";

import { createContext, useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { Provider } from "./Provider";
import { getItem } from "@utils/AsyncStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoredValue } from "@types";
import { AuthTokenProvider } from "@providers/AuthContext";
import { ProfileProvider } from "@providers/ProfileContext";
import { FoodContextProvider } from "@providers/FoodContext";
import { useAuth } from "@utils/useAuth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { authToken } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isLoading, setIsLoading] = useState(true);
  StatusBar.setBarStyle("dark-content");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("authToken in RootLayoutNav", authToken);
        if (authToken) {
          router.replace("(tabs)");
        } else {
          router.replace("(auth)/login");
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [authToken, segments]);

  if (isLoading) {
    return null; // Return null while loading
  }

  return (
    <Provider>
      <ThemeProvider value={DefaultTheme}>
        <AuthTokenProvider>
          <ProfileProvider>
            <FoodContextProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(settings)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(addIngredientFormModal)"
                  options={{
                    headerShown: false,
                    presentation: "modal",
                  }}
                />
              </Stack>
            </FoodContextProvider>
          </ProfileProvider>
        </AuthTokenProvider>
      </ThemeProvider>
    </Provider>
  );
}
