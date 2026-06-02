import { DietPlan } from '../types';
import { DailyMeals } from '../components/DailyMeals';

interface NutritionProps {
  dietPlans: DietPlan[];
}

export function Nutrition({ dietPlans }: NutritionProps) {
  // Grab standard diet records
  const currentDiet = dietPlans[0];

  return (
    <div className="space-y-6 bg-white p-2">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Daily Nutrition Synths
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Synthesize target raw proteins, carbohydrates, healthy fats, and hydrating liquids for micro cell restoration.
        </p>
      </div>

      {/* Renders Meal Plan component in a clean white wrapper */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm">
        <DailyMeals 
          day={currentDiet.days[0]} 
          dailyGoals={currentDiet.dailyGoals} 
        />
      </div>
    </div>
  );
}
