import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // paddingHorizontal: 16,
    // paddingTop: 72,
  },
  diaryBackground: {
    backgroundColor: "#ABD3DB",
  },
  protein: {
    backgroundColor: "#EF7D7D",
  },
  carbs: {
    backgroundColor: "#41BF84",
  },
  fat: {
    backgroundColor: "#77ABD9",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#BDBDBD",
    marginHorizontal: 4,
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: "#000",
  },
});

export const colors = {
  background: {
    main: "#F1EEFE",
    accent: "#e6e3f4",
  },
  primary: "#1E1940",
  secondary: "#D485A6",
  accent: "#ABD3DB",
  circleBg: "#BDBDBD",
  text: {
    main: "#0e1101",
    dim: "#d8d1d6",
    dim1: "#898789",
  },
  protein: "#EF7D7D",
  carbohydrate: "#41BF84",
  fat: "#77ABD9",
  breakfast: "$yellow9",
  lunch: "$orange7",
  dinner: "$purple7",
};
