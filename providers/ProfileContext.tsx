import { UserProfile } from "@types";
import { getItem } from "@utils/AsyncStorage"; // Make sure you have AsyncStorage utils

import { createContext, useEffect, useState } from "react";

interface ProfileContextValue {
  userProfile: UserProfile | null;
  loading: boolean;
  error: any;
}

const ProfileContext = createContext<ProfileContextValue>({
  userProfile: null,
  loading: true,
  error: null,
});

const ProfileProvider = ({ children }: any) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileString = await getItem("userProfile");
        if (typeof profileString === "string") {
          const profileData = JSON.parse(profileString);
          setUserProfile(profileData);
        } else {
          // TODO: Handle the case where there's no profile in AsyncStorage (e.g., first login)
        }
      } catch (error) {
        console.error("Error fetching profile from AsyncStorage:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const contextValue = {
    userProfile,
    loading: userProfile === null,
    error: null,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
