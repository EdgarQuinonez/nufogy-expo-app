import { getItem } from "@utils/AsyncStorage";
import { useAuth } from "@utils/useAuth";
import useFetch from "@utils/useFetch";
import { createContext, useEffect, useState } from "react";

interface ProfileContextValue {
  profile: any | null;
  loading: boolean;
  error: any;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: null,
  loading: true,
  error: null,
});

const ProfileProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<any>(null);
  const authToken = useAuth();
  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/users/account/profile/get`;

  const {
    loading,
    error,
    value: userProfile,
  } = useFetch(apiEndpoint, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
