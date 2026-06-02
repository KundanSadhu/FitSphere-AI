import { 
  LayoutDashboard, Dumbbell, Apple, TrendingUp, Bot, 
  Medal, Trophy, ShoppingBag, Settings, LogOut 
} from 'lucide-react';
import { User } from '../types';

interface SidebarNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User;
  onLogout: () => void;
  isOpen?: boolean;
}

export function SidebarNavigation({ activeTab, setActiveTab, user, onLogout, isOpen = true }: SidebarNavigationProps) {
  // Navigation elements configuration (excluding QR attendance and staff community)
  const mainSidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workout', icon: Dumbbell, label: 'Workout Splits' },
    { id: 'nutrition', icon: Apple, label: 'Nutrition & Meals' },
    { id: 'progress', icon: TrendingUp, label: 'Progress Matrix' },
    { id: 'meditation', icon: Medal, label: 'Meditation Zone' },
    { id: 'competitions', icon: Trophy, label: 'Competitions' },
    { id: 'shop', icon: SupplementsShop, label: 'Supplements Shop' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  function SupplementsShop(props: any) {
    return <ShoppingBag {...props} />;
  }

  if (!isOpen) return null;

  return (
    <aside 
      id="app-sidebar-navigation" 
      className="w-64 bg-white text-slate-700 border-r-2 border-[#191A23] flex flex-col justify-between shrink-0 hidden lg:flex select-none"
    >
      <div>
        {/* Brand visual header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b-2 border-[#191A23] bg-white">
          <div className="w-8 h-8 rounded-lg bg-[#191A23] border border-[#191A23] flex items-center justify-center text-[#B9FF66] font-black text-xs font-mono select-none shadow-[2px_2px_0px_#B9FF66]">
            FΩ
          </div>
          <span className="font-extrabold text-[#191A23] text-lg tracking-tight leading-tight select-none">
            FitSphere <span className="bg-[#B9FF66] text-[#191A23] px-1.5 py-0.5 rounded-md border border-[#191A23] text-xs font-black">AI</span>
          </span>
        </div>

        {/* User XP stats section */}
        <div className="p-5 border-b-2 border-[#191A23] bg-[#F3F3F3]/50">
          <div className="flex items-center gap-3">
            <img
              src={user.photoUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-xl object-cover border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23]"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-[#191A23] truncate leading-tight">{user.name}</p>
              <span className="bg-[#B9FF66] text-[#191A23] px-1 py-0.2 rounded-md border border-[#191A23] text-[8px] font-black uppercase font-mono tracking-wider mt-1 inline-block">
                Level {user.level} Coach
              </span>
            </div>
          </div>

          {/* XP level slider */}
          <div className="mt-4">
            <div className="flex justify-between text-[8px] font-extrabold text-[#191A23] font-mono mb-1">
              <span>XP: {user.xp} / {user.targetXp}</span>
              <span>Level {user.level}</span>
            </div>
            <div className="w-full h-2.5 bg-white border-2 border-[#191A23] rounded-full overflow-hidden relative">
              <div
                className="h-full bg-[#B9FF66] border-r-2 border-[#191A23] transition-all duration-300"
                style={{ width: `${Math.min(100, (user.xp / user.targetXp) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dedicated Chatbot Assistant block (Separated AI Coach) */}
        <div className="px-3 pt-4">
          <button
            id="sidebar-item-ai-coach"
            onClick={() => setActiveTab('ai-coach')}
            className={`w-full flex flex-col justify-start text-left gap-2 p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
              activeTab === 'ai-coach'
                ? 'bg-[#191A23] border-[#191A23] text-white shadow-[3px_3px_0px_#B9FF66]'
                : 'bg-white border-[#191A23] hover:bg-[#F3F3F3] text-[#191A23] shadow-[3px_3px_0px_#191A23]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg border-2 border-[#191A23] ${activeTab === 'ai-coach' ? 'bg-[#B9FF66] text-[#191A23]' : 'bg-white text-[#191A23]'}`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className={`text-[11px] font-black ${activeTab === 'ai-coach' ? 'text-white' : 'text-[#191A23]'}`}>AI Coach Chamber</p>
                <span className={`text-[8.5px] font-mono px-1 rounded-sm ${activeTab === 'ai-coach' ? 'bg-[#B9FF66]/20 text-[#B9FF66]' : 'bg-[#191A23] text-[#B9FF66]'}`}>🤖 ACTIVE ONLINE</span>
              </div>
            </div>
            <p className={`text-[10px] font-semibold leading-relaxed ${activeTab === 'ai-coach' ? 'text-slate-300' : 'text-slate-600'}`}>
              Gain diagnostic info on fibers, progressive loads & rest.
            </p>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-320px)]">
          {mainSidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 ${
                  isActive
                    ? 'bg-[#B9FF66] text-[#191A23] border-[#191A23] shadow-[3px_3px_0px_#191A23] font-black'
                    : 'text-[#191A23] bg-white border-transparent hover:border-[#191A23]/40'
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t-2 border-[#191A23] bg-white">
        <button
          onClick={onLogout}
          id="btn-sidebar-logout"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-rose-600 hover:bg-rose-50 text-rose-600 text-xs font-extrabold cursor-pointer transition-all active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out System</span>
        </button>
      </div>
    </aside>
  );
}
