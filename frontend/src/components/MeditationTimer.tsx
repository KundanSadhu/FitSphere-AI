import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Heart, Moon, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { MeditationSoundKit } from './MeditationSoundKit';
import { MeditationEmotionSelector, BREATH_PROFILES, BreathProfile } from './MeditationEmotionSelector';

export const MeditationTimer = () => {
  // Profiles and States
  const [selectedProfile, setSelectedProfile] = useState<BreathProfile>(BREATH_PROFILES[0]);
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes default
  const [isActive, setIsActive] = useState(false);
  const [breathState, setBreathState] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [cycleIndex, setCycleIndex] = useState(0); // active second within the current cycle
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    return parseInt(localStorage.getItem('fitsphere_sessions_done') || '0', 10);
  });
  
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [heartOsc, setHeartOsc] = useState(72); // simulated heart rate that slows down as they breathe out!

  // Active breath cycle values based on selected profile
  const { inhale, holdLength, exhale, postHoldLengthValue } = selectedProfile;
  const totalCycleLength = inhale + holdLength + exhale + postHoldLengthValue;

  // Track state in ref to avoid setInterval closure issues
  const activeCycleIndexRef = useRef(0);
  activeCycleIndexRef.current = cycleIndex;

  // Clean ambient audio triggers based on breathing phase
  useEffect(() => {
    if (!isActive) return;

    // We can simulate an organic heart rate fluctuation (Respiratory Sinus Arrhythmia)
    // Inhale -> Heart rate speeds up slightly
    // Exhale -> Heart rate slows down beautifully, indicating physiological calming!
    let targetHr = 72;
    if (breathState === 'Inhale') {
      targetHr = 75 + (activeCycleIndexRef.current * 1.5);
    } else if (breathState === 'Exhale') {
      targetHr = 74 - ((activeCycleIndexRef.current - (inhale + holdLength)) * 1.8);
    } else {
      targetHr = 65; // deep rest state
    }
    setHeartOsc(Math.max(54, Math.min(88, Math.round(targetHr))));
  }, [breathState, cycleIndex, isActive, inhale, holdLength]);

  // Countdown timer logic
  useEffect(() => {
    let countdownId: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      countdownId = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            const nextDone = sessionsCompleted + 1;
            setSessionsCompleted(nextDone);
            localStorage.setItem('fitsphere_sessions_done', nextDone.toString());
            setShowCompletionOverlay(true);
            
            // Log reward points to main experience
            const prevPts = parseInt(localStorage.getItem('fitsphere_points') || '200', 10);
            localStorage.setItem('fitsphere_points', (prevPts + 150).toString());
            
            // Play a celebratory singing bowl strike!
            const actx = window.AudioContext || (window as any).webkitAudioContext;
            if (actx) {
              import('../utils/audioSynth').then(({ meditationAudio }) => {
                meditationAudio.strikeSingingBowl(216); // High tone strike
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownId);
  }, [isActive, secondsLeft, sessionsCompleted]);

  // Dynamic state machine respiratory engine
  useEffect(() => {
    let tickId: NodeJS.Timeout;
    if (isActive) {
      tickId = setInterval(() => {
        setCycleIndex((prev) => {
          const next = (prev + 1) % totalCycleLength;
          
          // Classify the respiratory state based on the current interval index
          if (next < inhale) {
            setBreathState('Inhale');
          } else if (next < inhale + holdLength) {
            setBreathState('Hold');
          } else if (next < inhale + holdLength + exhale) {
            setBreathState('Exhale');
          } else {
            setBreathState('Rest');
          }
          return next;
        });
      }, 1000);
    } else {
      setCycleIndex(0);
      setBreathState('Inhale');
    }
    return () => clearInterval(tickId);
  }, [isActive, totalCycleLength, inhale, holdLength, exhale, postHoldLengthValue]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    // play a soft welcome strike when started
    if (!isActive) {
      import('../utils/audioSynth').then(({ meditationAudio }) => {
        meditationAudio.strikeSingingBowl(136.1);
      });
    }
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setSecondsLeft(600);
    setCycleIndex(0);
    setBreathState('Inhale');
  };

  const handleSelectTime = (sec: number) => {
    setSecondsLeft(sec);
    if (isActive) {
      setIsActive(false);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rs.toString().padStart(2, '0')}`;
  };

  // Compute organic smooth breathing diameter scale
  let scale = 1.0;
  if (isActive) {
    if (breathState === 'Inhale') {
      // expand from 1.0 up to 1.8 scale
      scale = 1.0 + (cycleIndex / inhale) * 0.8;
    } else if (breathState === 'Hold') {
      scale = 1.8;
    } else if (breathState === 'Exhale') {
      const exhaleIdx = cycleIndex - (inhale + holdLength);
      // shrink smoothly back to 1.0
      scale = 1.8 - (exhaleIdx / exhale) * 0.8;
    } else {
      // post-exhale rest hold stays at 1.0
      scale = 1.0;
    }
  }

  // Define active color layout for illumination sphere with organic, attractive crimson/red theme
  let glowColorClass = 'rgba(239, 68, 68, 0.25)'; // Soothing crimson/rose resting aura
  let auraBgColor = 'bg-rose-50/20';
  let centerRingBorder = 'border-rose-500/80';
  let instructionColorBg = 'bg-[#EF4444] text-white border-[#191A23]';
  let innerRingBg = 'bg-rose-50/45';
  let heartColorClass = 'text-rose-500 fill-rose-500';

  if (isActive) {
    if (breathState === 'Inhale') {
      glowColorClass = 'rgba(239, 68, 68, 0.75)'; // Crimson/Scarlet fine inhalation energy
      auraBgColor = 'bg-red-100/35';
      instructionColorBg = 'bg-red-500 text-white border-red-700';
      innerRingBg = 'bg-rose-100/30';
      heartColorClass = 'text-red-600 fill-red-600 scale-110';
    } else if (breathState === 'Hold') {
      glowColorClass = 'rgba(249, 115, 22, 0.65)'; // Radiant sunset orange suspended concentration
      auraBgColor = 'bg-orange-100/30';
      instructionColorBg = 'bg-orange-500 text-white border-orange-700';
      innerRingBg = 'bg-orange-50';
      heartColorClass = 'text-orange-500 fill-orange-500 scale-125';
    } else if (breathState === 'Exhale') {
      glowColorClass = 'rgba(219, 39, 119, 0.6)'; // Serene pinkish magenta cardiac unwind flow
      auraBgColor = 'bg-pink-100/30';
      instructionColorBg = 'bg-pink-500 text-white border-pink-700';
      innerRingBg = 'bg-pink-50/50';
      heartColorClass = 'text-pink-600 fill-pink-600 scale-100';
    } else {
      glowColorClass = 'rgba(100, 116, 139, 0.35)'; // Rest pause slate tranquil restoration
      auraBgColor = 'bg-slate-100/30';
      instructionColorBg = 'bg-slate-700 text-white border-slate-800';
      innerRingBg = 'bg-slate-50';
      heartColorClass = 'text-slate-500 fill-slate-500 scale-95';
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Session Complete Modal / Alert Badge */}
      {showCompletionOverlay && (
        <div className="p-5 bg-[#B9FF66] border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_#191A23] flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn relative z-30">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-12 h-12 rounded-full bg-white border-2 border-[#191A23] flex items-center justify-center text-xl shrink-0">
              🧠✨
            </div>
            <div>
              <h4 className="font-black text-sm text-[#191A23]">Cognitive Sync Complete!</h4>
              <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                You completed a <b>{selectedProfile.title}</b> session! Verified +150 Points loaded into fitsphere profile record.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCompletionOverlay(false)}
            className="px-4 py-2 bg-white text-[#191A23] border-2 border-[#191A23] text-xs font-black rounded-xl hover:bg-[#F3F3F3] shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Main Meditation Workspace Grid */}
      <div id="meditation-timer" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-[#191A23]">
        
        {/* Breathing Sphere & Lighting (Luminous Core Box) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-between p-6 bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_0px_#191A23] min-h-[460px] relative overflow-hidden transition-all duration-1000">
          
          {/* Aesthetic grid paper layout inside */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

          {/* Ambient lighting auroral dome behind using beautiful crimson/rose theme */}
          <div 
            className="absolute -top-24 -left-24 w-80 h-80 rounded-full filter blur-[70px] pointer-events-none transition-all duration-[1500ms]"
            style={{
              backgroundColor: isActive ? glowColorClass : 'rgba(239, 68, 68, 0.04)'
            }}
          />
          <div 
            className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full filter blur-[70px] pointer-events-none transition-all duration-[1500ms]"
            style={{
              backgroundColor: isActive ? glowColorClass : 'rgba(219, 39, 119, 0.03)'
            }}
          />

          <div className="w-full flex items-center justify-between relative z-10 select-none pb-4">
            <div className="flex items-center gap-2 bg-[#EF4444] text-white border-2 border-[#191A23] px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_#191A23] transition-all hover:scale-105">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-mono font-black tracking-widest uppercase">Zen Respiratory Core</span>
            </div>
            {isActive && (
              <div className="flex items-center gap-1.5 bg-white border border-[#191A23]/30 px-2 py-0.5 rounded text-[9px] font-mono font-black animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>HEART RATE: {heartOsc} BPM</span>
              </div>
            )}
          </div>

          {/* Dynamic Lighting Auroral Breathing Core with crimson alignments */}
          <div className="relative w-56 h-56 flex items-center justify-center my-6 py-6 z-10 select-none">
            {/* Outermost Pulsing Auroral Glow Halo */}
            <div
              className={`absolute rounded-full border-2 border-[#191A23]/40 ${auraBgColor} transition-all duration-1000 ease-out`}
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${scale})`,
                boxShadow: `0 0 45px ${glowColorClass}`
              }}
            />
            {/* Middle Coherence Ring using the dynamic inner ring fill */}
            <div
              className={`absolute rounded-full border-2 border-[#191A23] ${innerRingBg} transition-all duration-1000 ease-out`}
              style={{
                width: '78%',
                height: '78%',
                transform: `scale(${scale * 0.95})`,
                boxShadow: `4px 4px 0px rgba(25, 26, 35, 0.2)`
              }}
            />
            {/* Innermost Kinetic Hub */}
            <div
              className={`absolute rounded-full border-2 ${centerRingBorder} bg-white flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out shadow-[3px_3px_0px_#191A23]`}
              style={{
                width: '52%',
                height: '52%',
                transform: `scale(${scale * 0.9})`
              }}
            >
              <Heart className={`w-6 h-6 transition-all duration-500 ${heartColorClass} stroke-[2.5]`} />
              <span className="text-[10px] font-black font-mono tracking-tight text-[#191A23] mt-1.5 uppercase leading-none">
                {isActive ? breathState : 'READY'}
              </span>
              <span className="text-[8px] text-slate-500 font-bold mt-0.5">
                {isActive ? `${cycleIndex % 10}s` : 'Om'}
              </span>
            </div>
          </div>

          {/* Visual Instruction & Biological Progress Bar */}
          <div className="text-center z-10 w-full mt-2">
            
            {/* Dynamic breath instruction block */}
            <div className="mb-3">
              <span className={`text-[10px] font-mono font-black tracking-widest text-[#191A23] border-2 border-[#191A23] ${instructionColorBg} px-3 py-1.5 rounded-xl inline-block uppercase leading-none shadow-[2px_2px_0px_#191A23] transition-colors`}>
                {isActive 
                  ? `${breathState}: ${cycleIndex}s / ${totalCycleLength}s` 
                  : 'Start Calming Practice'
                }
              </span>
            </div>

            {/* Simulated heart-coherence dynamic line graph inside */}
            {isActive ? (
              <div className="w-5/6 mx-auto h-4 border border-[#191A23]/15 flex items-center justify-around rounded bg-[#FBFAFA] overflow-hidden mb-3">
                <span className="text-[8px] font-mono font-black text-slate-500">COHERENCE SYNC:</span>
                <span className="text-[9px] font-mono text-emerald-600 font-black animate-pulse">98.4% HIGH WAVE</span>
                <svg className="w-16 h-3 shrink-0" viewBox="0 0 100 20">
                  <path
                    d={`M 0 10 Q 15 ${5 * Math.sin(cycleIndex)} 30 10 T 60 10 T 90 10 T 120 10`}
                    fill="none"
                    stroke="#191A23"
                    strokeWidth="2.5"
                    className="animate-dash"
                  />
                </svg>
              </div>
            ) : (
              <div className="h-4 mb-3" />
            )}

            <p className="text-xs text-slate-600 max-w-sm mx-auto font-semibold leading-normal">
              {isActive
                ? `Currently executing: "${selectedProfile.title}" rhythm (${inhale}s Inhale, ${holdLength}s Hold, ${exhale}s Exhale). Deepen thoracic release.`
                : "Select an emotional calibration profile on the right side, strike the brass bells to clear mental static, then launch your customized rhythm."}
            </p>
          </div>
        </div>

        {/* Focus regulator settings panel */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_0px_#191A23] text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm uppercase font-mono tracking-wider">Session Regulator</h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Customize daily focus parameters</p>
              </div>
              <span className="text-[10px] bg-[#B9FF66] border border-[#191A23] font-black px-2 py-0.5 rounded text-[#191A23] font-mono tracking-wider shadow-[1.5px_1.5px_0px_#191A23] select-none">
                {sessionsCompleted} SESSIONS DONE
              </span>
            </div>

            <div className="border-t-2 border-[#191A23]/10 pt-4">
              <span className="text-[10px] font-black text-slate-505 tracking-wider uppercase block mb-2 font-mono">
                Select target timer interval
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[180, 300, 600].map((sec) => (
                  <button
                    key={sec}
                    disabled={isActive}
                    onClick={() => handleSelectTime(sec)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-black border-2 transition-all cursor-pointer ${
                      secondsLeft === sec
                        ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23] shadow-[2.5px_2.5px_0px_#191A23]'
                        : 'bg-white border-[#191A23] text-slate-500 hover:text-[#191A23] hover:bg-[#F3F3F3] disabled:opacity-40'
                    }`}
                  >
                    {sec / 60} min
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown clock face display */}
            <div className="py-6 bg-[#F3F3F3] border-2 border-[#191A23] rounded-2xl text-center select-none shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]">
              <span className="text-4xl font-extrabold tracking-widest text-[#191A23] font-mono">
                {formatTime(secondsLeft)}
              </span>
              <p className="text-[9px] font-black text-slate-500 font-mono tracking-widest uppercase mt-1">
                Time Remaining
              </p>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex items-center gap-3 border-t-2 border-[#191A23]/10 pt-5 mt-6">
            <button
              onClick={toggleTimer}
              className={`flex-grow py-3.5 px-4 rounded-xl text-xs font-black shadow-[3px_3px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 cursor-pointer transition-all border-2 border-[#191A23] ${
                isActive
                  ? 'bg-amber-400 text-[#191A23]'
                  : 'bg-[#B9FF66] text-[#191A23]'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 stroke-[3]" />
                  <span>Pause Resonance Cycle</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#191A23]" />
                  <span>Begin Session</span>
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-3 bg-white hover:bg-[#F3F3F3] border-2 border-[#191A23] rounded-xl text-[#191A23] cursor-pointer transition-colors shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none"
              title="Reset Zen session"
            >
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>

      {/* Side-by-Side Supplementary Layout (Soundscape & Emotion Alignment Mixer) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real-time Emotional Aligner */}
        <MeditationEmotionSelector 
          selectedProfileId={selectedProfile.id}
          onSelectProfile={(prof) => {
            setSelectedProfile(prof);
            // play strike representing instant structural feedback
            import('../utils/audioSynth').then(({ meditationAudio }) => {
              meditationAudio.strikeSingingBowl(prof.inhale === 5 ? 216 : 144);
            });
          }}
        />

        {/* Real-time Atmospheric Synthesizer */}
        <MeditationSoundKit />
      </div>

      {/* Guided benefits overview card */}
      <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-5 shadow-[4px_4px_0px_#191A23] text-left flex flex-col md:flex-row items-center gap-5 justify-between">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] flex items-center justify-center text-xl shrink-0">
            ☘️
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight uppercase font-mono">Myocardial Coherence Benefits</h4>
            <p className="text-xs text-slate-650 font-semibold leading-relaxed mt-1">
              Sustained slow breathing at high coherence profiles (0.05Hz - 0.1Hz) boosts standard heart rate variability, promotes fast recovery of muscle fibers by flooding cells with calming nitric oxide, and reduces brain inflammation by regulating alpha wavelengths.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 bg-amber-50 border-2 border-[#191A23] rounded-2xl py-2 px-3.5 text-[10px] font-black font-mono shadow-[2.2px_2.2px_0px_#191A23]">
          <Compass className="w-4 h-4 text-[#191A23]" />
          <span>BIO-MONITORED SECURE ZONE</span>
        </div>
      </div>

    </div>
  );
};
