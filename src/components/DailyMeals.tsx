import { MacroRing } from './MacroRing';
import { WaterTracker } from './WaterTracker';
import { DietDay } from '../types';
import { CupSoda } from 'lucide-react';

interface DailyMealsProps {
  day: DietDay;
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const MEAL_ICONS: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  snack: '🍪',
  dinner: '🌙',
};

export const DailyMeals = ({ day, dailyGoals }: DailyMealsProps) => {
  return (
    <div className="space-y-6">
      {/* Macro Summary Rings */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-soft-sm">
        <h4 className="font-bold text-slate-900 tracking-tight mb-4">Aesthetic Macro Synthesis</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          <MacroRing label="Calories" current={day.totalCalories} target={dailyGoals.calories} unit="kcal" color="#3b82f6" />
          <MacroRing label="Protein" current={day.totalProtein} target={dailyGoals.protein} unit="g" color="#ef4444" />
          <MacroRing label="Carbs" current={day.totalCarbs} target={dailyGoals.carbs} unit="g" color="#eab308" />
          <MacroRing label="Fat" current={day.totalFat} target={dailyGoals.fat} unit="g" color="#8b5cf6" />
        </div>
      </div>

      {/* Meals Timeline */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-900 tracking-tight pl-1">Scheduled Bio-Meals</h4>
        {day.meals.map((meal) => (
          <div key={meal.type} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft-sm transition-all hover:shadow-soft-md">
            <div className="flex items-center gap-3.5 pb-3.5 border-b border-slate-150 mb-3.5">
              <span className="text-3xl filter drop-shadow-sm">{MEAL_ICONS[meal.type] || '🍽️'}</span>
              <div>
                <h4 className="font-extrabold text-slate-900 capitalize text-base tracking-tight">{meal.type}</h4>
                <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">{meal.time}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="font-extrabold text-slate-900 text-sm">{meal.foods.reduce((sum, f) => sum + f.calories, 0)} kcal</p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Estimated Fuel</p>
              </div>
            </div>
            
            <div className="divide-y divide-slate-100">
              {meal.foods.map((food, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 text-sm gap-1">
                  <div>
                    <span className="font-semibold text-slate-800">{food.name}</span>
                    <span className="text-slate-400 text-xs ml-2 font-medium">({food.quantity})</span>
                  </div>
                  <div className="flex gap-3 text-xs font-bold text-slate-500 font-mono">
                    <span className="text-rose-500">P {food.protein}g</span>
                    <span className="text-amber-500">C {food.carbs}g</span>
                    <span className="text-violet-500">F {food.fat}g</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Hydration tracker */}
      <WaterTracker goal={8} />
    </div>
  );
};
