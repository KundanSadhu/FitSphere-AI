import { ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { User } from '../types';
import { StreakDisplay } from './StreakDisplay';

interface HeaderNavigationProps {
  activeTab: string;
  user: User;
}

export function HeaderNavigation({ activeTab, user }: HeaderNavigationProps) {
  // Human readable title
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Bio-Dynamics Console';
      case 'workout': return 'Regimes Splits Builder';
      case 'nutrition': return 'Nutrition Macro-Synthesis';
      case 'progress': return 'Body Progression Matrix';
      case 'ai-coach': return 'AI Coach Chamber';
      case 'meditation': return 'Mind-Muscle Chamber';
      case 'competitions': return 'Challenges & Leaderboards';
      case 'shop': return 'Supplements & Gear Store';
      case 'settings': return 'Settings';
      default: return 'Core Workspace';
    }
  };

  return (
    <header 
      id="app-header-navigation" 
      className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 z-30 shrink-0 select-none"
    >
      {/* Navigation breadcrumbs */}
      <div className="flex items-center gap-2">
        <span className="text-indigo-600 text-xs font-black font-mono uppercase tracking-widest leading-none">FitSphere</span>
        <ChevronRight className="w-4 h-4 text-slate-300" />
        <span className="text-slate-900 text-sm font-extrabold capitalize leading-none font-mono">
          {getTabTitle(activeTab)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak progress display widget */}
        <StreakDisplay streak={user.streak} />

        <div className="w-px h-6 bg-slate-200" />

        {/* Loyalty reward points count */}
        <div 
          id="loyalty-points-pill" 
          className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-150 px-3 py-1.5 rounded-full text-xs font-black font-mono shadow-soft-sm hover:scale-105 transition-transform"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
          <span>{user.points} PTS</span>
        </div>

        {/* Small avatar block for rapid validation */}
        <img
          src={user.photoUrl}
          alt={user.name}
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-full object-cover border border-slate-200 block lg:hidden"
        />
      </div>
    </header>
  );
}
