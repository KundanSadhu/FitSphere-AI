import { useState } from 'react';
import { Dumbbell, ShieldCheck, HelpCircle } from 'lucide-react';

interface Muscle {
  id: string;
  name: string;
  exercises: string[];
  desc: string;
  color: string;
  svgPoints: string; // Coordinate bounds or representative markers for simple interaction
  indicatorX: number;
  indicatorY: number;
}

const MUSCLE_GROUPS: Muscle[] = [
  {
    id: 'chest',
    name: 'Chest (Pectorals)',
    exercises: ['Incline Dumbbell Press', 'Push-ups', 'Flat bench press', 'Cable chest flys'],
    desc: 'Provides upper chest volume and shoulder mechanics stability.',
    color: '#ef4444',
    svgPoints: '115,100 135,100 135,115 115,115',
    indicatorX: 125,
    indicatorY: 108
  },
  {
    id: 'shoulders',
    name: 'Shoulders (Deltoids)',
    exercises: ['Dumbbell Lateral Raises', 'Overhead Barbell Press', 'Face pulls'],
    desc: 'Enhances absolute lateral frame width and joint protection.',
    color: '#eab308',
    svgPoints: '95,100 110,105 105,115 90,110',
    indicatorX: 100,
    indicatorY: 108
  },
  {
    id: 'biceps',
    name: 'Biceps Brachii',
    exercises: ['Incline Dumbbell Curl', 'Hammer curls', 'Preacher Curls'],
    desc: 'Gives upper bicep peak and elbow flexion pulling force.',
    color: '#10b981',
    svgPoints: '85,120 100,120 95,140 80,140',
    indicatorX: 90,
    indicatorY: 130
  },
  {
    id: 'triceps',
    name: 'Triceps Brachii',
    exercises: ['Overhead Rope extensions', 'Close-grip pushes', 'Dips'],
    desc: 'Occupy 60% of upper arm size. Crucial for lockout push utility.',
    color: '#6366f1',
    svgPoints: '150,120 165,120 170,140 155,140',
    indicatorX: 160,
    indicatorY: 130
  },
  {
    id: 'core',
    name: 'Core & Rectus Abdominis',
    exercises: ['Plank Holds', 'Hanging Leg Raises', 'Ab Rollouts'],
    desc: 'Transfers kinetic energy across upper and lower extremes.',
    color: '#ec4899',
    svgPoints: '115,130 135,130 135,160 115,160',
    indicatorX: 125,
    indicatorY: 145
  },
  {
    id: 'quads',
    name: 'Quadriceps Femoris',
    exercises: ['Barbell Back Squats', 'Goblet squats', 'Leg Press'],
    desc: 'The colossal powerhouse muscle of the lower anterior leg.',
    color: '#3b82f6',
    svgPoints: '105,180 145,180 140,230 110,230',
    indicatorX: 125,
    indicatorY: 205
  },
  {
    id: 'calves',
    name: 'Calves (Gastrocnemius)',
    exercises: ['Standing Calf Raises', 'Seated raises', 'Jump-rope cycles'],
    desc: 'Crucial for ankle extensions, vertical jump, and shock damping.',
    color: '#8b5cf6',
    svgPoints: '110,250 140,250 135,290 115,290',
    indicatorX: 125,
    indicatorY: 270
  }
];

export const BodyModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle>(MUSCLE_GROUPS[0]);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);

  return (
    <div id="body-model-container" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-soft-sm">
      <div className="flex flex-col items-center">
        <div className="text-center mb-1">
          <h4 className="font-bold text-slate-900">3D-V Resonance Map</h4>
          <p className="text-xs text-slate-500">Tap hot-zones to activate recommended movement guides</p>
        </div>

        {/* Dynamic Vector Anatomy Figure */}
        <div className="relative w-full max-w-[280px] h-[340px] bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center p-4 overflow-hidden mt-3 shadow-inner shadow-black/40">
          
          {/* Subtle circuit backdrops */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-35" />

          <svg width="100%" height="100%" viewBox="50 50 150 260" className="z-10 relative overflow-visible select-none">
            {/* Elegant glowing drop shadow for active muscle state */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base Body Silhouette Outline */}
            <path
              d="M125,60 C132,60 135,65 135,70 C135,78 132,80 137,82 C145,82 153,88 156,92 C159,97 167,118 168,132 C169,142 165,145 163,143 C159,140 159,132 156,126 C155,124 153,122 151,123 C148,124 148,138 147,148 C145,160 148,175 145,185 C142,195 146,215 143,245 C140,275 137,285 137,298 C137,301 133,301 131,300 C128,298 128,285 125,285 C122,285 122,298 119,300 C117,301 113,301 113,298 C113,285 110,275 107,245 C104,215 108,195 105,185 C102,175 105,160 103,148 C102,138 102,124 99,123 C97,122 95,124 94,126 C91,132 91,140 87,143 C85,145 81,142 82,132 C83,118 91,97 94,92 C97,88 105,82 113,82 C118,80 115,78 115,70 C115,65 118,60 125,60 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2.5"
            />

            {/* Head Sphere */}
            <circle cx="125" cy="70" r="10" fill="#334155" />

            {/* Interactive highlight overlays on Muscle Groups */}
            {MUSCLE_GROUPS.map((m) => {
              const isSelected = selectedMuscle.id === m.id;
              const isHovered = hoveredMuscle === m.id;

              return (
                <g
                  key={m.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredMuscle(m.id)}
                  onMouseLeave={() => setHoveredMuscle(null)}
                  onClick={() => setSelectedMuscle(m)}
                >
                  {/* Glowing hotspot dot */}
                  <circle
                    cx={m.indicatorX}
                    cy={m.indicatorY}
                    r={isSelected ? 10 : isHovered ? 8 : 6}
                    fill={m.color}
                    fillOpacity={isSelected ? 0.9 : 0.6}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2 : 1}
                    filter={isSelected || isHovered ? 'url(#glow)' : undefined}
                    className="transition-all duration-300"
                  />
                  
                  {/* Core interactive mapping pulses */}
                  <circle
                    cx={m.indicatorX}
                    cy={m.indicatorY}
                    r={isSelected ? 18 : 12}
                    fill="transparent"
                    stroke={m.color}
                    strokeWidth="1.5"
                    strokeOpacity={isSelected ? 0.8 : 0}
                    className={`transition-all ${isSelected ? 'animate-ping' : ''}`}
                    style={{ transformOrigin: `${m.indicatorX}px ${m.indicatorY}px` }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Quick HUD indicator at the bottom */}
          <div className="absolute bottom-3 left-3 right-3 bg-slate-950/80 backdrop-blur border border-slate-800/80 px-3 py-1.5 rounded-lg flex items-center justify-between z-20">
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">HUD FOCUS</span>
            <span className="text-[11px] font-bold text-teal-400 uppercase tracking-tight font-mono">
              {hoveredMuscle ? MUSCLE_GROUPS.find(mo => mo.id === hoveredMuscle)?.name : selectedMuscle.name}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Exercise guide card */}
      <div className="flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
        <div>
          <div className="flex items-center gap-2.5 mb-2.5">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: selectedMuscle.color, boxShadow: `0 0 10px ${selectedMuscle.color}` }}
            />
            <h4 className="font-bold text-slate-950 tracking-tight text-lg">{selectedMuscle.name}</h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 pl-2 border-slate-300 mb-4">
            {selectedMuscle.desc}
          </p>

          <span className="text-xs font-bold text-slate-500 tracking-wider uppercase block mb-2">
            Target Pro-Hypertrophic Movements
          </span>
          <div className="space-y-2">
            {selectedMuscle.exercises.map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white px-3 py-2 rounded-xl border border-slate-100 shadow-sm text-sm"
              >
                <div className="w-6 h-6 rounded bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-extrabold font-mono">
                  {i + 1}
                </div>
                <span className="font-semibold text-slate-800">{ex}</span>
                <span className="ml-auto text-[10px] font-bold text-sky-600 flex items-center gap-0.5 bg-sky-50 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" /> APEX
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
          <Dumbbell className="w-4 h-4 text-slate-400" />
          <span>Movements automatically sync into Workout Schedule builder</span>
        </div>
      </div>
    </div>
  );
};
