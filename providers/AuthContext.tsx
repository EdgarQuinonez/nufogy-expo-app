import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "@utils/useStorageState";
import axios from "axios";
import { UserLoginInputs } from "@types";

const AuthContext = createContext<{
  signIn: (data: UserLoginInputs) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: UserLoginInputs) => {
          const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/api-token-auth/`;

          const response = await axios.post(apiEndpoint, {
            username: data.username.trim(),
            password: data.password.trim(),
          });

          if (response.status === 200) {
            const data = await response.data;
            const token = data.token;
            setSession(token);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
