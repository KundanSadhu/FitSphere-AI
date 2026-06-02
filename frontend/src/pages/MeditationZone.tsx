import { MeditationTimer } from '../components/MeditationTimer';

export function MeditationZone() {
  return (
    <div className="space-y-6 bg-white p-2">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight">
          Mind-Muscle Resonance Chamber
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Immerse inside expanding respiratory feedback loops, guided recovery sessions, and custom focused timers.
        </p>
      </div>

      {/* Mind timer container rendered directly for perfect layout alignment */}
      <MeditationTimer />
    </div>
  );
}
