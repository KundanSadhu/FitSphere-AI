import { 
  LayoutDashboard, Dumbbell, Apple, TrendingUp, Bot, Settings, Menu 
} from 'lucide-react';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExpandedMenu: () => void;
}

export function MobileNavigation({ activeTab, setActiveTab, onOpenExpandedMenu }: MobileNavigationProps) {
  // Primary core items to render on standard mobile bar
  const primaryItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'workout', icon: Dumbbell, label: 'Workouts' },
    { id: 'nutrition', icon: Apple, label: 'Nutrition' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'ai-coach', icon: Bot, label: 'Coach' }
  ];

  return (
    <div 
      id="mobile-bottom-bar" 
      className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-150 z-40 lg:hidden flex justify-around items-center py-2 px-1 select-none shadow-soft-md"
    >
      {primaryItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            id={`mobile-nav-btn-${item.id}`}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
              isActive 
                ? 'text-indigo-655 font-black' 
                : 'text-slate-500 font-semibold'
            }`}
          >
            <item.icon className={`w-4.5 h-4.5 mb-1 ${isActive ? 'text-indigo-650' : 'text-slate-400'}`} />
            <span className="text-[9px] tracking-tight leading-none truncate">{item.label}</span>
          </button>
        );
      })}

      {/* Button to open rest of the tools (Meditation, Shop, QR scanner, etc.) */}
      <button
        onClick={onOpenExpandedMenu}
        id="mobile-nav-btn-expanded-menu"
        className="flex flex-col items-center justify-center flex-1 py-1 px-1 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
      >
        <Menu className="w-4.5 h-4.5 mb-1 text-slate-400" />
        <span className="text-[9px] tracking-tight leading-none">More</span>
      </button>
    </div>
  );
}
