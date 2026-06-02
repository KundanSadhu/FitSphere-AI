import { TrendingDown, CircleDashed } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Dot } from 'recharts';
import { motion } from 'motion/react';

interface WeightPoint {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightPoint[];
  targetWeight?: number;
}

export const WeightChart = ({ data, targetWeight = 68 }: WeightChartProps) => {
  const minWeight = Math.min(...data.map(d => d.weight), targetWeight) - 2;
  const maxWeight = Math.max(...data.map(d => d.weight), targetWeight) + 2;

  // Transform data for recharts
  const chartData = data.map(d => ({
    name: d.date,
    weight: d.weight,
    goal: targetWeight
  }));

  // Heatmap data - simulate activity logic
  const today = new Date();
  const past30Days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    const active = i % 3 === 0 || i % 4 === 1; // Simulated active days
    return active;
  });

  return (
    <div id="weight-history-chart" className="flex flex-col gap-6 p-4 md:p-6 bg-white rounded-3xl">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-black text-[#191A23] tracking-tight text-xl uppercase">Continuous Mass Logging</h4>
          <p className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">Historical weight metrics & activity tracker</p>
        </div>
        <div className="flex items-center gap-2 text-[#191A23] font-black text-xs bg-[#B9FF66] border-2 border-[#191A23] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#191A23]">
          <TrendingDown className="w-4 h-4" />
          <span>-3.2 kg overall</span>
        </div>
      </div>

      {/* Main Area Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-[280px] mt-4 select-none"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#191A23" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#191A23" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B', fontWeight: 700 }}
              dy={10}
            />
            <YAxis 
              domain={[minWeight, maxWeight]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748B', fontWeight: 700 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '16px', 
                border: '2px solid #191A23', 
                boxShadow: '4px 4px 0px #191A23',
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '12px'
              }}
              itemStyle={{ color: '#191A23' }}
              labelStyle={{ color: '#64748B', marginBottom: '4px' }}
            />
            <ReferenceLine y={targetWeight} stroke="#191A23" strokeDasharray="3 3" strokeWidth={2} label={{ position: 'right', value: `GOAL: ${targetWeight}kg`, fill: '#191A23', fontSize: 11, fontWeight: 'bold' }} />
            <Area 
              type="monotone" 
              dataKey="weight" 
              stroke="#191A23" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorWeight)" 
              activeDot={{ r: 6, fill: "#B9FF66", stroke: "#191A23", strokeWidth: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Consistency Heatmap */}
      <div className="mt-4 pt-6 border-t-2 border-slate-100">
        <h4 className="font-extrabold text-[#191A23] mb-4 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
          <CircleDashed className="w-4 h-4 text-slate-400" />
          30-Day Activity Consistency
        </h4>
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {past30Days.map((isActive, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.02, ease: "easeOut" }}
              title={`Day ${i + 1}: ${isActive ? 'Active' : 'Rest'}`}
              className={`w-6 h-6 md:w-8 md:h-8 rounded-[8px] border-2 transition-all cursor-pointer hover:scale-110 ${
                isActive 
                  ? 'bg-[#B9FF66] border-[#191A23] shadow-[1.5px_1.5px_0px_#191A23]' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
