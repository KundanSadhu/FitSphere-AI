import { 
  Medal, Trophy, ShoppingBag, Settings, LogOut, X 
} from 'lucide-react';

interface MobileMoreOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function MobileMoreOverlay({ isOpen, onClose, activeTab, setActiveTab, onLogout }: MobileMoreOverlayProps) {
  if (!isOpen) return null;

  const moreItems = [
    { id: 'meditation', icon: Medal, label: 'Meditation Zone' },
    { id: 'competitions', icon: Trophy, label: 'Competitions' },
    { id: 'shop', icon: ShoppingBag, label: 'Supplements Shop' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div 
      id="mobile-more-overlay" 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end lg:hidden justify-center transition-all"
    >
      <div 
        id="mobile-more-overlay-content" 
        className="bg-white w-full max-w-md rounded-t-3xl p-6 space-y-4 border-t border-slate-205 shadow-2xl relative block animate-slide-up"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-black text-slate-900 text-sm tracking-tight">Explore FitSphere Modules</h3>
          <button 
            onClick={onClose} 
            id="mobile-overlay-close-btn" 
            className="p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic extra selection grid */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          {moreItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-more-btn-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  onClose();
                }}
                className={`flex items-center gap-2.5 p-3 rounded-2xl border text-xs font-bold transition-all text-left ${
                  isActive 
                    ? 'bg-indigo-600 @border-indigo-600 text-white shadow' 
                    : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <item.icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Logout action */}
        <div className="border-t border-slate-100 pt-4 pb-2">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            id="mobile-more-logout-btn"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-750 text-xs font-black transition-colors cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span>Log Out Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
