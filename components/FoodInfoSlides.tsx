// FoodInfoSlides.tsx
import { globalStyles } from "globalStyles";
import React, { useState } from "react";
import { Dimensions } from "react-native"; // Import from React Native
import { View, ScrollView, XStack } from "tamagui";

interface FoodInfoSlidesProps {
  slides: React.ReactNode[];
}

const FoodInfoSlides: React.FC<FoodInfoSlidesProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideWidth = Dimensions.get("window").width;

  const handleScroll = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setActiveIndex(newIndex);
  };

  return (
    <View ai={"center"} jc={"center"}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // For performance on older devices
      >
        {slides.map((slide, index) => (
          <View
            key={index}
            ai={"center"}
            jc={"center"}
            w={slideWidth}
            px={"$2"}
          >
            {slide}
          </View>
        ))}
      </ScrollView>

      <XStack py={"$2"}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              globalStyles.dot,
              index === activeIndex ? globalStyles.activeDot : null,
            ]}
          />
        ))}
      </XStack>
    </View>
  );
};

export default FoodInfoSlides;
