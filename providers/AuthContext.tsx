import { StoredValue } from "@types";
import { getItem } from "@utils/AsyncStorage";
import { createContext, useEffect, useState } from "react";

const AuthTokenContext = createContext<StoredValue>(null);

const AuthTokenProvider = ({ children }: any) => {
  const [authToken, setAuthToken] = useState<StoredValue>(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const authToken = await getItem("authToken");

        if (!!authToken) {
          setAuthToken(authToken);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setAuthToken(null);
      }
    };
    fetchAuthToken();
  }, []);

  return (
    <AuthTokenContext.Provider value={authToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};

export { AuthTokenContext, AuthTokenProvider };
