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
  colorClass = 'text-blue-500',
  bgClass = 'bg-blue-50/50 border-blue-100',
}: StatsCardProps) => {
  return (
    <div id={`stats-card-${label.toLowerCase().replace(/\s+/g, '-')}`} className={`flex flex-col p-4 rounded-xl border shadow-soft-sm ${bgClass} transition-transform hover:scale-[1.01]`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">{label}</span>
        <Icon className={`w-5 h-5 ${colorClass}`} />
      </div>
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
        <span className="text-xs font-medium text-slate-500">{unit}</span>
      </div>
    </div>
  );
};
