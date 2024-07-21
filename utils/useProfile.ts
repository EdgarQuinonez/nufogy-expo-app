import { useContext } from "react";
import { ProfileContext } from "@providers/ProfileContext"; // Update the path as needed

const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export default useProfile;
