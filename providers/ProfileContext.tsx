import { UserProfile } from "@types";
import { getItem, removeItem, setItem } from "@utils/AsyncStorage";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@providers/AuthContext";

interface ProfileContextValue {
  userProfile: UserProfile | null;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextValue>({
  userProfile: null,
  isLoading: true,
});

export function useProfile() {
  const value = useContext(ProfileContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function ProfileProvider({ children }: any) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { session } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = (await getItem(
          "userProfile"
        )) as UserProfile | null;
        if (profileData) {
          setUserProfile(profileData);
        } else {
          // Handle first login (In case profile is found in server)

          const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/profile/get`;
          const response = await axios.get(apiEndpoint, {
            headers: {
              Authorization: `Token ${session}`,
            },
          });

          if (response.status === 200) {
            const profileData = response.data;

            await setItem("userProfile", profileData);
            setUserProfile(profileData);
          }
        }
      } catch (error) {
        console.error("Error fetching profile from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const contextValue = {
    userProfile,
    isLoading,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}
