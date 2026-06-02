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
    <div className="space-y-6 bg-white p-2 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight">
          Active Community Challenges
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Join high-yield daily and weekly tasks to boost level rankings, acquire XP indicators, and claim loyalty reward points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Arena Challenges list */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-extrabold text-[#191A23] pl-1 text-sm text-left uppercase tracking-wider font-mono">Claim active trophies and rewards</h4>
          
          <div className="space-y-5">
            {challenges.map((ch) => (
              <div 
                key={ch.id} 
                className="bg-white rounded-[24px] p-5 border-2 border-[#191A23] shadow-[4px_4px_0px_0px_#191A23] flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-mono font-black bg-[#F3F3F3] text-[#191A23] border border-[#191A23] px-2 py-0.5 rounded uppercase tracking-wider">
                      {ch.type}
                    </span>
                    <h3 className="font-black text-[#191A23] text-sm leading-none">{ch.title}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold leading-relaxed">{ch.description}</p>
                  
                  {ch.joined && (
                    <div className="space-y-1.5 pt-1 max-w-sm">
                      <div className="flex justify-between text-[8px] font-black text-slate-500 font-mono">
                        <span>PROGRESS STATUS TRACK</span>
                        <span>{ch.progress}% COMPLETE</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-white border-2 border-[#191A23] overflow-hidden relative">
                        <div
                          className="h-full bg-[#B9FF66] border-r border-[#191A23] transition-all duration-300"
                          style={{ width: `${ch.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono font-black text-slate-450 block tracking-wider uppercase">RECHARGE BONUS</span>
                    <span className="text-xs font-black text-[#191A23]">+{ch.xpReward} XP</span>
                  </div>

                  {ch.progress >= 100 ? (
                    <button
                      onClick={() => onClaimReward(ch.id)}
                      id={`btn-claim-loot-${ch.id}`}
                      className="px-4 py-2 bg-[#B9FF66] text-[#191A23] border-2 border-[#191A23] font-black text-xs rounded-xl shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all"
                    >
                      Claim Loot
                    </button>
                  ) : ch.joined ? (
                    <button
                      onClick={() => onTriggerProgress(ch.id)}
                      id={`btn-push-progress-${ch.id}`}
                      className="px-4 py-2 bg-white text-[#191A23] border-2 border-[#191A23] font-black text-xs rounded-xl shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all"
                    >
                      Trigger Progress
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleJoin(ch.id)}
                      id={`btn-join-arena-${ch.id}`}
                      className="px-4 py-2 bg-[#B9FF66] text-[#191A23] border-2 border-[#191A23] font-black text-xs rounded-xl shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all"
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
        <div>
          <Leaderboard entries={leaderboard} />
        </div>

      </div>
    </div>
  );
}
