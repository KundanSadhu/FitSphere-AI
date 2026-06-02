import { Check } from 'lucide-react';

interface OnboardingData {
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  dietType: string;
  healthConstraints: string;
}

interface OnboardingProps {
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  onboardingData: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  onComplete: () => void;
}

export function Onboarding({
  onboardingStep,
  setOnboardingStep,
  onboardingData,
  setOnboardingData,
  onComplete
}: OnboardingProps) {
  
  const proceedOnboarding = () => {
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-12 bg-white min-h-[calc(100vh-120px)] flex flex-col justify-center">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
        {/* Onboarding progress stepper bar */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold text-indigo-600 tracking-wider font-mono">STEP {onboardingStep} OF 4</span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              {onboardingStep === 1 && 'Personal Metrics Analysis'}
              {onboardingStep === 2 && 'Personal Fitness Target'}
              {onboardingStep === 3 && 'Dietary Preferential Setting'}
              {onboardingStep === 4 && 'Health Conditions Check'}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-450">{onboardingStep * 25}%</span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${onboardingStep * 25}%` }}
          />
        </div>

        {/* Onboarding content fields */}
        <div className="space-y-4 py-4 min-h-[160px]">
          {onboardingStep === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">AGE TARGET</label>
                <input
                  type="number"
                  value={onboardingData.age}
                  id="onboarding-input-age"
                  onChange={(e) => setOnboardingData({ ...onboardingData, age: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 text-xs font-bold bg-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">BIOMETRIC GENDER</label>
                <select
                  value={onboardingData.gender}
                  id="onboarding-select-gender"
                  onChange={(e) => setOnboardingData({ ...onboardingData, gender: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 text-xs font-bold bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">CURRENT MASS (KG)</label>
                <input
                  type="number"
                  value={onboardingData.weight}
                  id="onboarding-input-weight"
                  onChange={(e) => setOnboardingData({ ...onboardingData, weight: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 text-xs font-bold bg-white"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">HEIGHT STAT (CM)</label>
                <input
                  type="number"
                  value={onboardingData.height}
                  id="onboarding-input-height"
                  onChange={(e) => setOnboardingData({ ...onboardingData, height: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 text-xs font-bold bg-white"
                />
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">PRIMARY BIOMECHANICAL TARGET</label>
              {['Muscle size and lean aesthetics', 'Max power output progressive target', 'Fat mass shredding and hydration focus', 'General cardiac endurance and core posture'].map((g, idx) => (
                <div
                  key={g}
                  id={`onboarding-goal-card-${idx}`}
                  onClick={() => setOnboardingData({ ...onboardingData, goal: g })}
                  className={`p-3.5 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                    onboardingData.goal === g
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900'
                      : 'border-slate-200 hover:border-indigo-600 text-slate-700 bg-white'
                  }`}
                >
                  <span>{g}</span>
                  {onboardingData.goal === g && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              ))}
            </div>
          )}

          {onboardingStep === 3 && (
            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">DAILY DIETARY SYNTHESIS</label>
              {['High protein balanced', 'Ketogenic clean fat burn', 'Strict vegan macro track', 'Carnivore heavy performance fuel'].map((d, idx) => (
                <div
                  key={d}
                  id={`onboarding-diet-card-${idx}`}
                  onClick={() => setOnboardingData({ ...onboardingData, dietType: d })}
                  className={`p-3.5 rounded-2xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
                    onboardingData.dietType === d
                      ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900'
                      : 'border-slate-200 hover:border-indigo-600 text-slate-700 bg-white'
                  }`}
                >
                  <span>{d}</span>
                  {onboardingData.dietType === d && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
              ))}
            </div>
          )}

          {onboardingStep === 4 && (
            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">HEALTH & ORTHOPEDIC CONSTRAINTS</label>
              <textarea
                value={onboardingData.healthConstraints}
                id="onboarding-input-constraints"
                onChange={(e) => setOnboardingData({ ...onboardingData, healthConstraints: e.target.value })}
                placeholder="List any physical coordinates limits, knee pain, lower back discomfort, or write 'None'..."
                rows={4}
                className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:border-indigo-600 text-xs font-medium bg-white leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Action Triggers */}
        <div className="flex gap-4 border-t pt-5 border-slate-100">
          {onboardingStep > 1 && (
            <button
              id="onboarding-btn-back"
              onClick={() => setOnboardingStep(onboardingStep - 1)}
              className="flex-1 py-3 px-4 border border-slate-200 hover:border-slate-400 font-extrabold text-xs rounded-xl cursor-pointer text-slate-700 transition-colors"
            >
              Back
            </button>
          )}
          <button
            id="onboarding-btn-proceed"
            onClick={proceedOnboarding}
            className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 font-extrabold text-xs rounded-xl text-white shadow-md cursor-pointer transition-colors"
          >
            {onboardingStep === 4 ? 'Complete Onboarding' : 'Proceed Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
