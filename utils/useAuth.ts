import { AuthTokenContext } from "app/_layout";
import { useContext } from "react";

// Custom hook to use the AuthTokenContext
export function useAuth() {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthTokenProvider");
  }
  return context;
}
