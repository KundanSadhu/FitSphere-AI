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
}

export function SidebarNavigation({ activeTab, setActiveTab, user, onLogout }: SidebarNavigationProps) {
  // Navigation elements configuration (excluding QR attendance and staff community)
  const mainSidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workout', icon: Dumbbell, label: 'Workouts splits' },
    { id: 'nutrition', icon: Apple, label: 'Nutrition & meals' },
    { id: 'progress', icon: TrendingUp, label: 'Progress Matrix' },
    { id: 'meditation', icon: Medal, label: 'Meditation Zone' },
    { id: 'competitions', icon: Trophy, label: 'Competitions' },
    { id: 'shop', icon: ShoppingBag, label: 'Supplements Shop' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <aside 
      id="app-sidebar-navigation" 
      className="w-64 bg-white text-slate-700 border-r border-slate-100 flex flex-col justify-between shrink-0 hidden lg:flex select-none"
    >
      <div>
        {/* Brand visual header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100 bg-white">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow text-white font-black text-xs font-mono select-none">
            FΩ
          </div>
          <span className="font-black text-slate-900 text-base tracking-tight leading-tight select-none">
            FitSphere <span className="text-indigo-600">AI</span>
          </span>
        </div>

        {/* User XP stats section */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <img
              src={user.photoUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
            />
            <div className="min-w-0">
              <p className="text-xs font-black text-slate-900 truncate leading-tight">{user.name}</p>
              <span className="text-[9px] font-bold text-slate-500 uppercase font-mono tracking-wider">
                Level {user.level} Coach
              </span>
            </div>
          </div>

          {/* XP level slider */}
          <div className="mt-4">
            <div className="flex justify-between text-[8px] font-bold text-slate-400 font-mono mb-1">
              <span>XP: {user.xp} / {user.targetXp}</span>
              <span>Level {user.level}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
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
            className={`w-full flex flex-col justify-start text-left gap-2.5 p-3.5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === 'ai-coach'
                ? 'bg-indigo-650 border-indigo-600 text-white shadow-md'
                : 'bg-indigo-50/30 border-indigo-100 text-slate-705 hover:bg-indigo-50/75'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${activeTab === 'ai-coach' ? 'bg-indigo-700 text-white' : 'bg-indigo-50 text-indigo-650'}`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className={`text-[11px] font-black ${activeTab === 'ai-coach' ? 'text-white' : 'text-indigo-950'}`}>AI Coach Chamber</p>
                <p className={`text-[8.5px] font-mono ${activeTab === 'ai-coach' ? 'text-indigo-100' : 'text-indigo-600 animate-pulse'}`}>🤖 ACTIVE ONLINE</p>
              </div>
            </div>
            <p className={`text-[10px] font-semibold leading-relaxed ${activeTab === 'ai-coach' ? 'text-indigo-150' : 'text-slate-500'}`}>
              Gain diagnostic info on fibers, progressive loads & rest.
            </p>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)]">
          {mainSidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <button
          onClick={onLogout}
          id="btn-sidebar-logout"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 hover:text-rose-700 text-xs font-bold cursor-pointer transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Log Out System</span>
        </button>
      </div>
    </aside>
  );
}
