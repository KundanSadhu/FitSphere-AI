import { Dumbbell, Users, Trophy, TrendingUp } from 'lucide-react';
import { User, WorkoutPlan, WeightRecord } from '../types';
import { StatsCard } from '../components/StatsCard';
import { BodyModel } from '../components/BodyModel';
import { DailyTip } from '../components/DailyTip';
import { ProgressGlobe } from '../components/ProgressGlobe';
import { WaterTracker } from '../components/WaterTracker';

interface DashboardProps {
  user: User;
  workoutPlans: WorkoutPlan[];
  selectedDayIndex: number;
  weightHistory: WeightRecord[];
}

export function Dashboard({ user, workoutPlans, selectedDayIndex, weightHistory }: DashboardProps) {
  const currentLevelRank = "#3";
  const workoutPlanCount = workoutPlans[0]?.days[selectedDayIndex]?.exercises.length || 0;
  const lastWeightRecord = weightHistory[weightHistory.length - 1]?.weight || 72.0;

  return (
    <div className="space-y-6 bg-white p-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-none">
            Bio-Dynamics Console
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Welcome back! Optimize your physical biomechanics and cell recovery targets.
          </p>
        </div>
      </div>

      {/* Grid of clean Stats cards, always white backgrounds internally */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          icon={Dumbbell} 
          label="Allocated Movements" 
          value={workoutPlanCount} 
          unit="Count" 
        />
        <StatsCard 
          icon={Users} 
          label="XP Leader Rank" 
          value={currentLevelRank} 
          unit="Rank" 
          colorClass="text-indigo-600" 
          bgClass="bg-white border-slate-100" 
        />
        <StatsCard 
          icon={Trophy} 
          label="Earned Loyalty Points" 
          value={user.points} 
          unit="Points" 
          colorClass="text-amber-500" 
          bgClass="bg-white border-slate-100" 
        />
        <StatsCard 
          icon={TrendingUp} 
          label="Progress Body-mass" 
          value={lastWeightRecord} 
          unit="Kg" 
          colorClass="text-emerald-500" 
          bgClass="bg-white border-slate-100" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anatomical Body Resonance Mapping */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-soft-sm">
            <BodyModel />
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-soft-sm">
            <DailyTip />
          </div>
        </div>

        {/* Dynamic Progression Cell Globe Visualization inside White Background block */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-soft-sm h-68 flex flex-col justify-between">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">My 3D Progress cells</h4>
            <div className="flex-1 h-36">
              <ProgressGlobe />
            </div>
            <p className="text-[10px] text-center text-slate-400 font-bold">RESONANCE CALIBRATOR ON LINE</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-soft-sm">
            <WaterTracker goal={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
