export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'trainer' | 'admin';
  photoUrl?: string;
  streak: number;
  level: number;
  points: number;
  xp: number;
  targetXp: number;
  onboardingCompleted: boolean;
  appState?: {
    weightHistory: WeightRecord[];
    progressPhotos: string[];
    onboardingData: any;
    notificationsEnabled: boolean;
    workoutPlans?: WorkoutPlan[];
    dietPlans?: DietPlan[];
  };
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  videoUrl: string;
  notes?: string;
  muscleGroup: string;
  completed?: boolean;
  steps?: string[];
  precautions?: string[];
  tips?: string[];
}

export interface WorkoutDay {
  dayName: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  goal: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  days: WorkoutDay[];
}

export interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time: string;
  foods: FoodItem[];
}

export interface DietDay {
  dayName: string;
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Meal[];
}

export interface DietPlan {
  id: string;
  name: string;
  goal: string;
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  days: DietDay[];
}

export interface WeightRecord {
  date: string;
  weight: number; // in kg
  bmi: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  pointsReward: number;
  participantsCount: number;
  joined: boolean;
  progress: number; // 0 to 100
  type: 'daily' | 'weekly' | 'global';
}

export interface Post {
  id: string;
  authorName: string;
  authorPhoto?: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
}

export interface Comment {
  authorName: string;
  content: string;
  timeAgo: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Supplements' | 'Equipment' | 'Apparel';
  price: number;
  rating: number;
  image: string;
  description: string;
  inStock: boolean;
  amazonUrl?: string;
  isPrime?: boolean;
  amazonChoice?: boolean;
  brandName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
