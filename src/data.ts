import { User, WorkoutPlan, DietPlan, Challenge, Post, Product } from './types';

export const INITIAL_USER: User = {
  id: 'user_01',
  name: 'Kundan Saduyashwanth',
  email: 'kundansaduyashwanth@gmail.com',
  role: 'client',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  streak: 5,
  level: 4,
  points: 450,
  xp: 1250,
  targetXp: 3000,
  onboardingCompleted: true
};

export const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp_shred',
    name: '3D Hypertrophy & Shred',
    goal: 'Build muscle size and define body shape with aesthetic precision',
    difficulty: 'Intermediate',
    durationWeeks: 6,
    days: [
      {
        dayName: 'Day 1 — Upper Body Aesthetics',
        exercises: [
          {
            name: 'Incline Dumbbell Press',
            sets: 4,
            reps: '8-10',
            restSeconds: 90,
            videoUrl: 'https://www.youtube.com/watch?v=0G2_XP7VyG8',
            notes: 'Focus on maximum chest squeeze at the top and slow control down.',
            muscleGroup: 'Chest'
          },
          {
            name: 'Lat Pulldowns (Wide-grip)',
            sets: 4,
            reps: '10-12',
            restSeconds: 75,
            videoUrl: 'https://www.youtube.com/watch?v=SALxVKVe9zo',
            notes: 'Pull with your elbows, keep chest high, feel the lats widen.',
            muscleGroup: 'Back'
          },
          {
            name: 'Dumbbell Lateral Raises',
            sets: 4,
            reps: '15-20',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=WJm9zA36co0',
            notes: 'Tilt pinkies up slightly. Control the negative — do not swing!',
            muscleGroup: 'Shoulders'
          },
          {
            name: 'Incline Dumbbell Bicep Curl',
            sets: 3,
            reps: '10-12',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=soxrdi1qS88',
            notes: 'Sit on a 45-degree decline to fully stretch the long bicep head.',
            muscleGroup: 'Biceps'
          },
          {
            name: 'Tricep Rope Overhead Press',
            sets: 3,
            reps: '12-15',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=ns-WG95H14I',
            notes: 'Keep elbows tucked near your temples to isolate the long head.',
            muscleGroup: 'Triceps'
          }
        ]
      },
      {
        dayName: 'Day 2 — Quad & Calf Focus',
        exercises: [
          {
            name: 'Barbell Back Squats',
            sets: 4,
            reps: '6-8',
            restSeconds: 120,
            videoUrl: 'https://www.youtube.com/watch?v=ultWZbUM_s8',
            notes: 'Explode up from the parallel state. Maintain core tightness.',
            muscleGroup: 'Quads'
          },
          {
            name: 'Walking Dumbbell Lunges',
            sets: 3,
            reps: '12 steps/leg',
            restSeconds: 90,
            videoUrl: 'https://www.youtube.com/watch?v=D7KaRcUTQeE',
            notes: 'Step forward deliberately, lowering until back knee almost grazes mat.',
            muscleGroup: 'Quads'
          },
          {
            name: 'Standing Calf Raises',
            sets: 4,
            reps: '15-20',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=N3_v6xO_P6Q',
            notes: 'Pause at the peak concentric contraction and hold for 1 second.',
            muscleGroup: 'Calves'
          }
        ]
      },
      {
        dayName: 'Day 3 — Back Posterior & Core',
        exercises: [
          {
            name: 'Conventional Barbell Deadlifts',
            sets: 3,
            reps: '5',
            restSeconds: 150,
            videoUrl: 'https://www.youtube.com/watch?v=op9kVnSyy6I',
            notes: 'Power through the feet, keep the bar scraping close to your shins.',
            muscleGroup: 'Back'
          },
          {
            name: 'Hanging Leg Raises',
            sets: 3,
            reps: '15',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=3RnyNHe9s04',
            notes: 'Raise legs to parallel or higher without using body momentum.',
            muscleGroup: 'Core'
          },
          {
            name: 'Plank Hold (Max Duration)',
            sets: 3,
            reps: '60s-90s',
            restSeconds: 60,
            videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw',
            notes: 'Squeeze glutes, push floor away through elbows, keep straight spine.',
            muscleGroup: 'Core'
          }
        ]
      }
    ]
  },
  {
    id: 'wp_beg_gain',
    name: 'Beginner Aesthetic Foundation',
    goal: 'Set perfect fundamental movements and initial strength adaptations',
    difficulty: 'Beginner',
    durationWeeks: 8,
    days: [
      {
        dayName: 'Day 1 — Full Body Push & Pull',
        exercises: [
          {
            name: 'Goblet Squat',
            sets: 3,
            reps: '10-12',
            restSeconds: 90,
            videoUrl: 'https://www.youtube.com/watch?v=mC6g8588048',
            notes: 'Hold kettlebell/dumbbell close to your collarbones. Push through heels.',
            muscleGroup: 'Quads'
          },
          {
            name: 'Push-Ups (Standard or Incline)',
            sets: 3,
            reps: '8-12',
            restSeconds: 75,
            videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
            notes: 'Lower body as a solid unit. Squeeze chest on the way up.',
            muscleGroup: 'Chest'
          },
          {
            name: 'Bent-Over Dumbbell Row',
            sets: 3,
            reps: '10',
            restSeconds: 75,
            videoUrl: 'https://www.youtube.com/watch?v=6g8eJ_of_S4',
            notes: 'Keep back flat parallel to the ground. Drive elbows back.',
            muscleGroup: 'Back'
          }
        ]
      }
    ]
  }
];

export const DIET_PLANS: DietPlan[] = [
  {
    id: 'dp_lean_mass',
    name: 'High-Prot Hyper Lean Mass',
    goal: 'Target optimized lean muscle expansion with minimal body fat storage',
    dailyGoals: {
      calories: 2600,
      protein: 165,
      carbs: 280,
      fat: 70
    },
    days: [
      {
        dayName: 'Today\'s Meal Structure',
        date: 'May 28',
        totalCalories: 2470,
        totalProtein: 162,
        totalCarbs: 275,
        totalFat: 68,
        meals: [
          {
            type: 'breakfast',
            time: '08:00 AM',
            foods: [
              { name: 'Fluffy Oatmeal Oats', quantity: '80g dry', calories: 300, protein: 11, carbs: 54, fat: 5 },
              { name: 'Fresh Whey Scoop (Vanilla)', quantity: '1 scoop (30g)', calories: 120, protein: 25, carbs: 2, fat: 1 },
              { name: 'Organic Blueberries', quantity: '50g', calories: 30, protein: 0.5, carbs: 7.5, fat: 0.1 },
              { name: 'Whole Eggs (Scrambled)', quantity: '2 medium', calories: 140, protein: 12, carbs: 1, fat: 10 }
            ]
          },
          {
            type: 'lunch',
            time: '01:00 PM',
            foods: [
              { name: 'Grilled Herb Chicken Breast', quantity: '200g', calories: 290, protein: 54, carbs: 0, fat: 6 },
              { name: 'Fragrant Steamed Basmati Rice', quantity: '150g cooked', calories: 195, protein: 4, carbs: 43, fat: 0.5 },
              { name: 'Fresh Steamed Broccoli & Carrots', quantity: '100g', calories: 45, protein: 2.5, carbs: 8, fat: 0.2 },
              { name: 'Organic Cold-Pressed Olive Oil', quantity: '1 tsp', calories: 40, protein: 0, carbs: 0, fat: 4.5 }
            ]
          },
          {
            type: 'snack',
            time: '04:30 PM (Pre/Post Workout)',
            foods: [
              { name: 'Sweet Fresh Cavendish Banana', quantity: '1 large', calories: 110, protein: 1.5, carbs: 28, fat: 0.3 },
              { name: 'Pure Greek Yogurt 0% Fat', quantity: '150g', calories: 90, protein: 15, carbs: 5, fat: 0 },
              { name: 'Natural Crunchy Peanut Butter', quantity: '1 tbsp', calories: 90, protein: 3.5, carbs: 3, fat: 8 }
            ]
          },
          {
            type: 'dinner',
            time: '08:30 PM',
            foods: [
              { name: 'Wild Norwegian Salmon Fillet', quantity: '160g cooked', calories: 320, protein: 32, carbs: 0, fat: 20 },
              { name: 'Roasted Spiced Sweet Potatoes', quantity: '180g', calories: 160, protein: 3, carbs: 37, fat: 0.2 },
              { name: 'Mixed Leafy Green Salad', quantity: '1 big bowl', calories: 30, protein: 1, carbs: 5, fat: 0.2 },
              { name: 'Raw Natural Walnuts', quantity: '15g', calories: 90, protein: 2.5, carbs: 2, fat: 9 }
            ]
          }
        ]
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch_squats',
    title: 'Daily Squat Commando',
    description: 'Perform 100 bodyweight squats to stimulate circulation and lower-body fast-twitch fibers.',
    xpReward: 150,
    pointsReward: 35,
    participantsCount: 342,
    joined: true,
    progress: 40,
    type: 'daily'
  },
  {
    id: 'ch_steps',
    title: 'Step Master Pro Walk',
    description: 'Hit exactly 10,000 steps tracking clean posture and fluid breathing cycles across the week.',
    xpReward: 350,
    pointsReward: 80,
    participantsCount: 1105,
    joined: false,
    progress: 0,
    type: 'weekly'
  },
  {
    id: 'ch_water',
    title: 'H2O Hydro Warrior',
    description: 'Drink 8 comprehensive glasses (2L+) of pure water every single day for the entire calendar week.',
    xpReward: 250,
    pointsReward: 50,
    participantsCount: 894,
    joined: true,
    progress: 71, // 5 out of 7 days
    type: 'weekly'
  },
  {
    id: 'ch_meditation',
    title: 'Mind-Muscle Resonance',
    description: 'Perform three 3D meditation session elements at 10 minutes depth each.',
    xpReward: 500,
    pointsReward: 120,
    participantsCount: 204,
    joined: false,
    progress: 0,
    type: 'global'
  }
];

export const INITIAL_LEADERBOARD = [
  { rank: 1, name: 'Alex Harrison', score: 3820, points: 840, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop' },
  { rank: 2, name: 'Seraphina Vance', score: 3410, points: 720, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
  { rank: 3, name: 'Kundan Saduyashwanth', score: 2850, points: 450, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', isUser: true },
  { rank: 4, name: 'Marcus Sterling', score: 2600, points: 510, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' },
  { rank: 5, name: 'Elena Rostova', score: 2120, points: 390, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' }
];

export const SHOP_PRODUCTS: Product[] = [
  {
    id: 'p_protein',
    name: 'Hydrolyzed Pure Whey Isolate',
    category: 'Supplements',
    price: 64.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=400&auto=format&fit=crop',
    description: 'Micro-filtered premium isolate, 27g protein per scoop, ultra-fast digestion and recovery synthesis.',
    inStock: true
  },
  {
    id: 'p_dumbbells',
    name: 'Interactive Adjustable Dumbbells',
    category: 'Equipment',
    price: 349.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?q=80&w=400&auto=format&fit=crop',
    description: 'Aesthetic matte compact handles offering seamless selector dial weights from 2.5kg up to 24kg.',
    inStock: true
  },
  {
    id: 'p_preworkout',
    name: 'Nitric-Oxide Volumizer Pre-Workout',
    category: 'Supplements',
    price: 44.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=400&auto=format&fit=crop',
    description: 'Intense mental focus booster, explosive vasodilation, zero-crashes, sugar-free energetic mix.',
    inStock: true
  },
  {
    id: 'p_bands',
    name: 'Multi-Resistance Band Kit',
    category: 'Equipment',
    price: 19.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    description: 'Set of 5 heavy latex bands, dynamic resistance ranges 5-25kg, complete with smart carry case.',
    inStock: true
  },
  {
    id: 'p_shirt',
    name: 'FitSphere Dry-Fit Pro Tee',
    category: 'Apparel',
    price: 29.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400&auto=format&fit=crop',
    description: 'High elasticity, moisture-wicking synthetic fiber blend designed to keep joints warm and torso dry.',
    inStock: true
  }
];

export const INITIAL_FEED: Post[] = [
  {
    id: 'post_1',
    authorName: 'Coach Harrison',
    authorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
    timeAgo: '4 hours ago',
    content: 'Just analyzed Kundan\'s Incline Dumbbell push posture using our computer vision Form Analyzer. The lateral alignment is pristine! Next time, focus on bringing the dumbbells 2 inches lower at bottom eccentric for absolute chest fiber recruitment. Keep pushing!',
    likes: 18,
    liked: false,
    comments: [
      { authorName: 'Elena Rostova', content: 'Great tips coach! Form is indeed everything.', timeAgo: '3 hours ago' },
      { authorName: 'Marcus Sterling', content: 'I need tips on my squat eccentric too.', timeAgo: '2 hours ago' }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Seraphina Vance',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    timeAgo: '1 day ago',
    content: 'Completed the "Daily Squat Commando" challenge before breakfast today! Legs are fully fired up. Who is joining me on the Step Master Pro walk this afternoon? Let\'s climb that leaderboard! 🔥🚀',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=400&auto=format&fit=crop',
    likes: 34,
    liked: true,
    comments: [
      { authorName: 'Kundan Saduyashwanth', content: 'Count me in! I need about 4,000 steps to finish my daily loop.', timeAgo: '18 hours ago' }
    ]
  }
];
