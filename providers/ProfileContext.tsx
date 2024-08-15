import { UserProfile } from "@types";
import { getItem, removeItem, setItem } from "@utils/AsyncStorage";
import axios, { isAxiosError } from "axios";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@providers/AuthContext";

interface ProfileContextValue {
  userProfile: UserProfile | null;
  isLoading: boolean;
  profileKey: string | null;
}

const ProfileContext = createContext<ProfileContextValue>({
  userProfile: null,
  isLoading: true,
  profileKey: null,
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
  const { session, isLoading: sessionIsLoading } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [profileKey, setProfileKey] = useState<string | null>(null);
  console.log("session", session);
  console.log("sessionIsLoading", sessionIsLoading);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session) {
        try {
          const newProfileKey = `userProfile_${session}`;
          setProfileKey(newProfileKey);

          const profileData = (await getItem(
            newProfileKey
          )) as UserProfile | null;
          if (profileData) {
            setUserProfile(profileData);
          } else {
            const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/profile/get`;
            const response = await axios.get(apiEndpoint, {
              headers: {
                Authorization: `Token ${session}`,
              },
            });

            if (response.status === 200) {
              const profileData = response.data;

              await setItem(newProfileKey, profileData);
              setUserProfile(profileData);
            }
          }
        } catch (error) {
          if (isAxiosError(error)) {
            console.error(
              "Error fetching profile from server:",
              error.response?.data
            );
          } else {
            console.error(
              "Error fetching profile from AsyncStorage or other:",
              error
            );
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [session, sessionIsLoading]);

  const contextValue = {
    userProfile,
    isLoading,
    profileKey,
  };

  return session && !sessionIsLoading ? (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  ) : null;
}

export function hasEmptyFields(userProfile: UserProfile): boolean {
  const fieldsToCheck: (keyof UserProfile)[] = [
    "weight",
    "height",
    "goal",
    "physical_activity",
    "age",
    "sex",
  ];

  for (const field of fieldsToCheck) {
    if (userProfile[field] === undefined || userProfile[field] === null) {
      return true;
    }
  }

  return false;
}
