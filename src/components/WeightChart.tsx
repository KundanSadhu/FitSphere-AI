import { useState } from 'react';
import { AreaChart, TrendingDown, HelpCircle, Activity } from 'lucide-react';

interface WeightPoint {
  date: string;
  weight: number;
}

interface WeightChartProps {
  data: WeightPoint[];
  targetWeight?: number;
}

export const WeightChart = ({ data, targetWeight = 68 }: WeightChartProps) => {
  const [activePoint, setActivePoint] = useState<WeightPoint | null>(null);

  // Compute boundaries for continuous SVG plotting
  const weights = data.map((d) => d.weight);
  const minWeight = Math.min(...weights, targetWeight) - 3;
  const maxWeight = Math.max(...weights, targetWeight) + 3;
  const range = maxWeight - minWeight;

  // Render SVG Coordinates
  const width = 500;
  const height = 150;
  const paddingX = 40;
  const paddingY = 20;

  const getX = (index: number) => {
    return paddingX + (index * (width - paddingX * 2)) / (data.length - 1);
  };

  const getY = (weight: number) => {
    return height - paddingY - ((weight - minWeight) * (height - paddingY * 2)) / range;
  };

  // Generate SVG Path
  const points = data.map((d, i) => `${getX(i).toFixed(1)},${getY(d.weight).toFixed(1)}`);
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `${pathD} L ${getX(data.length - 1).toFixed(1)},${(height - paddingY).toFixed(1)} L ${getX(0).toFixed(1)},${(height - paddingY).toFixed(1)} Z`;

  // Get target line Y coordinate
  const targetY = getY(targetWeight);

  return (
    <div id="weight-history-chart" className="p-5 bg-white border border-slate-100 rounded-3xl shadow-soft-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-extrabold text-slate-900 tracking-tight text-base">Continuous Mass Logging</h4>
          <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">Historical weight metrics tracker</p>
        </div>
        <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>-3.2 kg overall decline</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden select-none">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Subtle horizontal grid markings */}
          {[0, 0.5, 1].map((ratio) => {
            const wVal = minWeight + ratio * range;
            const yCoord = getY(wVal);
            return (
              <g key={ratio} className="opacity-45">
                <line
                  x1={paddingX}
                  y1={yCoord}
                  x2={width - paddingX}
                  y2={yCoord}
                  stroke="#f1f5f9"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={yCoord + 3}
                  fontFamily="monospace"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#94a3b8"
                  textAnchor="end"
                >
                  {wVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Goal weight line */}
          <line
            x1={paddingX}
            y1={targetY}
            x2={width - paddingX}
            y2={targetY}
            stroke="#ef4444"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.6"
          />
          <text
            x={width - paddingX + 5}
            y={targetY + 3}
            fontFamily="monospace"
            fontSize="8"
            fontWeight="bold"
            fill="#ef4444"
            fillOpacity="0.8"
          >
            GOAL:{targetWeight}kg
          </text>

          {/* Area under curve gradient */}
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#chartGlow)" />

          {/* Line stroke */}
          <path d={pathD} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data Points dot overlays */}
          {data.map((d, i) => (
            <circle
              key={i}
              cx={getX(i)}
              cy={getY(d.weight)}
              r={activePoint?.date === d.date ? 6 : 3.5}
              fill={activePoint?.date === d.date ? '#ffffff' : '#4f46e5'}
              stroke="#4f46e5"
              strokeWidth="2.5"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setActivePoint(d)}
            />
          ))}
        </svg>

        {/* Hover telemetry tooltip element */}
        {activePoint && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-slate-950/90 text-white border border-slate-800 backdrop-blur font-mono px-3 py-1.5 rounded-lg text-[10px] space-y-0.5 pointer-events-none shadow-md z-30 flex items-center gap-3">
            <div>
              <span className="text-slate-400 uppercase tracking-widest block font-sans text-[8px] font-bold">LOG DATE</span>
              <span className="font-extrabold tracking-wide">{activePoint.date}</span>
            </div>
            <div className="w-px h-5 bg-slate-800" />
            <div>
              <span className="text-slate-400 uppercase tracking-widest block font-sans text-[8px] font-bold">MASS</span>
              <span className="font-extrabold text-indigo-300">{activePoint.weight.toFixed(1)} kg</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 text-[9px] font-bold text-slate-400 font-mono tracking-wider px-2 border-t pt-3 border-slate-50 uppercase">
        <span>May 18</span>
        <span>May 20</span>
        <span>May 22</span>
        <span>May 24</span>
        <span>May 26</span>
        <span>Today</span>
      </div>
    </div>
  );
};
