
export interface Machine {
  id: number;
  name: string;
  subName: string;
  mainZone: string;
  secondaryMuscles: string[];
}

export interface Food {
  name: string;
  value: string;
  special: string;
  type: 'proteina' | 'carbo' | 'grasa';
}

export interface UserProfile {
  name: string;
  goal: 'Fuerza' | 'Hipertrofia' | 'Resistencia' | 'Pérdida de peso';
  gender: 'Hombre' | 'Mujer';
  age: number;
  weight: number;
  height: number;
  frequency: number;
  equipment?: string[];
}

export type ViewType = 'welcome' | 'onboarding' | 'dashboard' | 'workout' | 'progress' | 'social' | 'edit' | 'bot' | 'protocol_hub' | 'calculator' | 'food_db' | 'plan_generator' | 'exercise_detail' | 'inventory' | 'glossary' | 'habits' | 'bio_hacking';

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    squad?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  type: 'achievement' | 'discussion';
  imageUrl?: string;
  metrics?: string;
}

export interface ExerciseSet {
  id: number;
  kg: number;
  reps: number;
  completed: boolean;
  lastWeight?: number;
}

export interface Exercise {
  id: string;
  name: string;
  subName: string;
  zone: string;
  setsCount: number;
  technique: string;
}
