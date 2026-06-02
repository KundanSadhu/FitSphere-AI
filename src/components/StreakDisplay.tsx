import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay = ({ streak }: StreakDisplayProps) => {
  return (
    <div id="streak-display" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 shadow-sm animate-pulse">
      <Flame className="w-5 h-5 fill-amber-500 stroke-amber-600 animate-bounce" />
      <span className="text-sm font-bold tracking-tight">{streak} Day Streak!</span>
    </div>
  );
};
