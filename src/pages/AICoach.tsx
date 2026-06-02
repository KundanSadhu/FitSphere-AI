import { ChatInterface } from '../components/ChatInterface';

export function AICoach() {
  return (
    <div className="space-y-6 bg-white p-2">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          AI Coach Chamber
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Converse in secure channels directly with Coach Sphere. Ask about rest metrics, progressive loading weights, or custom meal plans.
        </p>
      </div>

      {/* Renders Chat Interface inside white layout container */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-soft-sm">
        <ChatInterface />
      </div>
    </div>
  );
}
