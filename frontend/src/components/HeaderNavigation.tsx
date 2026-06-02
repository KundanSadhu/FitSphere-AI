import { ChevronRight, Trophy, Menu } from 'lucide-react';
import { User } from '../types';
import { StreakDisplay } from './StreakDisplay';
import { GoogleFitIndicator } from './GoogleFitIndicator';

interface HeaderNavigationProps {
  activeTab: string;
  user: User;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function HeaderNavigation({ activeTab, user, isSidebarOpen, onToggleSidebar }: HeaderNavigationProps) {
  // Human readable title
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Console';
      case 'workout': return 'Workout Regime Splits';
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
      className="h-16 bg-white border-b-2 border-[#191A23] flex items-center justify-between px-6 z-30 shrink-0 select-none"
    >
      {/* Navigation breadcrumbs */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleSidebar}
          className="hidden lg:flex p-1.5 mr-2 rounded-lg bg-white border-2 border-[#191A23] text-[#191A23] hover:bg-[#B9FF66] transition-colors shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none"
          title="Toggle Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>
        <span className="bg-[#B9FF66] text-[#191A23] px-2.5 py-1 rounded-md border-2 border-[#191A23] text-xs font-black uppercase tracking-wider leading-none">
          FitSphere
        </span>
        <ChevronRight className="w-4 h-4 text-[#191A23]" />
        <span className="text-[#191A23] text-sm font-black capitalize leading-none font-mono">
          {getTabTitle(activeTab)}
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Google Fit Sync Connection Indicator Badge */}
        <GoogleFitIndicator />

        <div className="hidden sm:block w-0.5 h-6 bg-[#191A23]" />

        {/* Streak progress display widget */}
        <div className="border-2 border-[#191A23] rounded-xl overflow-hidden shadow-[2px_2px_0px_#191A23]">
          <StreakDisplay streak={user.streak} />
        </div>

        <div className="w-0.5 h-6 bg-[#191A23]" />

        {/* Loyalty reward points count */}
        <div 
          id="loyalty-points-pill" 
          className="flex items-center gap-1.5 bg-[#B9FF66] text-[#191A23] border-2 border-[#191A23] px-3.5 py-1 rounded-xl text-xs font-black font-mono shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 fill-[#191A23]" />
          <span>{user.points} PTS</span>
        </div>

        {/* Small avatar block for rapid validation */}
        <img
          src={user.photoUrl}
          alt={user.name}
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-lg object-cover border-2 border-[#191A23] block lg:hidden"
        />
      </div>
    </header>
  );
}
