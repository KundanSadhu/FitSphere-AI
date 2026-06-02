import { Trophy, Award, Flame, Star } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  name: string;
  score: number;
  points: number;
  photo: string;
  isUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardUser[];
}

export const Leaderboard = ({ entries }: LeaderboardProps) => {
  return (
    <div id="leaderboard-podium" className="p-5 bg-white border border-slate-100 rounded-3xl shadow-soft-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
        <div>
          <h4 className="font-extrabold text-slate-900 tracking-tight text-base">Aesthetic Leaderboards</h4>
          <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Level XP adaptive ranking</p>
        </div>
        <Trophy className="w-5 h-5 text-amber-500 fill-amber-100" />
      </div>

      <div className="space-y-2.5">
        {entries.map((ent) => {
          const isTop3 = ent.rank <= 3;
          
          let medalClass = '';
          if (ent.rank === 1) medalClass = 'bg-amber-100 border-amber-300 text-amber-700 font-bold';
          if (ent.rank === 2) medalClass = 'bg-slate-150 border-slate-300 text-slate-700 font-bold';
          if (ent.rank === 3) medalClass = 'bg-orange-100 border-orange-200 text-orange-700 font-bold';

          return (
            <div
              key={ent.rank}
              className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all ${
                ent.isUser
                  ? 'border-indigo-200 bg-indigo-50/20 shadow-none'
                  : 'border-slate-50 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {/* Rank visual indicator */}
              <div className={`w-7 h-7 rounded-full text-xs font-mono font-extrabold flex items-center justify-center border shrink-0 ${
                isTop3 ? medalClass : 'bg-white border-transparent text-slate-500'
              }`}>
                {ent.rank}
              </div>

              {/* Avatar image */}
              <img
                src={ent.photo}
                alt={ent.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-250 shadow-sm"
              />

              {/* Name Details */}
              <div className="min-w-0 flex-1">
                <p className={`text-sm tracking-tight truncate ${ent.isUser ? 'font-black text-indigo-900' : 'font-bold text-slate-800'}`}>
                  {ent.name}
                </p>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  {ent.isUser ? 'YOU' : 'ATHLETE'}
                </span>
              </div>

              {/* Score / XP indicators */}
              <div className="text-right shrink-0">
                <p className="text-sm font-extrabold text-slate-900 font-mono">
                  {ent.score.toLocaleString()} <span className="text-[10px] text-slate-400 font-bold">XP</span>
                </p>
                <div className="flex items-center justify-end gap-1.5 text-[10px] font-bold text-slate-500">
                  <Star className="w-3.5 h-3.5 text-indigo-400 fill-indigo-100" />
                  <span>{ent.points} pts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
