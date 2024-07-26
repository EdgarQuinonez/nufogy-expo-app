import { useMemo } from "react";
import useProfile from "@utils/useProfile";
import {
  calculateBMR,
  calculateTDEE,
  calculateRDI,
  calculateMacros,
} from "@utils/RDIcalculator";

//
//  Custom hook to calculate RDI (Recommended Daily Intake) and macronutrient targets.
//

export interface RDIData {
  rdi: number;
  macrosTargets: {
    protein: number;
    carbs: number;
    fat: number;
  };
}
export default function useRDI(): RDIData {
  const { userProfile } = useProfile();

  const { rdi, macrosTargets } = useMemo(() => {
    const bmr = calculateBMR(
      userProfile?.age,
      userProfile?.sex,
      userProfile?.weight,
      userProfile?.height
    );
    const tdee = calculateTDEE(bmr, userProfile?.physical_activity);

    // TODO: Replace 'gradual' with actual user data for rate
    const rdi = calculateRDI(
      tdee,
      userProfile?.weight,
      userProfile?.goal,
      "gradual"
    );

    const macrosTargets = calculateMacros(
      rdi,
      userProfile?.weight,
      userProfile?.goal,
      userProfile?.physical_activity
    );

    return { rdi, macrosTargets };
  }, [userProfile]);

  return { rdi, macrosTargets };
}
