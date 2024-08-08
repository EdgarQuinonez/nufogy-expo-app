import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import {
  object,
  string,
  number,
  InferType,
  ObjectSchema,
  mixed,
  date,
  boolean,
} from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSegments } from "expo-router";
import { physical_activity } from "@types";
import { parse } from "date-fns";

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
  birthDate: Date;
}

interface SexData {
  sex: string;
}

export type FormData =
  | WeightData
  | HeightData
  | GoalData
  | ActivityLevelData
  | AgeData
  | SexData
  | { thankYou: boolean };

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
    birthDate: date()
      .transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .typeError("please enter a valid date")
      .required()
      .min("1900-11-13", "Date is too early"),
  }),
  object({
    sex: string().required("Please select a sex"),
  }),
  object({
    thankYou: boolean().default(true),
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
  const [step, setStep] = useState<number>(1);
  const [nextScreen, setNextScreen] = useState<string>(
    "/createProfile/(content)/height"
  );

  const defaultValues = {
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    birthDate: "",
    sex: "",
    thankYou: true,
  };

  const methods = useForm({
    shouldUnregister: false,
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(profileSchemas[step - 1]),
  });

  useEffect(() => {
    switch (segments[2]) {
      case "weight":
        setStep(1);
        setNextScreen("/createProfile/(content)/height");
        break;
      case "height":
        setStep(2);
        setNextScreen("/createProfile/(content)/goal");
        break;
      case "goal":
        setStep(3);
        setNextScreen("/createProfile/(content)/activityLevel");
        break;
      case "activityLevel":
        setStep(4);
        setNextScreen("/createProfile/(content)/birthDate");
        break;
      case "birthDate":
        setStep(5);
        setNextScreen("/createProfile/(content)/sex");
        break;
      case "sex":
        setStep(6);
        setNextScreen("/createProfile/(content)/thankYou");
        break;
      case "thankYou":
        setStep(7);
        setNextScreen("/");
        break;
      default:
        setStep(1);
        setNextScreen("/createProfile/(content)/height");
    }
  }, [segments]);

  return (
    <FormDataContext.Provider value={{ methods, step, nextScreen }}>
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
