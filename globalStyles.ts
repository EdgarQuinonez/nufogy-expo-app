import { StyleSheet } from "react-native";

export const colors = {
  background: {
    main: "#F1EEFE",
    accent: "#E0DBF8",
    diary: "#ABD3DB",
  },
  primary: "#1E1940",
  secondary: "#D485A6",
  accent: "#6847fd",
  circleBg: "#E0E0E0",
  text: {
    main: "#343434",
    dim: "#d8d1d6",
    dim1: "#898789",
  },
  protein: "#EF7D7D",
  carbohydrate: "#41BF84",
  fat: "#77ABD9",
  breakfast: "$yellow9",
  lunch: "$orange7",
  dinner: "$purple7",
  sedentary: "#EDA285",
  lightly: "#E4D584",
  moderate: "#B8EAA6",
  very: "#A7B8F2",
  extra: "#C691FB",
  error: "#e86b6b",
  femaleGender: "#D6409F",
  maleGender: "#77ABD9",
};
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
    marginHorizontal: 4,
    backgroundColor: colors.circleBg,
  },

  activeDot: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: colors.text.main,
  },
});
