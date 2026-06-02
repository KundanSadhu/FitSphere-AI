import { useState, useEffect } from 'react';
import { meditationAudio } from '../utils/audioSynth';
import { Volume2, CloudRain, Bell, Music, HelpCircle, AudioLines } from 'lucide-react';

export const MeditationSoundKit = () => {
  const [ambientActive, setAmbientActive] = useState(false);
  const [rainActive, setRainActive] = useState(false);
  const [selectedFreq, setSelectedFreq] = useState<number>(136.1); // Earth frequency 'Om'
  const [droneVol, setDroneVol] = useState<number>(0.35);
  const [bowlStrikeCount, setBowlStrikeCount] = useState(0);
  const [waveScale, setWaveScale] = useState(1);

  // Stop sounds on unmount to prevent lingering oscillators
  useEffect(() => {
    return () => {
      meditationAudio.stopAmbientDrone();
    };
  }, []);

  const handleToggleDrone = () => {
    if (ambientActive) {
      meditationAudio.stopAmbientDrone();
      setAmbientActive(false);
    } else {
      meditationAudio.startAmbientDrone(droneVol);
      setAmbientActive(true);
    }
  };

  const handleToggleRain = () => {
    if (rainActive) {
      // Pink rain noise simulator returns a stop function we can call
      (window as any).stopRainFn?.();
      setRainActive(false);
    } else {
      const stopFn = meditationAudio.startZenRain(0.08);
      (window as any).stopRainFn = stopFn;
      setRainActive(true);
    }
  };

  const handleBowlStrike = (freq: number) => {
    meditationAudio.strikeSingingBowl(freq);
    setBowlStrikeCount(prev => prev + 1);
    setWaveScale(2.5);
    setTimeout(() => setWaveScale(1), 800);
  };

  const handleFreqChange = (freq: number) => {
    setSelectedFreq(freq);
    if (ambientActive) {
      // restart with updated frequency
      meditationAudio.startAmbientDrone(droneVol);
    }
  };

  const handleVolumeChange = (v: number) => {
    setDroneVol(v);
    if (ambientActive) {
      meditationAudio.startAmbientDrone(v);
    }
  };

  return (
    <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-5 shadow-[4px_4px_0px_#191A23] text-[#191A23] text-left space-y-5">
      <div className="flex items-center justify-between border-b-2 border-[#191A23]/10 pb-3">
        <div className="flex items-center gap-2">
          <Music className="w-5 h-5 text-[#191A23] stroke-[2.5]" />
          <div>
            <h4 className="font-extrabold text-sm tracking-tight uppercase font-mono">Zen Solfeggio Soundscapes</h4>
            <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Procedural audio waves for deep focus</p>
          </div>
        </div>
        {ambientActive && (
          <div className="flex items-center gap-1 bg-[#B9FF66] border border-[#191A23] px-2 py-0.5 rounded text-[8px] font-black font-mono animate-pulse shadow-[1px_1px_0px_#191A23]">
            <AudioLines className="w-2.5 h-2.5" />
            LIVE WAVES
          </div>
        )}
      </div>

      {/* Bowl Striker Subsection */}
      <div className="space-y-3">
        <span className="text-[10px] font-black text-slate-500 tracking-wider uppercase block font-mono">
          Tibetan Singing Bowl Striker
        </span>
        <div className="relative p-4 bg-[#F3F3F3] border-2 border-[#191A23] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
          
          {/* Breathing ripple strike effect */}
          <div 
            className="absolute rounded-full bg-[#B9FF66]/20 border-2 border-[#B9FF66]/40 pointer-events-none transition-all duration-700 ease-out"
            style={{
              width: '120px',
              height: '120px',
              opacity: waveScale > 1 ? 0.8 : 0,
              transform: `scale(${waveScale})`,
              left: '20%',
              top: '15%'
            }}
          />

          <div className="flex items-center gap-3 relative z-10 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] flex items-center justify-center text-lg select-none">
              🔔
            </div>
            <div>
              <p className="text-xs font-black leading-tight">Authentic Singing Bowl Harmonic</p>
              <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Simulates bell alloy resonance</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end relative z-10">
            {/* Tuning triggers */}
            <div className="flex gap-1">
              {[
                { label: 'C-Root', freq: 128 },
                { label: 'Om-Heart', freq: 136.1 },
                { label: 'A-Cosmo', freq: 216 }
              ].map((btn) => (
                <button
                  key={btn.freq}
                  onClick={() => handleBowlStrike(btn.freq)}
                  className="px-2.5 py-1.5 bg-white hover:bg-[#F3F3F3] border-2 border-[#191A23] rounded-lg text-[9px] font-black font-mono shadow-[1.5px_1.5px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Oscillators Drone Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Drone Left Toggle Card */}
        <div className="p-4 bg-white border-2 border-[#191A23] rounded-2xl shadow-[2.5px_2.5px_0px_#191A23] flex flex-col justify-between space-y-3.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-wider font-mono">SOLFEGGIO CHORD</span>
              <p className="text-xs font-black">432Hz Ambient Resonance</p>
            </div>
            <Volume2 className={`w-4 h-4 ${ambientActive ? 'text-[#191A23] animate-bounce' : 'text-slate-400'}`} />
          </div>

          <div className="space-y-1.5">
            <label className="text-[8px] font-black text-slate-500 font-mono flex justify-between">
              <span>BINAURAL CHORD volume</span>
              <span>{Math.round(droneVol * 100)}%</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={droneVol}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-[#B9FF66] bg-slate-100 h-2.5 rounded-lg border border-[#191A23] cursor-pointer"
            />
          </div>

          <button
            onClick={handleToggleDrone}
            className={`w-full py-2 px-3 border-2 border-[#191A23] rounded-xl text-[10px] font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all ${
              ambientActive
                ? 'bg-[#B9FF66] text-[#191A23]'
                : 'bg-white text-slate-500 hover:text-[#191A23]'
            }`}
          >
            {ambientActive ? '⏸ SILENCE DRONE' : '▶ ACTIVATE DRONE'}
          </button>
        </div>

        {/* Rain Simulator Card */}
        <div className="p-4 bg-white border-2 border-[#191A23] rounded-2xl shadow-[2.5px_2.5px_0px_#191A23] flex flex-col justify-between space-y-3.5">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-black text-slate-500 tracking-wider font-mono">RAIN GENERATOR</span>
              <p className="text-xs font-black">Zen Forest Waterfalls</p>
            </div>
            <CloudRain className={`w-4 h-4 ${rainActive ? 'text-blue-500 animate-pulse' : 'text-slate-400'}`} />
          </div>

          <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
            Procedural bandpass noise sweep simulating randomized gentle rainwater drops on leaves.
          </p>

          <button
            onClick={handleToggleRain}
            className={`w-full py-2 px-3 border-2 border-[#191A23] rounded-xl text-[10px] font-black uppercase tracking-wider font-mono shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer transition-all ${
              rainActive
                ? 'bg-[#B9FF66] text-[#191A23]'
                : 'bg-white text-slate-500 hover:text-[#191A23]'
            }`}
          >
            {rainActive ? '⏸ STOP FOREST RAIN' : '▶ START FOREST RAIN'}
          </button>
        </div>

      </div>

      <div className="p-3.5 bg-[#F9F9F9] border border-[#191A23]/10 rounded-xl flex items-start gap-2 text-[10px] text-slate-600 font-semibold leading-relaxed">
        <HelpCircle className="w-4 h-4 text-[#191A23] shrink-0" />
        <span>
          <b>Why Procedural sound?</b> Traditional recorded loops pop/clip every 2 minutes. Procedural generation synthesizes continuous, organic, non-repeating sound mathematically in real-time, removing unconscious audio disruption!
        </span>
      </div>
    </div>
  );
};
