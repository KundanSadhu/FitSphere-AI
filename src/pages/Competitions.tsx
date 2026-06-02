import { Trophy, Check } from 'lucide-react';
import { Challenge } from '../types';
import { Leaderboard } from '../components/Leaderboard';

interface CompetitionsProps {
  challenges: Challenge[];
  leaderboard: any[];
  userPoints: number;
  onToggleJoin: (id: string) => void;
  onClaimReward: (id: string) => void;
  onTriggerProgress: (id: string) => void;
}

export function Competitions({
  challenges,
  leaderboard,
  onToggleJoin,
  onClaimReward,
  onTriggerProgress
}: CompetitionsProps) {
  return (
    <div className="space-y-6 bg-white p-2">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Ecosystem Active Challenges
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Join high-yield daily and weekly tasks to boost level rankings, acquire XP indicators, and claim loyalty reward points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Arena Challenges list */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-extrabold text-slate-900 pl-1 text-sm text-left">Claim active trophies and loot</h4>
          
          <div className="space-y-4.5">
            {challenges.map((ch) => (
              <div 
                key={ch.id} 
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wider">
                      {ch.type}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-none">{ch.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">{ch.description}</p>
                  
                  {ch.joined && (
                    <div className="space-y-1 pt-1 max-w-sm">
                      <div className="flex justify-between text-[8px] font-bold text-slate-400 font-mono">
                        <span>PROGRESS STATUS TRACK</span>
                        <span>{ch.progress}% COMPLETE</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 transition-all duration-300"
                          style={{ width: `${ch.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block tracking-wider uppercase">REPLY BONUS</span>
                    <span className="text-xs font-black text-indigo-700">+{ch.xpReward} XP</span>
                  </div>

                  {ch.progress >= 100 ? (
                    <button
                      onClick={() => onClaimReward(ch.id)}
                      id={`btn-claim-loot-${ch.id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow cursor-pointer transition-colors"
                    >
                      Claim Loot
                    </button>
                  ) : ch.joined ? (
                    <button
                      onClick={() => onTriggerProgress(ch.id)}
                      id={`btn-push-progress-${ch.id}`}
                      className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs rounded-xl cursor-pointer transition-colors hover:bg-indigo-150"
                    >
                      Trigger Progress
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleJoin(ch.id)}
                      id={`btn-join-arena-${ch.id}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow cursor-pointer transition-colors"
                    >
                      Join Arena
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard widgets */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm">
          <Leaderboard entries={leaderboard} />
        </div>

      </div>
    </div>
  );
}
