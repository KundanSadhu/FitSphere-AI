interface MacroRingProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export const MacroRing = ({ label, current, target, unit, color }: MacroRingProps) => {
  const percentage = Math.min((current / target) * 100, 100);
  const circumference = 2 * Math.PI * 34; // r=34
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 border border-slate-100/50 shadow-inner w-full min-w-[75px] max-w-[120px]">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34"
            fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-base font-extrabold text-slate-900 tracking-tight leading-none">{current}</p>
          <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">{unit}</p>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-900 tracking-tight mt-2.5 leading-none">{label}</p>
      <p className="text-[10px] text-slate-400 font-semibold tracking-tight mt-1">target: {target}{unit}</p>
    </div>
  );
};
