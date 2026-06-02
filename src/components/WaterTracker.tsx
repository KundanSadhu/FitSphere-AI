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
    <div id="water-tracker" className="p-6 rounded-2xl bg-white border border-slate-100 shadow-soft-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 tracking-tight">H2O Hydro Tracker</h3>
          <p className="text-xs text-slate-500">Volumize muscle cell hydration levels</p>
        </div>
        <CupSoda className="w-6 h-6 text-sky-500 fill-sky-100" />
      </div>

      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-900">{glasses}</span>
          <span className="text-sm font-semibold text-slate-400">/ {goal} glasses</span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => updateWater(glasses - 1)}
            className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center border hover:bg-slate-100 cursor-pointer text-sm font-bold transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => updateWater(glasses + 1)}
            className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 cursor-pointer text-sm font-bold transition-shadow shadow-md shadow-sky-200"
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
            className={`h-11 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all ${
              i < glasses
                ? 'bg-sky-50 border-sky-300 text-sky-600 shadow-soft-sm'
                : 'bg-slate-50 border-transparent text-slate-400 hover:border-slate-300'
            }`}
          >
            <CupSoda className={`w-5 h-5 ${i < glasses ? 'fill-sky-400 text-sky-600' : 'text-slate-300'}`} />
            <span className="text-[9px] font-bold mt-0.5">{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Progress string */}
      <div className="text-xs flex items-center justify-between pt-1 text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-sky-500" />
          <span>{pct.toFixed(0)}% reached</span>
        </div>
        {glasses >= goal && (
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 fill-emerald-100" /> Daily Target Met!
          </span>
        )}
      </div>
    </div>
  );
};
