import { useState } from 'react';
import { Dumbbell, ShieldCheck, Activity, Target } from 'lucide-react';

interface Muscle {
  id: string;
  name: string;
  exercises: string[];
  desc: string;
  color: string;
  points: {x: number, y: number}[];
}

const MUSCLE_GROUPS: Muscle[] = [
  {
    id: 'chest',
    name: 'Chest (Pectorals)',
    exercises: ['Incline Dumbbell Press', 'Push-ups', 'Flat bench press', 'Cable chest flys'],
    desc: 'Provides upper chest volume and shoulder mechanics stability.',
    color: '#f43f5e',
    points: [{x: 112, y: 102}, {x: 138, y: 102}],
  },
  {
    id: 'shoulders',
    name: 'Shoulders (Deltoids)',
    exercises: ['Dumbbell Lateral Raises', 'Overhead Barbell Press', 'Face pulls'],
    desc: 'Enhances absolute lateral frame width and joint protection.',
    color: '#f59e0b',
    points: [{x: 91, y: 96}, {x: 159, y: 96}],
  },
  {
    id: 'biceps',
    name: 'Biceps Brachii',
    exercises: ['Incline Dumbbell Curl', 'Hammer curls', 'Preacher Curls'],
    desc: 'Gives upper bicep peak and elbow flexion pulling force.',
    color: '#10b981',
    points: [{x: 88, y: 124}, {x: 162, y: 124}],
  },
  {
    id: 'triceps',
    name: 'Triceps Brachii',
    exercises: ['Overhead Rope extensions', 'Close-grip pushes', 'Dips'],
    desc: 'Occupy 60% of upper arm size. Crucial for lockout push utility.',
    color: '#6366f1',
    points: [{x: 81, y: 115}, {x: 169, y: 115}],
  },
  {
    id: 'core',
    name: 'Core & Rectus Abdominis',
    exercises: ['Plank Holds', 'Hanging Leg Raises', 'Ab Rollouts'],
    desc: 'Transfers kinetic energy across upper and lower extremes.',
    color: '#d946ef',
    points: [{x: 125, y: 130}, {x: 125, y: 150}],
  },
  {
    id: 'quads',
    name: 'Quadriceps Femoris',
    exercises: ['Barbell Back Squats', 'Goblet squats', 'Leg Press'],
    desc: 'The colossal powerhouse muscle of the lower anterior leg.',
    color: '#3b82f6',
    points: [{x: 110, y: 200}, {x: 140, y: 200}],
  },
  {
    id: 'calves',
    name: 'Calves (Gastrocnemius)',
    exercises: ['Standing Calf Raises', 'Seated raises', 'Jump-rope cycles'],
    desc: 'Crucial for ankle extensions, vertical jump, and shock damping.',
    color: '#8b5cf6',
    points: [{x: 108, y: 255}, {x: 142, y: 255}],
  }
];

export const BodyModel = () => {
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle>(MUSCLE_GROUPS[0]);
  const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null);

  return (
    <div id="body-model-container" className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 p-2 md:p-6 rounded-[24px] bg-white border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23]">
      <div className="flex flex-col">
        <div className="text-left mb-3 md:mb-4 px-1 md:px-2">
          <h4 className="flex items-center gap-2 font-bold text-slate-900 text-base md:text-lg">
            <Activity className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
            Anatomy Map
          </h4>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5 md:mt-1">Tap a muscle group to reveal targeting protocol</p>
        </div>

        {/* Dynamic Vector Anatomy Figure */}
        <div className="relative w-full h-[320px] md:h-[400px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-[20px] md:rounded-2xl border-2 border-slate-800 flex items-center justify-center p-2 md:p-4 overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]">
          
          {/* Subtle circuit backdrops */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <svg width="100%" height="100%" viewBox="50 40 150 280" className="z-10 relative overflow-visible select-none drop-shadow-2xl">
            {/* Elegant glowing drop shadow for active muscle state */}
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Base Body Silhouette Outline */}
            <path
              d="M125,60 C132,60 135,65 135,70 C135,78 132,80 137,82 C145,82 153,88 156,92 C159,97 167,118 168,132 C169,142 165,145 163,143 C159,140 159,132 156,126 C155,124 153,122 151,123 C148,124 148,138 147,148 C145,160 148,175 145,185 C142,195 146,215 143,245 C140,275 137,285 137,298 C137,301 133,301 131,300 C128,298 128,285 125,285 C122,285 122,298 119,300 C117,301 113,301 113,298 C113,285 110,275 107,245 C104,215 108,195 105,185 C102,175 105,160 103,148 C102,138 102,124 99,123 C97,122 95,124 94,126 C91,132 91,140 87,143 C85,145 81,142 82,132 C83,118 91,97 94,92 C97,88 105,82 113,82 C118,80 115,78 115,70 C115,65 118,60 125,60 Z"
              fill="url(#bodyGrad)"
              stroke="#334155"
              strokeWidth="2.5"
            />
            
            {/* Wireframe inner lines for cyborg/tech look */}
            <path d="M125,82v28" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.6"/>
            <path d="M105,108 Q125,125 145,108" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>
            <path d="M102,120 Q125,135 148,120" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>
            <path d="M125,128 v45" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" fill="none"/>
            <path d="M117,138 h16 M117,150 h16 M118,162 h14" stroke="#334155" strokeWidth="1" opacity="0.5" fill="none"/>
            
            {/* Arm lines */}
            <path d="M91,105 C85,120 85,135 88,140" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>
            <path d="M159,105 C165,120 165,135 162,140" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>
            
            {/* Leg lines */}
            <path d="M115,185 Q105,215 108,245" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>
            <path d="M135,185 Q145,215 142,245" stroke="#334155" strokeWidth="1" opacity="0.6" fill="none"/>

            {/* Head Sphere Details */}
            <circle cx="125" cy="70" r="10" fill="#1e293b" />
            <circle cx="125" cy="70" r="10" stroke="#334155" strokeWidth="1.5" fill="none" />
            <path d="M117,70 h16" stroke="#334155" strokeWidth="1" opacity="0.5"/>
            <path d="M125,62 v16" stroke="#334155" strokeWidth="1" opacity="0.5"/>

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
                  {m.points.map((pt, i) => (
                    <g key={`${m.id}-${i}`}>
                      {isSelected && m.points.length > 1 && i === 0 && (
                        <path 
                          d={`M${m.points[0].x},${m.points[0].y} Q125,${m.points[0].y - 20} ${m.points[1].x},${m.points[1].y}`} 
                          stroke={m.color} 
                          strokeWidth="1.5" 
                          fill="none" 
                          strokeDasharray="4 4"
                          className="opacity-50 transition-opacity duration-700"
                        />
                      )}
                      {/* Outer target reticle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 18 : isHovered ? 14 : 0}
                        fill="transparent"
                        stroke={m.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="transition-all duration-500 ease-out origin-center"
                        style={{ transformOrigin: `${pt.x}px ${pt.y}px`, transform: isSelected ? 'rotate(90deg)' : 'rotate(0deg)' }}
                      />
                      
                      {/* Glowing hotspot dot */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 8 : isHovered ? 8 : 6}
                        fill={m.color}
                        fillOpacity={isSelected ? 1 : 0.8}
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 3 : 2}
                        filter={isSelected || isHovered ? 'url(#glow)' : undefined}
                        className="transition-all duration-300"
                      />
                      
                      {/* Core interactive mapping pulses */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 24 : 15}
                        fill="transparent"
                        stroke={m.color}
                        strokeWidth="2"
                        strokeOpacity={isSelected ? 0.6 : 0}
                        className={`transition-all ${isSelected ? 'animate-ping duration-1000' : ''}`}
                        style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                      />
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>

          {/* Quick HUD indicator at the bottom */}
          <div className="absolute bottom-4 left-4 min-w-[120px] bg-slate-950/90 backdrop-blur-md border border-slate-700/80 px-3 py-2 rounded-xl flex flex-col z-20 shadow-lg group pointer-events-none transition-all">
            <span className="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-0.5 flex items-center gap-1">
              <Target className="w-3 h-3 text-emerald-400" /> Focus Target
            </span>
            <span className="text-xs font-black text-white uppercase tracking-tight">
              {hoveredMuscle ? MUSCLE_GROUPS.find(mo => mo.id === hoveredMuscle)?.name : selectedMuscle.name}
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Exercise guide card */}
      <div className="flex flex-col justify-between p-4 md:p-6 rounded-[20px] md:rounded-2xl bg-slate-50 border border-slate-200 shadow-sm relative overflow-hidden">
        
        {/* Decorative background element corresponding to muscle color */}
        <div 
          className="absolute -top-16 -right-16 w-32 h-32 md:w-48 md:h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700" 
          style={{ backgroundColor: selectedMuscle.color }} 
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-md transform transition-all duration-300 scale-100"
              style={{ backgroundColor: selectedMuscle.color, boxShadow: `0 4px 15px -3px ${selectedMuscle.color}80` }}
            >
              <Activity className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 tracking-tight text-lg md:text-xl">{selectedMuscle.name}</h4>
              <p className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-widest">{selectedMuscle.id} Analysis</p>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium mb-4 md:mb-6 mt-2 md:mt-4">
            {selectedMuscle.desc}
          </p>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1.5 mb-4 isolate">
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase pl-3 pt-2 block mb-2">
              Primary Exercises
            </span>
            <div className="space-y-1">
              {selectedMuscle.exercises.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-default"
                >
                  <div 
                    className="w-6 h-6 rounded bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-black group-hover:text-white transition-colors"
                    style={{ '--hover-color': selectedMuscle.color } as any}
                  >
                    <style>{`.group:hover > div { background-color: var(--hover-color); }`}</style>
                    0{i + 1}
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 mt-auto flex items-start gap-2.5 text-xs font-medium text-slate-500 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 relative z-10">
          <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="leading-snug">Movements shown are optimized for <strong className="text-slate-700">hypertrophic stimulation</strong> and automatically factor into your daily workout splits.</p>
        </div>
      </div>
    </div>
  );
};
