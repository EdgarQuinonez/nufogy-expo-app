import { useContext } from "react";
import { AuthTokenContext, AuthContextType } from "@providers/AuthContext";

export function useAuth(): AuthContextType {
  const context = useContext(AuthTokenContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthTokenProvider");
  }

  return context;
}
