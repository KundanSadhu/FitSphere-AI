import { useEffect, useState } from 'react';
import { Dumbbell, Users, Trophy, TrendingUp, Activity } from 'lucide-react';
import { User, WorkoutPlan, WeightRecord } from '../types';
import { StatsCard } from '../components/StatsCard';
import { BodyModel } from '../components/BodyModel';
import { DailyTip } from '../components/DailyTip';
import { WaterTracker } from '../components/WaterTracker';
import { getGoogleFitSteps } from '../lib/googleApi';

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
  const [steps, setSteps] = useState<number | string>('--');

  useEffect(() => {
    const fetchSteps = () => {
      getGoogleFitSteps()
        .then(s => setSteps(s))
        .catch(e => {
          console.error(e);
          setSteps('N/A');
        });
    };

    fetchSteps();

    const handleStepsUpdate = (e: any) => {
      if (e.detail && e.detail.steps !== undefined) {
        setSteps(e.detail.steps);
      } else {
        fetchSteps();
      }
    };

    window.addEventListener('google-fit-steps-updated' as any, handleStepsUpdate);
    return () => {
      window.removeEventListener('google-fit-steps-updated' as any, handleStepsUpdate);
    };
  }, []);

  return (
    <div className="space-y-6 bg-white text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight leading-none">
            Dashboard Console
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-semibold">
            Welcome back! Track your daily movements, nutrition goals, and progressive muscular logs in one clean workspace.
          </p>
        </div>
      </div>

      {/* Grid of clean Stats cards, always white backgrounds internally */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard 
          icon={Activity} 
          label="G-Fit Steps" 
          value={steps} 
          unit="Today" 
        />
        <StatsCard 
          icon={Dumbbell} 
          label="Exercises Today" 
          value={workoutPlanCount} 
          unit="Movements" 
        />
        <StatsCard 
          icon={Users} 
          label="Leaderboard Rank" 
          value={currentLevelRank} 
          unit="Position" 
        />
        <StatsCard 
          icon={Trophy} 
          label="Loyalty Points" 
          value={user.points} 
          unit="Points" 
        />
        <StatsCard 
          icon={TrendingUp} 
          label="Current Weight" 
          value={lastWeightRecord} 
          unit="Kg" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anatomical Body Resonance Mapping */}
        <div className="col-span-1 lg:col-span-2 space-y-4 md:space-y-6">
          <BodyModel />
          <DailyTip />
        </div>

        {/* Dynamic Progression Cell Globe Visualization inside White Background block */}
        <div className="col-span-1 space-y-4 md:space-y-6">
          <WaterTracker goal={8} />
        </div>
      </div>
    </div>
  );
}
