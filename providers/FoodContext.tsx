import React, { createContext, useState } from "react";

interface FoodContextProps {
  isModalVisible: boolean;
  handleAddFoodPress: () => void;
  handleModalClose: () => void;
}

const FoodContext = createContext<FoodContextProps>({
  isModalVisible: false,
  handleAddFoodPress: () => {},
  handleModalClose: () => {},
});

const FoodContextProvider = ({ children }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddFoodPress = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <FoodContext.Provider
      value={{ isModalVisible, handleAddFoodPress, handleModalClose }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export { FoodContext, FoodContextProvider };
