import { useState, useEffect } from 'react';
import { CupSoda, Plus, Minus, Trophy } from 'lucide-react';

interface WaterTrackerProps {
  goal?: number;
}

export const WaterTracker = ({ goal = 8 }: WaterTrackerProps) => {
  const [glasses, setGlasses] = useState<number>(0);

  // Persistence inside localStorage so Kundan's logging persists.
  useEffect(() => {
    const saved = localStorage.getItem('fitsphere_water');
    if (saved) {
      setGlasses(parseInt(saved, 10));
    }
  }, []);

  const updateWater = (val: number) => {
    const next = Math.max(0, val);
    setGlasses(next);
    localStorage.setItem('fitsphere_water', next.toString());
  };

  const pct = Math.min((glasses / goal) * 100, 100);

  return (
    <div id="water-tracker" className="p-6 rounded-[24px] bg-white border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23] text-left">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-black text-[#191A23] text-base">H2O Hydro Tracker</h3>
          <p className="text-xs text-slate-500 font-semibold">Keep muscle hydration cells at maximum volume</p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-[#B9FF66] border-2 border-[#191A23] flex items-center justify-center shadow-[1.5px_1.5px_0px_#191A23]">
          <CupSoda className="w-5 h-5 text-[#191A23]" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-[#191A23]">{glasses}</span>
          <span className="text-xs font-bold text-slate-500">/ {goal} glasses</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => updateWater(glasses - 1)}
            className="w-9 h-9 rounded-xl bg-white text-[#191A23] flex items-center justify-center border-2 border-[#191A23] hover:bg-[#F3F3F3] active:translate-y-0.5 transition-all shadow-[2px_2px_0px_#191A23]"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateWater(glasses + 1)}
            className="w-9 h-9 rounded-xl bg-[#B9FF66] text-[#191A23] flex items-center justify-center border-2 border-[#191A23] hover:bg-[#a5e65a] active:translate-y-0.5 transition-all shadow-[2px_2px_0px_#191A23]"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of water glasses indicators */}
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {Array.from({ length: goal }).map((_, i) => (
          <div
            key={i}
            onClick={() => updateWater(i + 1)}
            className={`h-11 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
              i < glasses
                ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23] shadow-[1.5px_1.5px_0px_#191A23] font-mono'
                : 'bg-[#F3F3F3] border-transparent text-slate-400 hover:border-[#191A23]/50'
            }`}
          >
            <CupSoda className={`w-4 h-4 ${i < glasses ? 'text-[#191A23]' : 'text-slate-400'}`} />
            <span className="text-[9px] font-black mt-0.5">{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Progress string */}
      <div className="text-xs flex items-center justify-between pt-1 text-slate-600 font-bold">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#B9FF66] border border-[#191A23]" />
          <span>{pct.toFixed(0)}% Hydrated</span>
        </div>
        {glasses >= goal && (
          <span className="bg-[#B9FF66] text-[#191A23] border border-[#191A23] px-2 py-0.5 rounded text-[10px] font-black flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" /> Daily target met!
          </span>
        )}
      </div>
    </div>
  );
};
