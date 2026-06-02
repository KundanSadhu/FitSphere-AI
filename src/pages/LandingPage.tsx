import { ArrowRight, Dumbbell, MessageCircle, Apple } from 'lucide-react';
import { ProgressGlobe } from '../components/ProgressGlobe';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onQuickDashboard: () => void;
}

export function LandingPage({ onStartOnboarding, onQuickDashboard }: LandingPageProps) {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col justify-between">
      {/* LANDING CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 transition-all grow">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="inline-flex gap-1.5 items-center px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-black tracking-widest text-indigo-600 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
              BIOMECHANICS 2.0 PROTOCOL
            </span>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Your AI-Powered <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-600 bg-clip-text text-transparent">
                Fitness Ecosystem
              </span>
            </h1>
            
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-lg">
              Integrate hyper-personalized training regimes, nutritional macro targets, interactive muscular resonance models, and custom 24/7 AI coaching feedback in one pristine workspace.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                id="btn-landing-get-started"
                onClick={onStartOnboarding}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-6 py-3.5 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="btn-landing-dashboard-sim"
                onClick={onQuickDashboard}
                className="p-3.5 border border-slate-200 hover:border-indigo-600 bg-white hover:bg-slate-50 text-slate-750 hover:text-indigo-600 text-xs font-black rounded-2xl transition-all cursor-pointer"
              >
                Explore Dashboard Simulator
              </button>
            </div>

            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-100">
              <div>
                <h5 className="text-xl font-black text-slate-800 font-mono">1.6g+</h5>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Protein per kg</p>
              </div>
              <div>
                <h5 className="text-xl font-black text-slate-800 font-mono">98.4%</h5>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Muscle Align</p>
              </div>
              <div>
                <h5 className="text-xl font-black text-slate-800 font-mono">4.9 ★</h5>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Coach satisfaction</p>
              </div>
            </div>
          </div>

          {/* Interactive Globe presentation panel */}
          <div className="relative flex justify-center items-center h-[320px] sm:h-[400px] border border-slate-100 rounded-3xl bg-white p-6 shadow-soft-sm">
            <div className="absolute inset-0 z-0">
              <ProgressGlobe />
            </div>
            <span className="absolute bottom-4 right-4 bg-white/90 border border-slate-100 px-3 py-1 rounded-full text-[9px] font-bold font-mono text-slate-500 z-10">
              3D MUSCULAR CELL PROGRESS
            </span>
          </div>

        </div>

        {/* Modules presentation section */}
        <section className="mt-16 py-12 border-t border-slate-100 bg-white">
          <h2 className="text-2xl font-black text-slate-900 text-center tracking-tight mb-10">
            Core Biomechanics Optimization Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft-sm hover:shadow-soft-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2 text-sm">Muscular Resonance Mapping</h4>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                Tap anatomical muscle indicators to locate hyper-focused movements designed to recruit optimal motor fiber alignment.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft-sm hover:shadow-soft-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2 text-sm">AI Neural Coaching Chat</h4>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                Converse seamlessly with Coach Sphere, accessing personalized recovery protocols, progressive weight guidelines, and rest intervals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft-sm hover:shadow-soft-md transition-all">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-2 text-sm">Macro-Synthesis Tracks</h4>
              <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                Personalize meal plans to fulfill rigid daily targets. Track total proteins, water intake, carbs, and lipids seamlessly.
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
