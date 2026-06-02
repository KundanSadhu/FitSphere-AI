import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Droplet, Moon, Eye } from 'lucide-react';

export const MeditationTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(600); // default 10min
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathCycle, setBreathCycle] = useState(0); // 0-4s Inhale, 4-8s Hold, 8-12s Exhale
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  // Countdown timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      setSessionsCompleted((prev) => prev + 1);
      // Give Kundan points for finishing!
      const currentPts = parseInt(localStorage.getItem('fitsphere_points') || '450', 10);
      localStorage.setItem('fitsphere_points', (currentPts + 120).toString());
    }
    return () => clearInterval(timer);
  }, [isActive, secondsLeft]);

  // Breathing loop visualizer logic
  useEffect(() => {
    let cycleId: NodeJS.Timeout;
    if (isActive) {
      cycleId = setInterval(() => {
        setBreathCycle((prev) => {
          const next = (prev + 1) % 12; // 12-second complete circle
          if (next < 4) {
            setBreathState('Inhale');
          } else if (next < 8) {
            setBreathState('Hold');
          } else {
            setBreathState('Exhale');
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(cycleId);
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(600);
    setBreathCycle(0);
    setBreathState('Inhale');
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
  };

  // Compute breathing vector diameter based on state
  let scale = 1.0;
  if (isActive) {
    if (breathState === 'Inhale') {
      // expand from 1.0 up to 1.7
      scale = 1.0 + (breathCycle * 0.175);
    } else if (breathState === 'Hold') {
      scale = 1.7;
    } else {
      // shrink back down to 1.0
      scale = 1.7 - ((breathCycle - 8) * 0.175);
    }
  }

  return (
    <div id="meditation-timer" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-slate-950 border border-slate-900 shadow-xl text-white relative overflow-hidden">
      {/* Absolute futuristic star pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

      {/* Breathing Sphere Visualization Box */}
      <div className="flex flex-col items-center justify-center p-8 bg-slate-900/60 rounded-2xl border border-slate-800/50 min-h-[300px] h-full relative">
        <div className="absolute top-4 left-4 flex items-center gap-1">
          <Moon className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Mind Sync Chamber</span>
        </div>

        {/* Pulsing Breathing Bubble Element */}
        <div className="relative w-44 h-44 flex items-center justify-center z-10">
          {/* Outermost particle glowing rings */}
          <div
            className="absolute rounded-full border border-violet-500/20 bg-violet-600/5 transition-transform duration-1000 ease-out"
            style={{
              width: '100%',
              height: '100%',
              transform: `scale(${scale})`,
              boxShadow: `0 0 ${scale * 20}px rgba(139, 92, 246, 0.15)`
            }}
          />
          {/* Mid glow ring */}
          <div
            className="absolute rounded-full border border-indigo-500/30 bg-indigo-600/10 transition-transform duration-1000 ease-out"
            style={{
              width: '75%',
              height: '75%',
              transform: `scale(${scale * 0.95})`,
              boxShadow: `0 0 ${scale * 30}px rgba(99, 102, 241, 0.25)`
            }}
          />
          {/* Innermost central core */}
          <div
            className="absolute rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center transition-transform duration-1000 ease-out shadow-lg shadow-purple-500/30 text-center"
            style={{
              width: '45%',
              height: '45%',
              transform: `scale(${scale * 0.9})`
            }}
          >
            <Heart className="w-5 h-5 text-white stroke-[2.5] animate-pulse" />
            <span className="text-[10px] font-extrabold font-mono tracking-tight text-white mt-1 uppercase">
              {isActive ? breathState : 'READY'}
            </span>
          </div>
        </div>

        {/* Visual breathing instructions ticker */}
        <div className="text-center mt-12 z-10">
          <p className="text-xs font-mono font-semibold tracking-widest text-indigo-300 uppercase">
            {isActive ? `${breathState.toUpperCase()} STIMULUS: ${breathCycle % 4 + 1}s` : 'START BREATHING REGIMEN'}
          </p>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-normal">
            {isActive
              ? "Follow the expansion loop: Inhale 4s, Hold 4s, Exhale 4s."
              : "Calibrate your mind-muscle link. Promotes deep tissue oxygenation."}
          </p>
        </div>
      </div>

      {/* Configuration and stats controller card */}
      <div className="flex flex-col justify-between p-6 bg-slate-900/60 rounded-2xl border border-slate-800/50">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-extrabold text-white tracking-tight text-lg">Ecosystem Zen Focus</h4>
            <span className="text-[10px] bg-indigo-950 border border-indigo-900/60 font-bold px-2 py-0.5 rounded text-indigo-300 font-mono tracking-wider">
              {sessionsCompleted} DONE
            </span>
          </div>

          <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mb-3 font-mono">
            SELECT TIMER DURATION
          </span>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[180, 300, 600].map((sec) => (
              <button
                key={sec}
                disabled={isActive}
                onClick={() => setSecondsLeft(sec)}
                className={`py-2 px-3 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
                  secondsLeft === sec
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40'
                }`}
              >
                {sec / 60} min
              </button>
            ))}
          </div>

          {/* Clock timer display */}
          <div className="py-5 bg-slate-950/80 rounded-2xl border border-slate-900 text-center mb-6">
            <span className="text-4xl font-extrabold tracking-widest text-slate-50 font-mono">
              {formatTime(secondsLeft)}
            </span>
            <p className="text-[9px] font-semibold text-slate-500 font-mono tracking-widest uppercase mt-1">
              Time Remaining
            </p>
          </div>
        </div>

        {/* Media elements control triggers */}
        <div className="flex items-center gap-3 border-t border-slate-800/80 pt-5">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-950/30'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4.5 h-4.5" />
                <span>Pause Regime</span>
              </>
            ) : (
              <>
                <Play className="w-4.5 h-4.5 fill-white" />
                <span>Begin Session</span>
              </>
            )}
          </button>

          <button
            onClick={resetTimer}
            className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-white cursor-pointer transition-colors"
            title="Reset Zen session"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
