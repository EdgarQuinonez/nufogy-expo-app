// Mifflin-St Jeor Equation

export function calculateBMR(
  age?: number,
  sex?: "male" | "female",
  weight?: number,
  height?: number
) {
  if (
    age === undefined ||
    sex === undefined ||
    weight === undefined ||
    height === undefined
  ) {
    throw new Error(
      "BMR calculation requires all parameters: age, sex, weight, and height."
    );
  }

  let bmr;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return bmr;
}

// 1.2: sedentary (little to no exercise)
// 1.375: lightly active (light exercise 1 to 3 days per week)
// 1.55: moderately active (moderate exercise 6 to 7 days per week)
// 1.725: very active (hard exercise every day, or exercising twice a day)
// 1.9: extra active (very hard exercise, training, or a physical job)

export function calculateTDEE(bmr?: number, physical_activity?: string) {
  if (bmr === undefined || physical_activity === undefined) {
    throw new Error(
      "TDEE calculation requires both BMR and physical activity."
    );
  }

  let tdee;
  switch (physical_activity) {
    case "sedentary":
      tdee = bmr * 1.2;
      break;
    case "lightly":
      tdee = bmr * 1.375;
      break;
    case "moderate":
      tdee = bmr * 1.55;
      break;
    case "very":
      tdee = bmr * 1.725;
      break;
    case "extra":
      tdee = bmr * 1.9;
      break;
    default:
      tdee = bmr * 1.2;
      break;
  }
  return tdee;
}

export function calculateRDI(
  tdee?: number,
  currentWeight?: number,
  targetWeight?: number,
  rate?: "gradual" | "moderate" | "fast"
) {
  if (
    tdee === undefined ||
    currentWeight === undefined ||
    targetWeight === undefined ||
    rate === undefined
  ) {
    throw new Error(
      "RDI calculation requires TDEE, currentWeight, targetWeight, and rate."
    );
  }

  let rdi = tdee;
  const goal = currentWeight > targetWeight ? "lose" : "gain";

  const weeklyWeightChangeGoal = { gradual: 0.5, moderate: 0.75, fast: 1 };
  const caloriesPerKg = 7700; // 1 kg of body weight is equivalent to 7700 calories

  switch (goal) {
    case "lose":
      const deficitPerWeek = weeklyWeightChangeGoal[rate] * caloriesPerKg;
      const dailyDeficit = deficitPerWeek / 7;
      rdi -= dailyDeficit;
      break;
    case "gain":
      const surplusPerWeek = weeklyWeightChangeGoal[rate] * caloriesPerKg;
      const dailySurplus = surplusPerWeek / 7;
      rdi += dailySurplus;
      break;
  }

  return rdi;
}

export function calculateMacros(
  rdi?: number,
  currentWeight?: number,
  targetWeight?: number,
  activityLevel?: "sedentary" | "lightly" | "moderate" | "very" | "extra"
) {
  if (
    rdi === undefined ||
    currentWeight === undefined ||
    targetWeight === undefined ||
    activityLevel === undefined
  ) {
    throw new Error(
      "Macro calculation requires RDI, currentWeight, targetWeight, and activityLevel."
    );
  }
  const goal = currentWeight > targetWeight ? "lose" : "gain";

  let carbPercentage, proteinPercentage, fatPercentage;
  switch (goal) {
    case "lose":
      carbPercentage = 0.35;
      proteinPercentage = 0.35;
      fatPercentage = 0.3;
      break;
    case "gain":
      carbPercentage = 0.5;
      proteinPercentage = 0.3;
      fatPercentage = 0.2;
      break;
    default:
      carbPercentage = 0.4;
      proteinPercentage = 0.3;
      fatPercentage = 0.3;
  }

  // Activity Level Adjustments
  switch (activityLevel) {
    case "sedentary":
      break;
    case "lightly":
      carbPercentage += 0.05;
      proteinPercentage += 0.025;
      fatPercentage -= 0.075;
      break;
    case "moderate":
      carbPercentage += 0.1;
      proteinPercentage += 0.05;
      fatPercentage -= 0.15;
      break;
    case "very":
      carbPercentage += 0.15;
      proteinPercentage += 0.075;
      fatPercentage -= 0.225;
      break;
    case "extra":
      carbPercentage += 0.2;
      proteinPercentage += 0.1;
      fatPercentage -= 0.3;
      break;
  }

  const totalPercentage = carbPercentage + proteinPercentage + fatPercentage;
  carbPercentage /= totalPercentage;
  proteinPercentage /= totalPercentage;
  fatPercentage /= totalPercentage;

  const caloriesPerGramCarb = 4;
  const caloriesPerGramProtein = 4;
  const caloriesPerGramFat = 9;

  const carbGrams = (rdi * carbPercentage) / caloriesPerGramCarb;
  const proteinGrams = (rdi * proteinPercentage) / caloriesPerGramProtein;
  const fatGrams = (rdi * fatPercentage) / caloriesPerGramFat;

  return {
    carbs: Math.round(carbGrams),
    protein: Math.round(proteinGrams),
    fat: Math.round(fatGrams),
  };
}
