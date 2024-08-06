import { createContext, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, InferType, ObjectSchema, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSegments } from "expo-router";
import { physical_activity } from "@types";

interface WeightData {
  weight: number;
}

interface HeightData {
  height: number;
}

interface GoalData {
  goal: number;
}

interface ActivityLevelData {
  activityLevel: physical_activity;
}

interface AgeData {
  age: number;
}

interface SexData {
  sex: string;
}

type FormData =
  | WeightData
  | HeightData
  | GoalData
  | ActivityLevelData
  | AgeData
  | SexData;

interface FormContextValue {
  methods: ReturnType<typeof useForm<FormData>>;
  step: number;
  nextScreen: string;
}
const FormDataContext = createContext<FormContextValue | undefined>(undefined);

const profileSchemas: ObjectSchema<FormData>[] = [
  object({
    weight: number()
      .required("Weight is required")
      .min(1, "Weight must be at least 1")
      .max(300, "Weight must be at most 300"),
  }),
  object({
    height: number()
      .required("Height is required")
      .min(1, "Height must be at least 1")
      .max(300, "Height must be at most 300"),
  }),
  object({
    goal: number()
      .required("Goal is required")
      .min(1, "Goal must be at least 1")
      .max(300, "Goal must be at most 300"),
  }),
  object({
    activityLevel: mixed<physical_activity>()
      .oneOf(["sedentary", "lightly", "moderate", "very", "extra"])
      .required("Please select an activity level"),
  }),
  object({
    age: number()
      .required("Age is required")
      .min(1, "Age must be at least 1")
      .max(120, "Age must be at most 120"),
  }),
  object({
    sex: string().required("Please select a sex"),
  }),
];

export function useFormData() {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }

  return context;
}

export const FormDataProvider = ({ children }: PropsWithChildren) => {
  const segments = useSegments();

  let step;
  let nextScreen;
  switch (segments[2]) {
    case "weight":
      step = 1;
      nextScreen = "/createProfile/(content)/height";
      break;
    case "height":
      step = 2;
      nextScreen = "/createProfile/(content)/goal";
      break;
    case "goal":
      step = 3;
      nextScreen = "/createProfile/(content)/activityLevel";
      break;
    case "activityLevel":
      step = 4;
      nextScreen = "/createProfile/(content)/age";
      break;
    case "age":
      step = 5;
      nextScreen = "/createProfile/(content)/sex";
      break;
    case "sex":
      step = 6;
      nextScreen = "/createProfile/(content)/thankYou";
      break;
    case "thankYou":
      step = 7;
      nextScreen = "/";
      break;
    default:
      step = 1;
      nextScreen = "/createProfile/(content)/height";
  }

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchemas[step - 1]),
  });

  return (
    <FormDataContext.Provider value={{ methods, step, nextScreen }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
