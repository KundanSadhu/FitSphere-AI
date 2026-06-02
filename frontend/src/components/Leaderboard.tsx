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
    <div id="leaderboard-podium" className="p-5 bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_0px_#191A23] text-left">
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-[#191A23]">
        <div>
          <h4 className="font-extrabold text-[#191A23] tracking-tight text-base">Ecosystem Leaderboard</h4>
          <p className="text-[10px] font-black text-slate-500 font-mono uppercase tracking-wider">Rankings based on XP</p>
        </div>
        <Trophy className="w-5 h-5 text-[#191A23]" />
      </div>

      <div className="space-y-3">
        {entries.map((ent) => {
          const isTop3 = ent.rank <= 3;
          
          let medalClass = '';
          if (ent.rank === 1) medalClass = 'bg-[#B9FF66] border-[#191A23] text-[#191A23] font-black';
          if (ent.rank === 2) medalClass = 'bg-white border-[#191A23] text-[#191A23] font-black';
          if (ent.rank === 3) medalClass = 'bg-amber-100 border-[#191A23] text-[#191A23] font-black';

          return (
            <div
              key={ent.rank}
              className={`flex items-center gap-3.5 p-3 rounded-2xl border-2 border-[#191A23] transition-all ${
                ent.isUser
                  ? 'bg-[#B9FF66] shadow-[2px_2px_0px_#191A23]'
                  : 'bg-white hover:bg-[#F3F3F3]'
              }`}
            >
              {/* Rank visual indicator */}
              <div className={`w-8 h-8 rounded-full text-xs font-mono font-black flex items-center justify-center border-2 shrink-0 ${
                isTop3 ? medalClass : 'bg-white border-[#191A23] text-[#191A23]'
              }`}>
                {ent.rank}
              </div>

              {/* Avatar image */}
              <img
                src={ent.photo}
                alt={ent.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-xl object-cover shrink-0 border-2 border-[#191A23] shadow-[1px_1px_0px_#191A23]"
              />

              {/* Name Details */}
              <div className="min-w-0 flex-1">
                <p className={`text-xs tracking-tight truncate font-black text-[#191A23]`}>
                  {ent.name}
                </p>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest font-mono">
                  {ent.isUser ? 'YOU' : 'ATHLETE'}
                </span>
              </div>

              {/* Score / XP indicators */}
              <div className="text-right shrink-0">
                <p className="text-xs font-black text-[#191A23] font-mono">
                  {ent.score.toLocaleString()} <span className="text-[10px] text-[#191A23] font-bold">XP</span>
                </p>
                <div className="flex items-center justify-end gap-1 text-[10px] font-black text-slate-500">
                  <Star className="w-3.5 h-3.5 text-[#191A23] fill-[#B9FF66]" />
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
