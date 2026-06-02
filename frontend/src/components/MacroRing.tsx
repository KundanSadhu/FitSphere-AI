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

  const roundedCurrent = typeof current === 'number' ? Math.round(current) : 0;
  const displayLength = roundedCurrent.toString().length;

  // Dynamically size text based on characters to prevent any overlapping or line wrapping
  const numberTextClass = displayLength >= 4
    ? "text-xs font-black text-slate-900 tracking-tight leading-none"
    : displayLength === 3
    ? "text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-none"
    : "text-base sm:text-lg font-black text-slate-900 tracking-normal leading-none";

  return (
    <div className="flex flex-col items-center p-3 rounded-2xl bg-white border-2 border-[#191A23] shadow-[3px_3px_0px_#191A23] w-full min-w-[75px] max-w-[125px] transition-all duration-200">
      <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f3f3" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="34"
            fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-1">
          <p className={`${numberTextClass} text-center truncate w-full text-[#191A23]`}>{roundedCurrent}</p>
          <p className="text-[8px] font-black text-slate-500 mt-0.5 uppercase tracking-wider">{unit}</p>
        </div>
      </div>
      <p className="text-xs font-black text-[#191A23] tracking-tight mt-2.5 leading-none capitalize">{label}</p>
      <p className="text-[9px] text-slate-600 font-bold tracking-tight mt-1 whitespace-nowrap">
        target: <span className="font-mono text-[#191A23]">{target}{unit}</span>
      </p>
    </div>
  );
};
