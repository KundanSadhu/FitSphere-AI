import { Brain, Sparkles } from 'lucide-react';

export interface BreathProfile {
  id: string;
  name: string;
  emoji: string;
  title: string;
  description: string;
  inhale: number;
  holdLength: number;
  exhale: number;
  postHoldLengthValue: number; // hold after exhale
  scientificExplanation: string;
}

export const BREATH_PROFILES: BreathProfile[] = [
  {
    id: 'box_breath',
    name: 'Overwhelmed',
    emoji: '😫',
    title: 'Equal Ratio Box Breathing',
    description: 'Stabilizes fight-or-flight response, used by high-performance athletes under duress.',
    inhale: 4,
    holdLength: 4,
    exhale: 4,
    postHoldLengthValue: 4,
    scientificExplanation: 'Equals breathing carbon dioxide balance to trigger amygdala stabilization and restore immediate focus.'
  },
  {
    id: 'relax_breath',
    name: 'Anxious / Restless',
    emoji: '😰',
    title: 'Relaxing 4-7-8 Rest Pattern',
    description: 'A mathematical sleep-aid protocol designed to stimulate fast parasympathetic shift.',
    inhale: 4,
    holdLength: 7,
    exhale: 8,
    postHoldLengthValue: 0,
    scientificExplanation: 'Extended 8-second exhale activates the Vagus nerve, slowing down standard heart rate and physical adrenaline rushes.'
  },
  {
    id: 'focus_breath',
    name: 'Dull / Low Vitality',
    emoji: '🥱',
    title: 'Bellows Oxygenation Sweep',
    description: 'Quick active cycles to boost oxygen retention levels and elevate morning adrenaline.',
    inhale: 3,
    holdLength: 1,
    exhale: 3,
    postHoldLengthValue: 0,
    scientificExplanation: 'Fast circular breathing provides physical cellular glycogen excitation, banishing daytime fatigue.'
  },
  {
    id: 'harmony_breath',
    name: 'Calm / Grounded',
    emoji: '😊',
    title: 'Earth Harmonic 5-5 Equalizer',
    description: 'Sustains peaceful biological alignment and coherence of cardiac intervals.',
    inhale: 5,
    holdLength: 2,
    exhale: 5,
    postHoldLengthValue: 2,
    scientificExplanation: 'Coherence rate sets baroreceptor activation loops to maximize natural high-frequency heart rate variability.'
  }
];

interface MeditationEmotionSelectorProps {
  selectedProfileId: string;
  onSelectProfile: (profile: BreathProfile) => void;
}

export const MeditationEmotionSelector = ({
  selectedProfileId,
  onSelectProfile
}: MeditationEmotionSelectorProps) => {
  return (
    <div className="bg-white border-2 border-[#191A23] rounded-[24px] p-5 shadow-[4px_4px_0px_#191A23] text-[#191A23] text-left space-y-4">
      <div className="flex items-center gap-2 border-b-2 border-[#191A23]/10 pb-3">
        <Brain className="w-5 h-5 text-[#191A23]" />
        <div>
          <h4 className="font-extrabold text-sm tracking-tight uppercase font-mono">Cognitive Resonance Alignment</h4>
          <p className="text-[10px] text-slate-500 font-semibold leading-none mt-0.5">Calibrate breathing ratio based on current state</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {BREATH_PROFILES.map((prof) => {
          const isSelected = prof.id === selectedProfileId;
          return (
            <button
              key={prof.id}
              onClick={() => onSelectProfile(prof)}
              type="button"
              className={`p-3.5 rounded-2xl border-2 text-left flex flex-col justify-between transition-all cursor-pointer h-full ${
                isSelected
                  ? 'bg-[#B9FF66] border-[#191A23] shadow-[3px_3px_0px_#191A23]'
                  : 'bg-white border-[#191A23] hover:bg-[#F3F3F3] hover:translate-x-0.5 hover:translate-y-0.5 shadow-[1px_1px_0px_#191A23] hover:shadow-none'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl select-none" role="img" aria-label={prof.name}>
                    {prof.emoji}
                  </span>
                  {isSelected && (
                    <span className="text-[7.5px] font-black font-mono tracking-wider text-slate-900 border border-slate-900 px-1 py-0.2 md:py-0.5 bg-white uppercase rounded shadow-[0.5px_0.5px_0px_#191A23]">
                      ACTIVE
                    </span>
                  )}
                </div>
                <h5 className="font-black text-xs">{prof.name}</h5>
                <p className="text-[9.5px] text-slate-600 font-semibold leading-relaxed mt-1 line-clamp-2 md:line-clamp-3">
                  {prof.description}
                </p>
              </div>

              {/* Display technical breathing code */}
              <div className="mt-2.5 pt-1.5 border-t border-[#191A23]/10 flex items-center justify-between text-[8px] font-black font-mono text-slate-500">
                <span>RATIO TIMERS:</span>
                <span className="bg-white/80 border border-[#191A23]/25 px-1 py-0.5 rounded text-slate-900 font-bold">
                  {prof.inhale}s - {prof.holdLength}s - {prof.exhale}s
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic tip explain science */}
      {selectedProfileId && (
        <div className="p-3.5 bg-[#F3F3F3] border-2 border-[#191A23] rounded-2xl flex items-start gap-2.5 text-xs animate-fadeIn">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-100 shrink-0 mt-0.5" />
          <div>
            <span className="text-[9px] font-mono font-black text-slate-500 tracking-wide uppercase block">
              Neurological Impact Matrix
            </span>
            <p className="text-xs font-black mt-0.5 leading-tight">
              {BREATH_PROFILES.find((p) => p.id === selectedProfileId)?.title}
            </p>
            <p className="text-[10px] text-slate-600 font-semibold leading-relaxed mt-1">
              {BREATH_PROFILES.find((p) => p.id === selectedProfileId)?.scientificExplanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
