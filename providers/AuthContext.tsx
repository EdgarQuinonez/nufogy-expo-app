import React, { createContext, useEffect, useState } from "react";
import { getItem, removeItem, setItem } from "@utils/AsyncStorage";
import { StoredValue } from "@types";
import { useRouter } from "expo-router";

export interface AuthContextType {
  authToken: StoredValue;
  setAuthToken: (newToken: StoredValue) => void;
  logout: () => Promise<void>;
}

const AuthTokenContext = createContext<AuthContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: async () => {},
});

interface AuthTokenProviderProps {
  children: React.ReactNode;
  // authToken?: StoredValue;
}

const AuthTokenProvider: React.FC<AuthTokenProviderProps> = ({
  children,
  // authToken: initialAuthToken = null,
}) => {
  const [authToken, setAuthToken] = useState<StoredValue>(null);
  const router = useRouter();

  // Load initial state from AsyncStorage on mount
  useEffect(() => {
    const loadAuthToken = async () => {
      try {
        const storedToken = await getItem("authToken");
        console.log("storedToken", storedToken);
        if (storedToken) {
          setAuthToken(storedToken);
        }
      } catch (error) {
        console.error("Error loading authToken:", error);
      }
    };

    loadAuthToken();
  }, []);

  // Save to AsyncStorage whenever authToken changes
  useEffect(() => {
    const saveAuthToken = async () => {
      try {
        console.log("authToken", authToken);
        if (authToken) {
          await setItem("authToken", authToken);
        } else {
          await removeItem("authToken");
        }
      } catch (error) {
        console.error("Error saving authToken:", error);
      }
    };

    saveAuthToken();
  }, [authToken]);

  const logout = async () => {
    setAuthToken(null);

    router.replace("/(auth)/login");
    router.back();
  };

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken, logout }}>
      {children}
    </AuthTokenContext.Provider>
  );
};

export { AuthTokenContext, AuthTokenProvider };
