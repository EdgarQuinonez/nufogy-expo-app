import "../tamagui-web.css";

import { createContext, useEffect, useState } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "./Provider";
import { getItem } from "@utils/AsyncStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StoredValue } from "@types";

export const AuthTokenContext = createContext<StoredValue>(null);

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<StoredValue>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      StatusBar.setBarStyle("dark-content");
      try {
        const authToken = await getItem("authToken");
        setIsAuthenticated(!!authToken);
        if (!!authToken) {
          setAuthToken(authToken);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Provider>
      <ThemeProvider value={DefaultTheme}>
        {isAuthenticated ? (
          <AuthTokenContext.Provider value={authToken}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </AuthTokenContext.Provider>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        )}
      </ThemeProvider>
    </Provider>
  );
}
