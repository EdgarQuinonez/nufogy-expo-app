import { DiaryFoodLog } from "@types";
import { useAuth } from "@utils/useAuth";
import useFetch from "@utils/useFetch";
import React, { createContext, useEffect, useState } from "react";

interface FoodContextProps {
  isModalVisible: boolean;
  handleAddFoodPress: () => void;
  handleModalClose: () => void;
  foodLogs: DiaryFoodLog[];
  setFoodLogs: React.Dispatch<React.SetStateAction<DiaryFoodLog[]>>;
}

const FoodContext = createContext<FoodContextProps>({
  isModalVisible: false,
  handleAddFoodPress: () => {},
  handleModalClose: () => {},
  foodLogs: [],
  setFoodLogs: () => {},
});

const FoodContextProvider = ({ children }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foodLogs, setFoodLogs] = useState<DiaryFoodLog[]>([]);
  const authToken = useAuth();

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs`;
  const { value: fetchedFoodLogs } = useFetch<DiaryFoodLog[]>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  useEffect(() => {
    if (fetchedFoodLogs) {
      setFoodLogs(fetchedFoodLogs);
    }
  }, [fetchedFoodLogs]);

  const handleAddFoodPress = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <FoodContext.Provider
      value={{
        isModalVisible,
        handleAddFoodPress,
        handleModalClose,
        foodLogs,
        setFoodLogs,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodContextProvider };
