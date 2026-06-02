import { ChatInterface } from '../components/ChatInterface';

export function AICoach() {
  return (
    <div className="bg-white space-y-6 py-2 pb-12 text-left" id="ai-coach-page-root">
      {/* Visual Title Header with accurate alignments and pairings */}
      <div className="border-b border-slate-100 pb-5 flex flex-col md:flex-row md:items-start md:justify-between gap-4" id="ai-coach-header-block">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-[#191A23] tracking-tight leading-tight">
            AI Coach Chamber
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-semibold max-w-2xl leading-relaxed">
            Converse in secure, ultra-low-latency channels directly with <span className="text-indigo-600 font-extrabold">Coach Sphere</span>. Query physical range models, biomechanical motions, macros, or custom splits instantly.
          </p>
        </div>
      </div>

      {/* Main Dual Grid Layout - Adaptive columns based on telemetry state */}
      <div className="grid grid-cols-1 gap-6 items-start" id="ai-coach-grid">
        {/* Chat System interface wrapper - spans full 4 columns when telemetry sidebar is hidden */}
        <div className="lg:col-span-4" id="ai-coach-chat-column">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
