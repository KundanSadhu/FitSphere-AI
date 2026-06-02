import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit: string;
  colorClass?: string;
  bgClass?: string;
}

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  unit,
  colorClass = 'text-[#191A23]',
}: StatsCardProps) => {
  return (
    <div id={`stats-card-${label.toLowerCase().replace(/\s+/g, '-')}`} className="flex flex-col p-4 rounded-2xl bg-white border-2 border-[#191A23] shadow-[4px_4px_0px_0px_#191A23] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none select-none text-left">
      <div className="flex items-center justify-between gap-1 mb-2">
        <span className="text-[10px] font-black text-slate-500 tracking-wide uppercase">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-[#B9FF66] border border-[#191A23] flex items-center justify-center shadow-[1px_1px_0px_#191A23]">
          <Icon className="w-4 h-4 text-[#191A23]" />
        </div>
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-black text-[#191A23] tracking-tight">{value}</span>
        <span className="text-xs font-bold text-slate-500">{unit}</span>
      </div>
    </div>
  );
};
