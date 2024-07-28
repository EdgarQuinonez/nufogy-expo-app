import { DaySummary, DiaryFoodLog } from "@types";
import calculateNutritionSummary from "@utils/nutritionSummary";
import { useAuth } from "@utils/useAuth";
import useFetch from "@utils/useFetch";
import React, { createContext, useEffect, useState } from "react";

interface FoodContextProps {
  isModalVisible: boolean;
  handleAddFoodPress: () => void;
  handleModalClose: () => void;
  foodLogs: DiaryFoodLog[];
  setFoodLogs: React.Dispatch<React.SetStateAction<DiaryFoodLog[]>>;
  daySummary: DaySummary;
  setDaySummary: React.Dispatch<React.SetStateAction<DaySummary>>; // Setter
  getDayFilteredFoodLogs: (date: Date) => DiaryFoodLog[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const FoodContext = createContext<FoodContextProps>({
  isModalVisible: false,
  handleAddFoodPress: () => {},
  handleModalClose: () => {},
  foodLogs: [],
  setFoodLogs: () => {},
  daySummary: {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    calories: 0,
    sodium: 0,
    sugar: 0,
    fiber: 0,
  },
  setDaySummary: () => {},
  getDayFilteredFoodLogs: () => [],
  selectedDate: new Date(),
  setSelectedDate: () => {},
});

const FoodContextProvider = ({ children }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [foodLogs, setFoodLogs] = useState<DiaryFoodLog[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daySummary, setDaySummary] = useState<DaySummary>({
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    calories: 0,
    sodium: 0,
    sugar: 0,
    fiber: 0,
  });

  const { authToken } = useAuth();

  const apiEndpoint = `${process.env.EXPO_PUBLIC_API_BASE_URL}/diary/logs`;
  const { value: fetchedFoodLogs } = useFetch<DiaryFoodLog[]>(
    apiEndpoint,
    { headers: { Authorization: authToken ? `Token ${authToken}` : "" } },
    [authToken]
  );

  const getDayFilteredFoodLogs = (date: Date) => {
    return foodLogs.filter((foodItem) => {
      const foodItemDate = new Date(foodItem.dateTime);
      return (
        foodItemDate.getDate() === date.getDate() &&
        foodItemDate.getMonth() === date.getMonth() &&
        foodItemDate.getFullYear() === date.getFullYear()
      );
    });
  };

  useEffect(() => {
    if (fetchedFoodLogs) {
      setFoodLogs(fetchedFoodLogs);
    }
  }, [fetchedFoodLogs]);

  useEffect(() => {
    const dayFilteredFoodLogs = getDayFilteredFoodLogs(selectedDate);
    setDaySummary(calculateNutritionSummary(dayFilteredFoodLogs));
  }, [foodLogs, selectedDate]);

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
        daySummary,
        setDaySummary,
        getDayFilteredFoodLogs,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodContextProvider };
