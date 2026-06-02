import { User } from '../types';
import { Settings as SettingsIcon, Bell, User as UserIcon, RefreshCw, Scale, Heart, AlertCircle } from 'lucide-react';

interface SettingsProps {
  user: User;
  saveUserAndSync: (u: User) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (val: boolean) => void;
  onNotify: (msg: string) => void;
  onRetriggerOnboarding: () => void;
}

export function Settings({
  user,
  saveUserAndSync,
  notificationsEnabled,
  setNotificationsEnabled,
  onNotify,
  onRetriggerOnboarding
}: SettingsProps) {
  
  const handleLevelUpManualSim = () => {
    const nextXp = user.xp + 250;
    let nextLevel = user.level;
    let nextTargetXp = user.targetXp;
    
    if (nextXp >= user.targetXp) {
      nextLevel += 1;
      nextTargetXp = Math.floor(user.targetXp * 1.5);
      onNotify(`🎉 LEVEL UP! Welcome to FitSphere Level ${nextLevel}!`);
    } else {
      onNotify('Simulated +250 XP reward added!');
    }

    saveUserAndSync({
      ...user,
      xp: nextXp,
      level: nextLevel,
      targetXp: nextTargetXp
    });
  };

  return (
    <div className="max-w-4xl bg-white p-2 space-y-6 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-600" />
          Settings Panel
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Access personal credentials, notification channels, biometric resets, and physical target optimizations under a unified settings layout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column Settings Tabs & Details Summary */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={user.photoUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-2xl object-cover border border-slate-150"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-black text-indigo-600 uppercase tracking-widest block">LEVEL {user.level} ATHLETE</span>
                <span className="font-extrabold text-slate-900 text-sm truncate block leading-tight">{user.name}</span>
                <span className="text-[9px] text-slate-450 block font-semibold truncate mt-0.5">{user.email}</span>
              </div>
            </div>

            <div className="border-t border-slate-50 pt-3 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Streak loyalty count</span>
                <span className="font-black text-slate-800">{user.streak} Days</span>
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Reward Points balance</span>
                <span className="font-black text-amber-500">{user.points} PTS</span>
              </div>
            </div>

            <button
              onClick={handleLevelUpManualSim}
              id="btn-settings-sim-xp"
              className="w-full py-2 px-3 border border-slate-205 hover:border-indigo-600 text-[10px] font-black text-slate-650 hover:text-indigo-600 rounded-xl transition-all font-mono tracking-wider uppercase cursor-pointer text-center"
            >
              Simulate Progress +250 XP
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm">
            <div className="flex items-start gap-2 text-indigo-700 bg-indigo-50/50 border border-indigo-100/50 p-3 rounded-2xl">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed font-semibold">
                <b className="font-black block text-indigo-900 mb-0.5">Commercial Ready Environment</b>
                Strictly white background parameters, local offline persistence models, and responsive mobile alignments activated.
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns Config forms */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Core Profile Info */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-slate-400" />
              Real-time Credentials
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-450 tracking-wider uppercase block mb-1">REAL NAME</label>
                <input
                  type="text"
                  value={user.name}
                  id="input-settings-name-field"
                  onChange={(e) => saveUserAndSync({ ...user, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none text-xs font-bold bg-white focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-450 tracking-wider uppercase block mb-1">ATHLETE EMAIL</label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none text-xs font-bold bg-slate-50 cursor-not-allowed text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Biomechanical Notifications */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-400" />
              Notification Settings
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-xs text-slate-920 block">Push workout splits alerts</span>
                <span className="text-[9px] text-slate-400 font-semibold leading-normal block max-w-sm">
                  Receive live triggers on target muscular recruitment set updates, nutritional goals, and rest periods limits.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                id="checkbox-settings-push-alert"
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4.5 h-4.5 text-indigo-600 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Section 3: Metric resets and Retrigger Onboarding */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-soft-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-slate-400" />
              Athlete Reset Control
            </h3>
            
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              If your current physical goals, orthopedic alignment limits, or strict dietary configurations have shifted, you can re-target variables via standard biometric onboarding.
            </p>

            <div className="pt-2">
              <button
                onClick={onRetriggerOnboarding}
                id="btn-settings-onboarding-restart"
                className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-launch Physical Setup Questionnaire</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
