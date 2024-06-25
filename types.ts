export interface UserLogin {
  username: string;
  password: string;
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginInputs {
  username: string;
  password: string;
}

export interface UserRegistrationInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FoodSearchItem {
  food_id: number;
  food_name: string;
  brand_name: string;
  food_type: string;
  food_url: string;
  food_description: string;
}
