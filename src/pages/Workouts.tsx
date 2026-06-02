import { WorkoutPlan } from '../types';
import { ExerciseCard } from '../components/ExerciseCard';

interface WorkoutsProps {
  workoutPlans: WorkoutPlan[];
  selectedPlanId: string;
  setSelectedPlanId: (id: string) => void;
  selectedDayIndex: number;
  setSelectedDayIndex: (idx: number) => void;
  onCompleteExercise: (exerciseName: string) => void;
}

export function Workouts({
  workoutPlans,
  selectedPlanId,
  setSelectedPlanId,
  selectedDayIndex,
  setSelectedDayIndex,
  onCompleteExercise
}: WorkoutsProps) {
  
  const currentPlan = workoutPlans.find((wp) => wp.id === selectedPlanId);

  return (
    <div className="space-y-6 bg-white p-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Regimes Splits Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Track advanced hypertrophic motion sets, progressive workloads, and detailed anatomical instructions.
          </p>
        </div>
        
        {/* Plan Selectors */}
        <div className="flex flex-wrap gap-2">
          {workoutPlans.map((wp) => (
            <button
              key={wp.id}
              id={`btn-regime-select-${wp.id}`}
              onClick={() => {
                setSelectedPlanId(wp.id);
                setSelectedDayIndex(0);
              }}
              className={`px-3.5 py-2 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                selectedPlanId === wp.id
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-soft-sm'
                  : 'bg-white border-slate-250 text-slate-700 hover:text-indigo-600'
              }`}
            >
              {wp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Splits Selection Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
        {currentPlan?.days.map((day, idx) => (
          <button
            key={idx}
            id={`btn-split-day-${idx}`}
            onClick={() => setSelectedDayIndex(idx)}
            className={`px-5 py-3 text-xs font-black rounded-2xl border transition-all shrink-0 cursor-pointer ${
              selectedDayIndex === idx
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-soft-sm font-black'
                : 'bg-white border-slate-150 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {day.dayName}
          </button>
        ))}
      </div>

      {/* Exercises detailed render list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {currentPlan?.days[selectedDayIndex]?.exercises.map((ex, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-2 shadow-soft-sm">
            <ExerciseCard
              index={i}
              exercise={ex}
              onComplete={onCompleteExercise}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
