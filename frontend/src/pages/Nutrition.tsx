import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  RotateCcw, 
  Zap, 
  Sparkles, 
  Flame, 
  Apple, 
  Coffee, 
  Check, 
  Heart, 
  Info,
  Droplet,
  GlassWater,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DietPlan, FoodItem } from '../types';
import { MacroRing } from '../components/MacroRing';

// Complete high-fidelity predefined diets containing real Unsplash pictures & portion alternative setups
const STYLED_REGIMES = [
  {
    id: 'abhinav_1800',
    name: 'Abhinav Lifts - 1800 KCAL (Weight Loss)',
    goal: 'Zero allergies assumed. Target rapid adipose breakdown while maintaining biological muscle mass.',
    badge: 'ABHINAV LIFTS Series',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 1800, protein: 150, carbs: 156, fat: 50 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Aesthetic Morning Rise',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1517686469429-8faf88b9f7cf?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Oats & Whey Morning', calories: 480, protein: 38, carbs: 60, fat: 8 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Oats', quantity: '60g', calories: 230, protein: 8, carbs: 40, fat: 4 },
          { name: 'Milk', quantity: '50ml', calories: 30, protein: 1.5, carbs: 2.5, fat: 1.5 },
          { name: 'Chia Seeds', quantity: '5g', calories: 25, protein: 1, carbs: 2, fat: 1.5 },
          { name: 'Banana', quantity: '50g', calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 },
          { name: 'Any Fruit', quantity: '20g', calories: 10, protein: 0.2, carbs: 2, fat: 0 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Anabolic Center Fuel',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Chicken, White Rice & Curry', calories: 630, protein: 53, carbs: 62, fat: 11 },
          { name: 'Paneer, Sweet Potato & Curry', calories: 650, protein: 44, carbs: 68, fat: 18 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Chicken / Paneer / Fish', quantity: '200g', calories: 290, protein: 46, carbs: 0, fat: 6 },
          { name: 'White Rice / Sweet Potato', quantity: '200g', calories: 240, protein: 5, carbs: 52, fat: 0.5 },
          { name: 'Any Curry of Choice', quantity: '100g', calories: 100, protein: 2, carbs: 10, fat: 5 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Hypertrophic Power Snack',
        time: '04:30 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Whey & Honey Blend', calories: 155, protein: 27, carbs: 6, fat: 1 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Honey', quantity: '5g', calories: 15, protein: 0, carbs: 4, fat: 0 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Cellular Restoration Dinner',
        time: '08:30 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Egg Whites & White Rice Bowl', calories: 535, protein: 32, carbs: 28, fat: 30 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'White Rice', quantity: '150g', calories: 180, protein: 4, carbs: 39, fat: 0.3 },
          { name: 'Curd / Yogurt', quantity: '50g', calories: 30, protein: 2.5, carbs: 2, fat: 1.5 },
          { name: 'Any Curry of Choice', quantity: '50g', calories: 50, protein: 1, carbs: 5, fat: 2.5 },
          { name: 'Egg Whites', quantity: '1 Large', calories: 17, protein: 3.6, carbs: 0.2, fat: 0 },
          { name: 'Whole Eggs', quantity: '2 pcs', calories: 140, protein: 12, carbs: 1, fat: 10 }
        ]
      }
    ]
  },
  {
    id: 'abhinav_2100',
    name: 'Abhinav Lifts - 2100 KCAL (Fat Loss)',
    goal: 'Zero allergies assumed. Enhance fat oxidation rates and glycogen optimization loops.',
    badge: 'ABHINAV LIFTS Series',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2100, protein: 170, carbs: 180, fat: 65 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Aesthetic Morning Rise',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1517686469429-8faf88b9f7cf?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Oats, Seeds & Whey Blend', calories: 580, protein: 41, carbs: 68, fat: 12 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Oats', quantity: '70g', calories: 260, protein: 9, carbs: 46, fat: 4.5 },
          { name: 'Milk', quantity: '150ml', calories: 90, protein: 4.5, carbs: 7.5, fat: 4.5 },
          { name: 'Chia Seeds', quantity: '5g', calories: 25, protein: 1, carbs: 2, fat: 1.5 },
          { name: 'Banana', quantity: '50g', calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 },
          { name: 'Any Fruit', quantity: '20g', calories: 10, protein: 0.2, carbs: 2, fat: 0 },
          { name: 'Dry Fruit', quantity: '20g', calories: 120, protein: 3, carbs: 10, fat: 8 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Anabolic Center Fuel',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Chicken / Paneer with white rice', calories: 690, protein: 53, carbs: 75, fat: 11.5 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Chicken / Paneer / Fish', quantity: '200g', calories: 290, protein: 46, carbs: 0, fat: 6 },
          { name: 'White Rice / Sweet Potato', quantity: '250g', calories: 300, protein: 6, carbs: 65, fat: 0.5 },
          { name: 'Any Curry of Choice', quantity: '150g', calories: 150, protein: 3, carbs: 15, fat: 7.5 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Hypertrophic Power Snack',
        time: '04:30 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Wholewheat bread & whey', calories: 340, protein: 31, carbs: 45, fat: 2.5 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Wholewheat Bread', quantity: '1 pc', calories: 75, protein: 3, carbs: 15, fat: 1 },
          { name: 'Honey', quantity: '5g', calories: 15, protein: 0, carbs: 4, fat: 0 },
          { name: 'Banana', quantity: '50g', calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Cellular Restoration Dinner',
        time: '08:30 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Egg Whites & Whole Eggs with Rice', calories: 600, protein: 41, carbs: 54, fat: 22 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'White Rice', quantity: '150g', calories: 180, protein: 4, carbs: 39, fat: 0.3 },
          { name: 'Curd / Yogurt', quantity: '100g', calories: 60, protein: 5, carbs: 4, fat: 3 },
          { name: 'Any Curry of Choice', quantity: '100g', calories: 100, protein: 2, carbs: 10, fat: 5 },
          { name: 'Egg Whites', quantity: '2 Large', calories: 34, protein: 7.2, carbs: 0.4, fat: 0 },
          { name: 'Whole Eggs', quantity: '3 pcs', calories: 210, protein: 18, carbs: 1.5, fat: 15 }
        ]
      }
    ]
  },
  {
    id: 'abhinav_2500',
    name: 'Abhinav Lifts - 2500 KCAL (Maintenance)',
    goal: 'Zero allergies assumed. Equilibrium calorie formula to lock solid tissue metrics and hormone wellness.',
    badge: 'ABHINAV LIFTS Series',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2500, protein: 190, carbs: 220, fat: 71 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Aesthetic Morning Rise',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Oats, Milk, Chia & Fruits', calories: 680, protein: 44, carbs: 80, fat: 15 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Oats', quantity: '80g', calories: 300, protein: 11, carbs: 54, fat: 5 },
          { name: 'Milk', quantity: '200ml', calories: 120, protein: 6, carbs: 10, fat: 6 },
          { name: 'Chia Seeds', quantity: '5g', calories: 25, protein: 1, carbs: 2, fat: 1.5 },
          { name: 'Banana', quantity: '50g', calories: 45, protein: 0.5, carbs: 11, fat: 0.1 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 },
          { name: 'Any Fruit', quantity: '20g', calories: 10, protein: 0.2, carbs: 2, fat: 0 },
          { name: 'Dry Fruit', quantity: '20g', calories: 120, protein: 3, carbs: 10, fat: 8 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Anabolic Center Fuel',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Chicken, Rice & Curry Blend', calories: 730, protein: 58, carbs: 85, fat: 15 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Chicken / Paneer / Fish', quantity: '220g', calories: 320, protein: 50, carbs: 0, fat: 7 },
          { name: 'White Rice / Sweet Potato', quantity: '250g', calories: 300, protein: 6, carbs: 65, fat: 0.5 },
          { name: 'Any Curry of Choice', quantity: '150g', calories: 150, protein: 3, carbs: 15, fat: 7.5 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Hypertrophic Power Snack',
        time: '04:30 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Bread, Honey & Protein Shake', calories: 230, protein: 30, carbs: 21, fat: 2 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Wholewheat Bread', quantity: '1 pc', calories: 75, protein: 3, carbs: 15, fat: 1 },
          { name: 'Honey', quantity: '5g', calories: 15, protein: 0, carbs: 4, fat: 0 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Cellular Restoration Dinner',
        time: '08:30 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Curd, Curry & Whole Eggs', calories: 660, protein: 42, carbs: 68, fat: 24 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'White Rice', quantity: '200g', calories: 240, protein: 5, carbs: 52, fat: 0.5 },
          { name: 'Curd / Yogurt', quantity: '100g', calories: 60, protein: 5, carbs: 4, fat: 3 },
          { name: 'Any Curry of Choice', quantity: '100g', calories: 100, protein: 2, carbs: 10, fat: 5 },
          { name: 'Egg Whites', quantity: '2 Large', calories: 34, protein: 7.2, carbs: 0.4, fat: 0 },
          { name: 'Whole Eggs', quantity: '3 pcs', calories: 210, protein: 18, carbs: 1.5, fat: 15 }
        ]
      }
    ]
  },
  {
    id: 'abhinav_2700',
    name: 'Abhinav Lifts - 2700 KCAL (Bulking)',
    goal: 'Zero allergies assumed. Force extreme anabolic hyper-cellular hypertrophic synthesis.',
    badge: 'ABHINAV LIFTS Series',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2700, protein: 210, carbs: 280, fat: 85 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Aesthetic Morning Rise',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1517686469429-8faf88b9f7cf?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Oats, Peanut Butter, Fruits', calories: 880, protein: 53, carbs: 110, fat: 28 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Oats', quantity: '80g', calories: 300, protein: 11, carbs: 54, fat: 5 },
          { name: 'Peanut Butter', quantity: '20g', calories: 120, protein: 5, carbs: 4, fat: 10 },
          { name: 'Milk', quantity: '200ml', calories: 120, protein: 6, carbs: 10, fat: 6 },
          { name: 'Chia Seeds', quantity: '5g', calories: 25, protein: 1, carbs: 2, fat: 1.5 },
          { name: 'Banana', quantity: '100g', calories: 90, protein: 1, carbs: 22, fat: 0.2 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 },
          { name: 'Any Fruit', quantity: '20g', calories: 10, protein: 0.2, carbs: 2, fat: 0 },
          { name: 'Dry Fruit', quantity: '20g', calories: 120, protein: 3, carbs: 10, fat: 8 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Anabolic Center Fuel',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Bulk Chicken, Rice & Curry', calories: 830, protein: 63, carbs: 98, fat: 20 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Chicken / Paneer / Fish', quantity: '220g', calories: 320, protein: 50, carbs: 0, fat: 7 },
          { name: 'White Rice / Sweet Potato', quantity: '300g', calories: 360, protein: 7, carbs: 78, fat: 0.5 },
          { name: 'Any Curry of Choice', quantity: '150g', calories: 150, protein: 3, carbs: 15, fat: 7.5 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Hypertrophic Power Snack',
        time: '04:30 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Double Bread, Honey & Whey', calories: 310, protein: 33, carbs: 36, fat: 3 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Wholewheat Bread', quantity: '2 pcs', calories: 150, protein: 6, carbs: 30, fat: 2 },
          { name: 'Honey', quantity: '5g', calories: 15, protein: 0, carbs: 4, fat: 0 },
          { name: 'Whey Protein', quantity: '35g', calories: 140, protein: 27, carbs: 2, fat: 1 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Cellular Restoration Dinner',
        time: '08:30 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Full Carb Rice and Multiverse Eggs', calories: 870, protein: 51, carbs: 84, fat: 29 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'White Rice', quantity: '250g', calories: 300, protein: 6, carbs: 65, fat: 0.5 },
          { name: 'Curd / Yogurt', quantity: '100g', calories: 60, protein: 5, carbs: 4, fat: 3 },
          { name: 'Any Curry of Choice', quantity: '150g', calories: 150, protein: 3, carbs: 15, fat: 7.5 },
          { name: 'Egg Whites', quantity: '2 Large', calories: 34, protein: 7.2, carbs: 0.4, fat: 0 },
          { name: 'Whole Eggs', quantity: '4 pcs', calories: 280, protein: 24, carbs: 2, fat: 20 }
        ]
      }
    ]
  },
  {
    id: 'dp_lean_mass',
    name: 'High-Prot & Hyper Lean Mass',
    goal: 'Target optimized lean muscle expansion with minimal body fat storage',
    badge: 'Aesthetic Growth Series',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2600, protein: 170, carbs: 280, fat: 70 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Aesthetic Morning Synthesis',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1517686469429-8faf88b9f7cf?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Power Oatmeal & Honey Whey', calories: 610, protein: 48, carbs: 64, fat: 16 },
          { name: 'Sourdough Slices with Poached Eggs', calories: 540, protein: 32, carbs: 42, fat: 18 },
          { name: 'Blueberry Avocado Greek Protein Shaker', calories: 480, protein: 41, carbs: 32, fat: 22 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Fluffy Oatmeal Oats', quantity: '80g dry', calories: 300, protein: 11, carbs: 54, fat: 5 },
          { name: 'Fresh Whey Scoop (Vanilla)', quantity: '1 scoop (30g)', calories: 120, protein: 25, carbs: 2, fat: 1 },
          { name: 'Whole Eggs (Scrambled)', quantity: '2 medium', calories: 140, protein: 12, carbs: 1, fat: 10 },
          { name: 'Organic Blueberries', quantity: '50g', calories: 50, protein: 0.5, carbs: 7.5, fat: 0.1 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Anabolic Center Fuel',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Grilled Herb Chicken & Steamed Basmati', calories: 570, protein: 60, carbs: 51, fat: 11 },
          { name: 'Pan-Seared Grass-Fed Beef & Jasmine Rice', calories: 680, protein: 55, carbs: 48, fat: 25 },
          { name: 'Smoked Salmon Quinoa Bowl with Asparagus', calories: 510, protein: 44, carbs: 42, fat: 19 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Grilled Herb Chicken Breast', quantity: '200g', calories: 290, protein: 54, carbs: 0, fat: 6 },
          { name: 'Fragrant Steamed Basmati Rice', quantity: '150g cooked', calories: 195, protein: 4, carbs: 43, fat: 0.5 },
          { name: 'Steamed Fresh Broccoli & Carrots', quantity: '100g', calories: 45, protein: 2.5, carbs: 8, fat: 0.2 },
          { name: 'Organic Cold-Pressed Olive Oil', quantity: '1 tsp', calories: 40, protein: 0, carbs: 0, fat: 4.5 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Hypertrophic Power Snack',
        time: '04:30 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Banana Greek Yogurt & Creamy PB', calories: 290, protein: 20, carbs: 36, fat: 83 },
          { name: 'Chocolate Whey Shake & Raw Walnuts', calories: 310, protein: 30, carbs: 12, fat: 14 },
          { name: 'Organic Rice Cakes with Sliced Banana', calories: 240, protein: 12, carbs: 44, fat: 4 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Sweet Fresh Cavendish Banana', quantity: '1 large', calories: 110, protein: 1.5, carbs: 28, fat: 0.3 },
          { name: 'Pure Greek Yogurt 0% Fat', quantity: '150g', calories: 90, protein: 15, carbs: 5, fat: 0 },
          { name: 'Natural Crunchy Peanut Butter', quantity: '1 tbsp', calories: 90, protein: 3.5, carbs: 3, fat: 8 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Cellular Restoration Dinner',
        time: '08:30 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Wild Salmon Fillet & Sweet Potato', calories: 600, protein: 38, carbs: 44, fat: 29 },
          { name: 'Baked Sea Bass with Roasted Asparagus', calories: 490, protein: 42, carbs: 15, fat: 22 },
          { name: 'Slow Cooked Lean Turkey Fillets', calories: 530, protein: 46, carbs: 36, fat: 12 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Wild Norwegian Salmon Fillet', quantity: '160g cooked', calories: 320, protein: 32, carbs: 0, fat: 20 },
          { name: 'Roasted Spiced Sweet Potatoes', quantity: '180g', calories: 160, protein: 3, carbs: 37, fat: 0.2 },
          { name: 'Mixed Leafy Green Salad', quantity: '1 big bowl', calories: 30, protein: 1, carbs: 5, fat: 0.2 },
          { name: 'Raw Natural Walnuts', quantity: '15g', calories: 90, protein: 2.5, carbs: 2, fat: 9 }
        ]
      }
    ]
  },
  {
    id: 'dp_keto_burn',
    name: 'Ketogenic Bio-Metabolic Split',
    goal: 'Suppress simple glucose systems to enhance natural physical fat glycolysis',
    badge: 'Mitochondria Shred Series',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2100, protein: 140, carbs: 35, fat: 145 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'High-Fat Dawn Mobilizer',
        time: '08:30 AM',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Butter Scrambled Eggs & Avocado Strips', calories: 550, protein: 28, carbs: 6, fat: 48 },
          { name: 'Organic Bacon, Tomato & Flaxseed Shake', calories: 510, protein: 24, carbs: 5, fat: 44 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Pasture-Raised Whole Eggs', quantity: '3 medium', calories: 210, protein: 18, carbs: 1.5, fat: 15 },
          { name: 'Smoked Applewood Bacon Strips', quantity: '3 strips', calories: 150, protein: 9, carbs: 0, fat: 12 },
          { name: 'Fresh Haas Avocado Slices', quantity: '100g', calories: 160, protein: 2, carbs: 8, fat: 15 },
          { name: 'Grass-Fed Kerrygold Butter', quantity: '10g (Cooking)', calories: 70, protein: 0.1, carbs: 0, fat: 8 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'Ribeye Macro Matrix',
        time: '01:30 PM',
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Aged Ribeye Steak & Sautéed Asparagus', calories: 690, protein: 55, carbs: 4, fat: 50 },
          { name: 'Tuna Salad with Extra-Virgin Olive Oil', calories: 610, protein: 48, carbs: 3, fat: 42 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'USDA Choice Aged Ribeye Cut', quantity: '220g cooked', calories: 512, protein: 52, carbs: 0, fat: 34 },
          { name: 'Fresh Asparagus spears', quantity: '80g', calories: 25, protein: 2.2, carbs: 3.8, fat: 0.2 },
          { name: 'Cold-Pressed Extra Virgin Olive Oil', quantity: '1 tbsp', calories: 120, protein: 0, carbs: 0, fat: 14 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'MCT Healthy Fats Booster',
        time: '04:15 PM',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Macadamia Packs & MCT Butter Shot', calories: 260, protein: 3, carbs: 3, fat: 28 },
          { name: 'Dry-Salted Cashews & Pumpkin seeds', calories: 230, protein: 6, carbs: 8, fat: 20 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Raw Salted Macadamia Nuts', quantity: '30g', calories: 215, protein: 2.4, carbs: 4, fat: 22 },
          { name: 'MCT Oil Drizzle', quantity: '5ml', calories: 45, protein: 0, carbs: 0, fat: 5 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Gourmet Fatty-Acid Rest',
        time: '07:45 PM',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Pan-Oven Salmon Fillet & Cream of Spinach', calories: 610, protein: 50, carbs: 5, fat: 42 },
          { name: 'Cod Fish Sauté with Cauliflower Cheese', calories: 540, protein: 45, carbs: 6, fat: 38 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Wild Alaskan Sockeye Salmon', quantity: '180g cooked', calories: 360, protein: 40, carbs: 0, fat: 22 },
          { name: 'Organic Fresh Baby Spinach', quantity: '100g Sautéed', calories: 30, protein: 2.8, carbs: 3.2, fat: 0.2 },
          { name: 'Double Heavy Sautéing Cream', quantity: '2 tbsp', calories: 120, protein: 0.8, carbs: 1.2, fat: 12 },
          { name: 'Toasted Sesame Seed topping', quantity: '5g', calories: 40, protein: 1, carbs: 1, fat: 3.5 }
        ]
      }
    ]
  },
  {
    id: 'dp_plant_power',
    name: 'Vegan Plant-Protein Power Diet',
    goal: 'Vibrant raw anti-inflammatory plant protein, clean minerals, and essential lipid synthesis',
    badge: 'Organic Harvest Series',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
    dailyGoals: { calories: 2300, protein: 135, carbs: 290, fat: 65 },
    meals: [
      {
        type: 'breakfast' as const,
        label: 'Phyto-Nutrient Morning Rise',
        time: '08:00 AM',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Smoked Scrambled Organic Tofu & Tomatoes', calories: 440, protein: 32, carbs: 24, fat: 20 },
          { name: 'Peanut Butter Hemp Granola Bowl', calories: 490, protein: 26, carbs: 54, fat: 18 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'High-Protein Organic Firm Tofu', quantity: '200g', calories: 240, protein: 24, carbs: 4.8, fat: 14 },
          { name: 'Warm Red Cherry Tomatoes', quantity: '100g sautéed', calories: 35, protein: 1.2, carbs: 5.5, fat: 0.1 },
          { name: 'Nutritional Yeast bio-flakes', quantity: '2 tbsp', calories: 60, protein: 8, carbs: 5, fat: 0.5 },
          { name: 'Avocado Cold Pressing Spray', quantity: '5ml', calories: 45, protein: 0, carbs: 0, fat: 5 }
        ]
      },
      {
        type: 'lunch' as const,
        label: 'High-Alkali Macro Harvest Bowl',
        time: '01:00 PM',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Harvest Quinoa Salad Bowl & Warm Tahini', calories: 590, protein: 35, carbs: 68, fat: 18 },
          { name: 'Lentil Sweet Potato Hummus wrap', calories: 540, protein: 28, carbs: 74, fat: 12 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Raw Sprouted White Quinoa', quantity: '100g dry', calories: 368, protein: 14, carbs: 64, fat: 6 },
          { name: 'Organic Steamed Chickpeas', quantity: '100g', calories: 120, protein: 7.2, carbs: 18, fat: 1.5 },
          { name: 'Vibrant Hemp Seeds sprinkles', quantity: '15g', calories: 80, protein: 4.5, carbs: 1.5, fat: 6 },
          { name: 'Pure Ground Sesame Tahini Paste', quantity: '1 tbsp', calories: 95, protein: 3, carbs: 3, fat: 8 }
        ]
      },
      {
        type: 'snack' as const,
        label: 'Plant-Protein Clean Shake',
        time: '04:45 PM',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Vanilla Pea-protein, Almond & Chia Shake', calories: 290, protein: 24, carbs: 15, fat: 12 },
          { name: 'Spelt Toast & Natural PB Spread', calories: 260, protein: 14, carbs: 28, fat: 10 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Vanilla Organic Pea Protein Powder', quantity: '1 scoop (32g)', calories: 120, protein: 21, carbs: 2, fat: 1.5 },
          { name: 'Gluten-free Rice-Hemp milk', quantity: '200ml', calories: 80, protein: 1.5, carbs: 9, fat: 2 },
          { name: 'Hydrated Chia Seeds', quantity: '12g', calories: 60, protein: 2, carbs: 5, fat: 4 }
        ]
      },
      {
        type: 'dinner' as const,
        label: 'Vibrant Lentil & Spinach Curry',
        time: '08:15 PM',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        swapOptions: [
          { name: 'Spiced Indian Red Lentil Dal & Brown Rice', calories: 640, protein: 32, carbs: 88, fat: 16 },
          { name: 'Vibrant Pea Tempeh Stir-Fry & Broccolini', calories: 590, protein: 38, carbs: 42, fat: 22 }
        ],
        activeSwapIdx: 0,
        foods: [
          { name: 'Red Organic Lentils Dry Weight', quantity: '80g', calories: 270, protein: 18, carbs: 44, fat: 1 },
          { name: 'Long-Grain Organic Brown Rice', quantity: '120g cooked', calories: 170, protein: 3.5, carbs: 35, fat: 1 },
          { name: 'Fresh Asparagus and Baby Spinach Mix', quantity: '120g', calories: 40, protein: 3, carbs: 6, fat: 0.1 },
          { name: 'Slow Sauté Coconut Oil Premium', quantity: '1 tbsp', calories: 120, protein: 0, carbs: 0, fat: 14 }
        ]
      }
    ]
  }
];

// Quick supplementary Additions
const COMPLEMENTARY_BIO_FUELS = [
  { 
    id: 'add_whey', 
    name: 'Grass-Fed Whey Isolate', 
    icon: Zap, 
    label: 'Prot Scoop', 
    protein: 25, 
    carbs: 2, 
    fat: 1, 
    calories: 120, 
    quantity: '1 scoop (30g)',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=400&auto=format&fit=crop',
    description: 'Ultra-pure cold-filtered dairy protein with exceptional biological value and fast absorption.'
  },
  { 
    id: 'add_avocado', 
    name: 'Haas Avocado Slices', 
    icon: Apple, 
    label: 'Lp Avocado', 
    protein: 2, 
    carbs: 8, 
    fat: 15, 
    calories: 160, 
    quantity: '100g',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=400&auto=format&fit=crop',
    description: 'Heart-healthy monounsaturated lipids providing slow-burning energy and hormone regulation.'
  },
  { 
    id: 'add_banana', 
    name: 'Cavendish Sweet Banana', 
    icon: Flame, 
    label: 'Energy Fruit', 
    protein: 1, 
    carbs: 28, 
    fat: 0, 
    calories: 110, 
    quantity: '1 Large',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop',
    description: 'Rich in potassium and fast-acting bio-carbohydrates to restore glycogen after hard sessions.'
  },
  { 
    id: 'add_almonds', 
    name: 'Raw Natural Almonds', 
    icon: Heart, 
    label: 'Seed Fats', 
    protein: 4, 
    carbs: 4, 
    fat: 12, 
    calories: 130, 
    quantity: '20g',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d4b?q=80&w=400&auto=format&fit=crop',
    description: 'Thermogenic minerals, antioxidant vitamin E, and high-density satisfying dietary fibers.'
  },
  { 
    id: 'add_coffee', 
    name: 'Organic Black Coffee Shot', 
    icon: Coffee, 
    label: 'Metabolism', 
    protein: 0.5, 
    carbs: 1, 
    fat: 0, 
    calories: 5, 
    quantity: '1 Esp',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop',
    description: 'Pure roasted caffeine compound to elevate lipolysis, adrenaline, and workout performance.'
  }
];

// Helper to determine category of a diet plan
const getRegimeCategory = (regime: any): 'Bulking' | 'Fat Loss' | 'Maintenance' => {
  if (regime && typeof regime === 'object' && 'category' in regime && regime.category) {
    return regime.category;
  }
  const name = regime?.name?.toLowerCase() || '';
  const id = regime?.id?.toLowerCase() || '';
  if (name.includes('bulking') || name.includes('growth') || name.includes('mass') || id.includes('bulk') || id.includes('mass')) {
    return 'Bulking';
  }
  if (name.includes('fat loss') || name.includes('loss') || name.includes('shred') || name.includes('keto') || name.includes('burn') || id.includes('keto') || id.includes('shred') || id.includes('1800') || id.includes('2100')) {
    return 'Fat Loss';
  }
  return 'Maintenance';
};

export function Nutrition() {
  // Track currently active fuel for our interactive catalyst component
  const [activeFuelId, setActiveFuelId] = useState<string>('add_whey');
  // Track failed supplement/fuel cover image URLs to activate elegant local gradient vector overlays
  const [fuelImgErrors, setFuelImgErrors] = useState<Record<string, boolean>>({});

  // Active category filter: All, Bulking, Fat Loss, Maintenance
  const [dietFilter, setDietFilter] = useState<'All' | 'Bulking' | 'Fat Loss' | 'Maintenance'>('All');

  // Local diet plans state so adjustments/checks/swaps are reactive and persistent
  const [activeRegimeIdx, setActiveRegimeIdx] = useState<number>(() => {
    const saved = localStorage.getItem('fitsphere_current_regime_idx');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [regimes, setRegimes] = useState(() => {
    const saved = localStorage.getItem('fitsphere_styled_regimes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return STYLED_REGIMES;
      }
    }
    return STYLED_REGIMES;
  });

  // Automatically cycle/fallback index if the current selection does not match active filter
  useEffect(() => {
    if (dietFilter === 'All') return;
    
    const currentRegime = regimes[activeRegimeIdx];
    if (!currentRegime) return;
    
    const category = getRegimeCategory(currentRegime);
    if (category !== dietFilter) {
      const targetIdx = regimes.findIndex((r: any) => getRegimeCategory(r) === dietFilter);
      if (targetIdx !== -1) {
        setActiveRegimeIdx(targetIdx);
        setActiveMealIdx(0);
      }
    }
  }, [dietFilter, activeRegimeIdx, regimes]);

  // Track the active selected meal index for our sliding carousel
  const [activeMealIdx, setActiveMealIdx] = useState<number>(0);

  // Track checked / consumed foods
  const [consumedFoods, setConsumedFoods] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('fitsphere_consumed_foods_map');
    return saved ? JSON.parse(saved) : {};
  });

  // Hydro tracking states
  const [glasses, setGlasses] = useState<number>(() => {
    const saved = localStorage.getItem('fitsphere_water');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Alert success indicator
  const [successBubble, setSuccessBubble] = useState<string | null>(null);

  // Synchronize dynamic variables in localStorage
  useEffect(() => {
    localStorage.setItem('fitsphere_styled_regimes', JSON.stringify(regimes));
  }, [regimes]);

  useEffect(() => {
    localStorage.setItem('fitsphere_current_regime_idx', activeRegimeIdx.toString());
  }, [activeRegimeIdx]);

  useEffect(() => {
    localStorage.setItem('fitsphere_consumed_foods_map', JSON.stringify(consumedFoods));
  }, [consumedFoods]);

  useEffect(() => {
    localStorage.setItem('fitsphere_water', glasses.toString());
  }, [glasses]);

  const activeRegime = regimes[activeRegimeIdx];
  const activeMeal = activeRegime.meals[activeMealIdx];

  const handleNextRegime = () => {
    const matchingIndices = regimes
      .map((r, idx) => ({ r, idx }))
      .filter((item) => {
        if (dietFilter === 'All') return true;
        return getRegimeCategory(item.r) === dietFilter;
      })
      .map((item) => item.idx);

    if (matchingIndices.length > 0) {
      const currentPos = matchingIndices.indexOf(activeRegimeIdx);
      const nextPos = currentPos === -1 ? 0 : (currentPos + 1) % matchingIndices.length;
      setActiveRegimeIdx(matchingIndices[nextPos]);
      setActiveMealIdx(0);
      triggerAlert('Shifted bio-dynamics regime target profile!');
    }
  };

  const handlePrevRegime = () => {
    const matchingIndices = regimes
      .map((r, idx) => ({ r, idx }))
      .filter((item) => {
        if (dietFilter === 'All') return true;
        return getRegimeCategory(item.r) === dietFilter;
      })
      .map((item) => item.idx);

    if (matchingIndices.length > 0) {
      const currentPos = matchingIndices.indexOf(activeRegimeIdx);
      const prevPos = currentPos === -1 ? 0 : (currentPos - 1 + matchingIndices.length) % matchingIndices.length;
      setActiveRegimeIdx(matchingIndices[prevPos]);
      setActiveMealIdx(0);
      triggerAlert('Shifted bio-dynamics regime target profile!');
    }
  };

  const handleNextMeal = () => {
    setActiveMealIdx((prev) => (prev + 1) % activeRegime.meals.length);
  };

  const handlePrevMeal = () => {
    setActiveMealIdx((prev) => (prev - 1 + activeRegime.meals.length) % activeRegime.meals.length);
  };

  // Log consumed foods
  const handleToggleConsume = (foodKey: string) => {
    setConsumedFoods((prev) => ({
      ...prev,
      [foodKey]: !prev[foodKey]
    }));
  };

  // trigger notification bubble helper
  const triggerAlert = (message: string) => {
    setSuccessBubble(message);
    setTimeout(() => {
      setSuccessBubble(null);
    }, 2800);
  };

  // Swap meals setup
  const handleSwapOptionChange = (mealTypeIdx: number, swapOptionIdx: number) => {
    const targetSwap = activeRegime.meals[mealTypeIdx].swapOptions[swapOptionIdx];
    
    // Create simulated single alternative food item represents this option
    const updatedMeals = activeRegime.meals.map((meal, idx) => {
      if (idx === mealTypeIdx) {
        return {
          ...meal,
          activeSwapIdx: swapOptionIdx,
          foods: [
            {
              name: targetSwap.name,
              quantity: '1 Full Alternate Plate',
              calories: targetSwap.calories,
              protein: targetSwap.protein,
              carbs: targetSwap.carbs,
              fat: targetSwap.fat
            }
          ]
        };
      }
      return meal;
    });

    setRegimes((prev: typeof STYLED_REGIMES) =>
      prev.map((reg, idx) => (idx === activeRegimeIdx ? { ...reg, meals: updatedMeals } : reg))
    );

    triggerAlert(`Swapped meal structure with: "${targetSwap.name}"!`);
  };

  // Add custom boosters/snacks directly into the current meal
  const handleInjectFuel = (fuel: typeof COMPLEMENTARY_BIO_FUELS[0]) => {
    const newFood: FoodItem = {
      name: `[Booster] ${fuel.name}`,
      quantity: fuel.quantity,
      calories: fuel.calories,
      protein: fuel.protein,
      carbs: fuel.carbs,
      fat: fuel.fat
    };

    const updatedMeals = activeRegime.meals.map((meal, idx) => {
      if (idx === activeMealIdx) {
        return {
          ...meal,
          foods: [...meal.foods, newFood]
        };
      }
      return meal;
    });

    setRegimes((prev: typeof STYLED_REGIMES) =>
      prev.map((reg, idx) => (idx === activeRegimeIdx ? { ...reg, meals: updatedMeals } : reg))
    );

    triggerAlert(`Added ${fuel.name} to your active meal!`);
  };

  // Reset current regime back to starting values
  const handleResetRegime = () => {
    const baseRegimeData = STYLED_REGIMES.find(r => r.id === activeRegime.id);
    if (!baseRegimeData) return;

    setRegimes((prev: typeof STYLED_REGIMES) =>
      prev.map((reg, idx) => (idx === activeRegimeIdx ? JSON.parse(JSON.stringify(baseRegimeData)) : reg))
    );
    setConsumedFoods({});
    triggerAlert('Reset custom meal additions and portion swaps successfully!');
  };

  // Calculation parameters: Sum up current diet macros
  const currentTotal = activeRegime.meals.reduce(
    (acc, meal) => {
      meal.foods.forEach((food) => {
        const uniqueKey = `${activeRegime.id}-${meal.type}-${food.name}`;
        // If checked / consumed, adds to active synthesis
        const isConsumed = consumedFoods[uniqueKey] !== false; // Active by default
        if (isConsumed) {
          acc.calories += food.calories;
          acc.protein += food.protein;
          acc.carbs += food.carbs;
          acc.fat += food.fat;
        }
      });
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="space-y-6 bg-white p-2">
      {/* Dynamic Success Toast */}
      <AnimatePresence>
        {successBubble && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 border border-slate-800 text-white shadow-2xl px-5 py-3 rounded-2xl text-[11px] font-black font-mono flex items-center gap-2.5 tracking-wide animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 rotate-12" />
            <span>{successBubble.toUpperCase()}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
            <Apple className="w-6 h-6 text-indigo-600 animate-bounce" />
            Daily Nutrition Synths
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Track, slide, and inject macro elements for cell fiber recovery. Toggle checkpoints to recalculate live outputs.
          </p>
        </div>
        <button
          onClick={handleResetRegime}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-black border border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Portion Modifications</span>
        </button>
      </div>

      {/* EXTREMELY VISUAL REGIME CATEGORY FILTERS */}
      <div className="bg-white border-2 border-[#191A23] p-3 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-left shadow-[4px_4px_0px_#191A23]">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono font-black text-[#191A23] uppercase tracking-widest pl-1">
            Category Filter:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'All' as const, label: 'All Diets', icon: Apple, color: 'text-[#191A23]' },
            { key: 'Fat Loss' as const, label: 'Fat Loss', icon: Flame, color: 'text-rose-600' },
            { key: 'Maintenance' as const, label: 'Normal / Maintenance', icon: Heart, color: 'text-emerald-600' },
            { key: 'Bulking' as const, label: 'Bulking', icon: Zap, color: 'text-amber-600' }
          ].map((btn) => {
            const isSelected = dietFilter === btn.key;
            const count = btn.key === 'All'
              ? regimes.length
              : regimes.filter((r: any) => getRegimeCategory(r) === btn.key).length;
            const BtnIcon = btn.icon;

            return (
              <button
                key={btn.key}
                onClick={() => {
                  setDietFilter(btn.key);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none ${
                  isSelected
                    ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23]'
                    : 'bg-white hover:bg-[#F3F3F3] border-[#191A23] text-[#191A23]'
                }`}
              >
                <BtnIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#191A23]' : btn.color}`} />
                <span>{btn.label}</span>
                <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded ${isSelected ? 'bg-white/60 text-[#191A23]' : 'bg-[#F3F3F3] text-slate-600'} border border-[#191A23]/20`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: REGIME SELECTOR CAROUSEL */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#191A23] shadow-[5px_5px_0px_0px_#191A23] bg-white text-[#191A23] min-h-[170px] flex flex-col justify-between p-6 text-left">
        {/* Absolute Background Graphics with subtle gradient */}
        <div className="absolute inset-y-0 right-0 w-1/3 z-0 hidden md:block">
          <img
            src={activeRegime.image}
            alt={activeRegime.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop';
            }}
            className="w-full h-full object-cover opacity-10 filter grayscale scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        {/* Content Inside */}
        <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="space-y-1.5 max-w-full sm:max-w-[70%] text-left">
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] font-mono font-black text-[#191A23] bg-[#B9FF66] border border-[#191A23] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-[1px_1px_0px_#191A23]">
                  {activeRegime.badge}
                </span>
                <span className="text-[9px] font-mono font-black text-white bg-[#191A23] border border-[#191A23] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {getRegimeCategory(activeRegime).toUpperCase()}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black tracking-tight leading-tight text-[#191A23] mt-2">
                {activeRegime.name}
              </h2>
              
              {/* Quick interactive dropdown of relevant options */}
              <div className="mt-2 text-left relative z-20">
                <select
                  value={activeRegimeIdx}
                  onChange={(e) => {
                    const idx = parseInt(e.target.value, 10);
                    setActiveRegimeIdx(idx);
                    setActiveMealIdx(0);
                    triggerAlert(`Selected: ${regimes[idx].name}`);
                  }}
                  className="bg-white text-[#191A23] border-2 border-[#191A23] rounded-xl px-3 py-1.5 text-xs font-black focus:outline-none focus:bg-[#B9FF66] cursor-pointer max-w-full truncate shadow-[2px_2px_0px_#191A23]"
                >
                  {regimes.map((r, idx) => {
                    const cat = getRegimeCategory(r);
                    const isVisible = dietFilter === 'All' || cat === dietFilter;
                    if (!isVisible) return null;
                    return (
                      <option key={r.id} value={idx} className="bg-white text-[#191A23] font-sans text-xs">
                        {r.name} ({r.dailyGoals.calories} kcal)
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Slider triggers */}
            <div className="flex items-center gap-2 self-end sm:self-start">
              <button
                onClick={handlePrevRegime}
                id="btn-prev-diet-regime"
                className="w-9 h-9 rounded-xl bg-white border-2 border-[#191A23] text-[#191A23] hover:bg-[#B9FF66] flex items-center justify-center transition-all active:translate-y-0.5 shadow-[2px_2px_0px_#191A23] cursor-pointer"
                title="Previous diet plan"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextRegime}
                id="btn-next-diet-regime"
                className="w-9 h-9 rounded-xl bg-white border-2 border-[#191A23] text-[#191A23] hover:bg-[#B9FF66] flex items-center justify-center transition-all active:translate-y-0.5 shadow-[2px_2px_0px_#191A23] cursor-pointer"
                title="Next diet plan"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 font-semibold max-w-xl text-left leading-relaxed">
            {activeRegime.goal}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 border-t-2 border-[#191A23] pt-3 text-[10px] font-mono text-[#191A23] uppercase tracking-widest font-black">
            <span>Target: <b className="bg-[#B9FF66] px-1.5 py-0.5 rounded border border-[#191A23] text-xs font-sans font-black">{activeRegime.dailyGoals.calories} Kcal</b></span>
            <span>Protein: <b className="font-sans text-xs">{activeRegime.dailyGoals.protein}G</b></span>
            <span>Carbs: <b className="font-sans text-xs">{activeRegime.dailyGoals.carbs}G</b></span>
            <span>Fat: <b className="font-sans text-xs">{activeRegime.dailyGoals.fat}G</b></span>
          </div>
        </div>
      </div>

      {/* SECTION 2: MACRONUTRIENT SYNTHESIS DIALS (LIVE CALCULATIONS) */}
      <div className="bg-white p-5 rounded-3xl border-2 border-[#191A23] shadow-[5px_5px_0px_0px_#191A23] text-left">
        <div className="flex items-center justify-between mb-4 border-b-2 border-slate-100 pb-2.5">
          <div className="text-left">
            <h4 className="text-xs font-black uppercase text-[#191A23] tracking-wider font-mono">Real-Time Synthesis Status</h4>
            <p className="text-[10px] text-slate-500 font-bold mt-0.5">Checked checkboxes below feed directly into these circular bio-clocks</p>
          </div>
          <span className="text-[9.5px] font-mono font-black text-[#191A23] flex items-center gap-1.5 bg-[#B9FF66] border-2 border-[#191A23] px-2.5 py-1 rounded-xl shadow-[1.5px_1.5px_0px_#191A23]">
            <Info className="w-4 h-4 text-[#191A23] shrink-0" />
            SYNCHRONIZED METABOLISM
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          <MacroRing label="Calories" current={currentTotal.calories} target={activeRegime.dailyGoals.calories} unit="kcal" color="#3b82f6" />
          <MacroRing label="Protein" current={currentTotal.protein} target={activeRegime.dailyGoals.protein} unit="g" color="#f43f5e" />
          <MacroRing label="Carbs" current={currentTotal.carbs} target={activeRegime.dailyGoals.carbs} unit="g" color="#eab308" />
          <MacroRing label="Fat" current={currentTotal.fat} target={activeRegime.dailyGoals.fat} unit="g" color="#6366f1" />
        </div>
      </div>

      {/* SECTION 3 & 4: THE SCHEDULED BIO-MEALS SLIDER CAROUSEL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle Column: Interactive Meal Carousel Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pl-1">
            <h4 className="text-xs font-black text-[#191A23] uppercase tracking-widest font-mono">
              Scheduled Bio-Meals Carousel ({activeMealIdx + 1}/{activeRegime.meals.length})
            </h4>
            
            {/* Quick indicators */}
            <div className="flex gap-1.5">
              {activeRegime.meals.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeMealIdx ? 'w-6 bg-[#B9FF66] border border-[#191A23]' : 'w-2.5 bg-[#F3F3F3] border border-[#191A23]/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Slider Unit */}
          <div className="bg-white border-2 border-[#191A23] rounded-[30px] overflow-hidden shadow-[6px_6px_0px_0px_#191A23] transition-all">
            {/* Carousel Picture & Header */}
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[420px] w-full bg-[#F3F3F3] overflow-hidden group">
              <img
                src={activeMeal.image}
                alt={activeMeal.label}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop';
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
              
              {/* Overlaid Data */}
              <div className="absolute bottom-6 inset-x-6 z-20 flex flex-col sm:flex-row justify-between sm:items-end text-white gap-3 text-left">
                <div className="space-y-2">
                  <span className="text-[10px] sm:text-xs font-black font-mono tracking-widest text-[#B9FF66] bg-[#191A23]/85 px-2.5 py-1 rounded-md border border-[#B9FF66]/35 uppercase inline-block leading-none">
                    {activeMeal.type === 'breakfast' && '🌅 Morning Pulse'}
                    {activeMeal.type === 'lunch' && '☀️ Anabolic Split'}
                    {activeMeal.type === 'snack' && '🍪 Energy Recharge'}
                    {activeMeal.type === 'dinner' && '🌙 Recover Deep'}
                  </span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                    {activeMeal.label}
                  </h3>
                  <span className="text-[11px] sm:text-sm font-black text-[#191A23] bg-[#B9FF66] border-2 border-[#191A23] px-3 py-1 rounded-xl inline-block shadow-[2px_2px_0px_#191A23]">
                    {activeMeal.time}
                  </span>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-350 uppercase block tracking-wider font-extrabold">Estimated Calories</span>
                  <span className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-white drop-shadow-md">
                    {activeMeal.foods.reduce((sum, f) => sum + f.calories, 0)} <span className="text-xs sm:text-lg font-sans font-black text-[#B9FF66]">kcal</span>
                  </span>
                </div>
              </div>

              {/* Slider Chevrons Overlay */}
              <button
                onClick={handlePrevMeal}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-25 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-[#191A23] hover:bg-[#B9FF66] active:scale-95 text-[#191A23] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_#191A23]"
                title="Previous meal"
              >
                <ChevronLeft className="w-6 h-6 stroke-[3]" />
              </button>
              <button
                onClick={handleNextMeal}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-25 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-[#191A23] hover:bg-[#B9FF66] active:scale-95 text-[#191A23] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[3px_3px_0px_#191A23]"
                title="Next meal"
              >
                <ChevronRight className="w-6 h-6 stroke-[3]" />
              </button>
            </div>

            {/* Meal Items and Custom Ingredient Toggle Grid */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-black text-[#191A23] border-b-2 border-[#191A23] pb-2">
                <span>INGREDIENT CHECKLIST</span>
                <span>STATE</span>
              </div>

              <div className="divide-y divide-[#191A23]/10 max-h-[200px] overflow-y-auto pr-1">
                {activeMeal.foods.map((food, idx) => {
                  const uniqueKey = `${activeRegime.id}-${activeMeal.type}-${food.name}`;
                  const isChecked = consumedFoods[uniqueKey] !== false; // checked by default
                  
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleConsume(uniqueKey)}
                      className={`flex flex-col sm:flex-row justify-between sm:items-center py-2.5 px-3 rounded-xl text-xs sm:text-xs cursor-pointer transition-all gap-1.5 border-2 my-1.5 ${
                        isChecked 
                          ? 'bg-white border-[#191A23] text-[#191A23] shadow-[2px_2px_0px_#191A23]' 
                          : 'bg-[#F3F3F3] border-transparent opacity-50 line-through text-slate-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-left min-w-0">
                        <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors ${
                          isChecked ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23]' : 'border-slate-400 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="truncate">
                          <span className="font-extrabold text-slate-800 block truncate leading-tight">{food.name}</span>
                          <span className="text-[9px] font-mono text-slate-400 font-bold">{food.quantity}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 font-mono font-bold text-[10px]">
                        <span className="text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px] font-extrabold">{food.calories} kcal</span>
                        <div className="flex gap-2">
                          <span className="text-rose-500">P:{food.protein}g</span>
                          <span className="text-amber-500">C:{food.carbs}g</span>
                          <span className="text-indigo-600">F:{food.fat}g</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* SECTION 4: FOOD OPTION SWAP COMPONENT SECTION */}
              <div className="border-t border-slate-100 pt-4 bg-slate-50/50 -mx-5 -mb-5 p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                  <div>
                    <span className="text-[9px] font-mono font-black text-indigo-600 uppercase tracking-widest">Aesthetic Alternatives</span>
                    <h5 className="font-extrabold text-xs text-slate-800 leading-tight">Swap Entire Meal Protein Set</h5>
                  </div>
                  
                  {/* Swap select options */}
                  <div className="flex gap-1 pb-1 overflow-x-auto w-full sm:w-auto">
                    {activeMeal.swapOptions?.map((swap, sIdx) => {
                      const isSelected = activeMeal.activeSwapIdx === sIdx;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleSwapOptionChange(activeMealIdx, sIdx)}
                          className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold border transition-all text-left shrink-0 cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-soft-sm'
                              : 'bg-white text-slate-600 border-slate-205 hover:bg-slate-50'
                          }`}
                        >
                          {sIdx === 0 ? 'Standard Setup' : `Alt #${sIdx}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column: Snack & Supplement Booster */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold text-slate-900 pl-1 uppercase tracking-widest font-mono text-left flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            Supplement & Snack Booster
          </h4>

          {/* Connected Supplements panel with rich UX & perfect image fallback options */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm space-y-4 text-left">
            <div className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100/60">
              <span className="text-[8px] font-mono font-black text-indigo-600 bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded uppercase tracking-wider block w-fit">
                Meal Enhancer
              </span>
              <span className="text-[9px] font-mono text-slate-400 font-bold">Active Meal: <strong className="text-indigo-600 capitalize font-mono">{activeMeal.type}</strong></span>
            </div>
            
            <p className="text-xs text-slate-450 font-semibold leading-relaxed">
              Add wholesone supplements or nutritious snacks directly to your current meal. Your daily nutrient totals and circular rings will recalculate instantly!
            </p>

            {/* Scrollable Selector Carousel */}
            <div className="flex gap-1.5 overflow-x-auto pb-1.5 -mx-1 px-1 scrollbar-thin">
              {COMPLEMENTARY_BIO_FUELS.map((fuel) => {
                const FuelIcon = fuel.icon;
                const isSelected = activeFuelId === fuel.id;
                return (
                  <button
                    key={fuel.id}
                    onClick={() => setActiveFuelId(fuel.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-soft-sm' 
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500 hover:text-indigo-600'
                    }`}
                  >
                    <FuelIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white font-black' : 'text-indigo-600'}`} />
                    <span>{fuel.label}</span>
                  </button>
                );
              })}
            </div>

            {(() => {
              const activeFuel = COMPLEMENTARY_BIO_FUELS.find(f => f.id === activeFuelId) || COMPLEMENTARY_BIO_FUELS[0];
              const FuelIconComp = activeFuel.icon;
              const hasImgFailed = fuelImgErrors[activeFuel.id];
              return (
                <div className="border border-slate-100 bg-slate-50/50 rounded-2xl overflow-hidden p-3 transition-all duration-300 flex flex-col gap-3">
                  
                  {/* Photo area with perfect fallbacks */}
                  <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900 border border-slate-200/60 shadow-inner flex items-center justify-center">
                    {hasImgFailed ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-4 text-center select-none">
                        <FuelIconComp className="w-8 h-8 text-indigo-400 animate-pulse mb-1" />
                        <span className="text-[10px] font-mono font-black text-indigo-300 uppercase tracking-widest">{activeFuel.name}</span>
                        <span className="text-[8px] text-slate-500 font-bold mt-1">Healthy food booster loaded</span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={activeFuel.image}
                          alt={activeFuel.name}
                          referrerPolicy="no-referrer"
                          onError={() => {
                            setFuelImgErrors(prev => ({ ...prev, [activeFuel.id]: true }));
                          }}
                          className="w-full h-full object-cover opacity-80 filter brightness-95 hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        <div className="absolute bottom-2.5 left-3 text-left">
                          <span className="text-[8px] font-mono font-black text-emerald-400 bg-slate-950/80 border border-emerald-900/60 px-2 py-0.5 rounded uppercase tracking-wider block w-fit mb-0.5">
                            {activeFuel.quantity}
                          </span>
                          <h5 className="font-extrabold text-[12px] text-white tracking-tight leading-none truncate max-w-[200px]">
                            {activeFuel.name}
                          </h5>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Scientific benefits */}
                  <p className="text-[10px] text-slate-500 font-bold leading-relaxed italic text-left">
                    "{activeFuel.description}"
                  </p>

                  {/* Micro macronutrient bars divisions */}
                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-white border border-slate-100 p-1.5 rounded-lg">
                      <span className="text-[8px] font-mono text-slate-400 block font-bold leading-none uppercase">kcal</span>
                      <strong className="text-xs font-mono font-black text-indigo-900">{activeFuel.calories}</strong>
                    </div>
                    <div className="bg-white border border-slate-100 p-1.5 rounded-lg border-l-2 border-l-rose-400">
                      <span className="text-[8px] font-mono text-rose-400 block font-bold leading-none uppercase">PRO</span>
                      <strong className="text-xs font-mono font-black text-rose-600">{activeFuel.protein}g</strong>
                    </div>
                    <div className="bg-white border border-slate-100 p-1.5 rounded-lg border-l-2 border-l-amber-400">
                      <span className="text-[8px] font-mono text-amber-400 block font-bold leading-none uppercase">CARB</span>
                      <strong className="text-xs font-mono font-black text-amber-600">{activeFuel.carbs}g</strong>
                    </div>
                    <div className="bg-white border border-slate-100 p-1.5 rounded-lg border-l-2 border-l-indigo-400">
                      <span className="text-[8px] font-mono text-indigo-400 block font-bold leading-none uppercase">FAT</span>
                      <strong className="text-xs font-mono font-black text-indigo-600">{activeFuel.fat}g</strong>
                    </div>
                  </div>

                  {/* Trigger Action */}
                  <button
                    onClick={() => handleInjectFuel(activeFuel)}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[11px] md:text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 str-2" />
                    <span>Add {activeFuel.name} (+{activeFuel.protein}g Protein)</span>
                  </button>

                </div>
              );
            })()}

            <div className="rounded-xl bg-orange-50/75 border border-orange-100 p-3 text-[9.5px] leading-relaxed font-bold text-orange-850">
              ⚡ <b>Hydration Tip:</b> Remember to drink at least 250ml of fresh water from the water tracker below when adding concentrated supplements to keep your digestion and metabolism running optimally!
            </div>
          </div>

          {/* Connected Water Tracker Component */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm space-y-4 text-left">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[8.5px] font-mono font-black text-indigo-600 uppercase tracking-widest block">Cell Expansion</span>
                <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Live Hydro Tracker</h4>
              </div>
              <Droplet className="w-5 h-5 text-sky-500 fill-sky-200 animate-pulse" />
            </div>

            {/* Quick water glass checker slider */}
            <div className="flex items-center justify-between gap-2.5">
              <span className="font-mono text-lg font-black text-slate-900 leading-none">
                {glasses} <span className="text-[10px] text-slate-400 font-sans font-extrabold">/ 8 GLASSES</span>
              </span>

              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => setGlasses(p => Math.max(0, p - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-black flex items-center justify-center cursor-pointer font-mono"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    setGlasses(p => Math.min(8, p + 1));
                    triggerAlert('Hydrated +250ml pure water! Maintaining blood pressure alignment.');
                  }}
                  className="w-7 h-7 rounded-lg bg-sky-500 hover:bg-sky-655 text-white text-xs font-black flex items-center justify-center cursor-pointer font-mono shadow-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bullet container drops indicator */}
            <div className="grid grid-cols-8 gap-1 pt-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => setGlasses(i + 1)}
                  className={`h-6 rounded-md flex items-center justify-center border cursor-pointer transition-all ${
                    i < glasses
                      ? 'bg-sky-500 border-sky-600 text-white scale-102 shadow-xs'
                      : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <GlassWater className={`w-3.5 h-3.5`} />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
