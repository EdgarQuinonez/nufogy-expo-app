import { AuthTokenContext } from "@providers/AuthContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthTokenProvider");
  }
  return context;
}
