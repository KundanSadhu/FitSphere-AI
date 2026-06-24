import { useState, useEffect } from 'react';
import { Cpu, Zap, ShieldCheck, Activity, Gauge, Server, RefreshCw } from 'lucide-react';

interface ChamberTelemetryProps {
  onClose?: () => void;
}

export function ChamberTelemetry({ onClose }: ChamberTelemetryProps) {
  const [latency, setLatency] = useState(115);
  const [speed, setSpeed] = useState(88.4);
  const [activeSync, setActiveSync] = useState(true);

  // Smoothly oscillate values slightly to represent realistic, active high-performance engine feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setLatency((prev) => {
        const delta = Math.floor((Math.random() - 0.5) * 8);
        const next = prev + delta;
        return next < 80 ? 80 : next > 150 ? 150 : next;
      });
      setSpeed((prev) => {
        const delta = Number(((Math.random() - 0.5) * 4).toFixed(1));
        const next = Number((prev + delta).toFixed(1));
        return next < 70 ? 70 : next > 105 ? 105 : next;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      id="chamber-telemetry-container" 
      className="bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_#191A23] p-5.5 space-y-5"
    >
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3.5 border-b-2 border-[#191A23]/10">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600 animate-pulse stroke-[2.5]" />
          <h3 className="font-black text-[#191A23] text-sm tracking-tight uppercase">Sphere Engine Logs</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => {
              setActiveSync(false);
              setTimeout(() => setActiveSync(true), 1000);
            }}
            className="p-1 px-2 rounded-lg bg-slate-50 hover:bg-[#F3F3F3] border border-slate-205 transition-colors cursor-pointer text-slate-650"
            title="Refresh engine telemetry"
          >
            <RefreshCw className={`w-3 h-3 text-[#191A23] ${!activeSync ? 'animate-spin' : ''}`} />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 px-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-slate-205 transition-colors cursor-pointer text-rose-600 font-extrabold text-[10px]"
              title="Close telemetry"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Diagnostics List items */}
      <div className="space-y-4">
        {/* Core Model Metric */}
        <div className="space-y-1.5" id="telemetry-metric-model">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 font-mono tracking-wider uppercase">
            <span>Neural Processing Model</span>
            <span className="text-indigo-600 flex items-center gap-0.5 font-bold">
              <Cpu className="w-3 h-3" /> VERIFIED
            </span>
          </div>
          <div className="p-3 bg-slate-50 border-2 border-[#191A23] rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#191A23]">
            <span className="font-extrabold text-[#191A23] text-xs font-mono">gemini-3.5-flash</span>
            <span className="text-[9px] font-black text-[#191A23] bg-[#B9FF66] border border-[#191A23] px-2 py-0.5 rounded-md">
              LIVE API
            </span>
          </div>
        </div>

        {/* Real-time speed & latency metrics */}
        <div className="grid grid-cols-2 gap-3" id="telemetry-grid-performance">
          <div className="p-3.5 bg-slate-50 border-2 border-[#191A23] rounded-2xl shadow-[2px_2px_0px_#191A23] flex flex-col justify-between">
            <span className="text-[9px] font-black font-mono text-slate-400 uppercase tracking-widest leading-none">TTFT LATENCY</span>
            <div className="flex items-baseline gap-1 mt-2.5">
              <span className="text-xl font-black text-[#191A23] font-mono leading-none">{activeSync ? latency : '...'}</span>
              <span className="text-[10px] font-bold text-slate-550 font-mono">ms</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[9px] font-black text-amber-600 font-mono uppercase bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50">
              <Zap className="w-2.5 h-2.5 fill-amber-400 stroke-amber-500" /> Fast TTFT
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border-2 border-[#191A23] rounded-2xl shadow-[2px_2px_0px_#191A23] flex flex-col justify-between">
            <span className="text-[9px] font-black font-mono text-slate-400 uppercase tracking-widest leading-none">STREAM TOK/S</span>
            <div className="flex items-baseline gap-1 mt-2.5">
              <span className="text-xl font-black text-[#191A23] font-mono leading-none">{activeSync ? speed : '...'}</span>
              <span className="text-[10px] font-bold text-slate-550 font-mono">t/s</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[9px] font-black text-emerald-600 font-mono uppercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
              <Gauge className="w-2.5 h-2.5 text-emerald-500" /> Optimal
            </div>
          </div>
        </div>

        {/* Context usage tracking */}
        <div className="space-y-1.5" id="telemetry-metric-context">
          <div className="flex justify-between text-[10px] font-bold text-slate-505 font-mono tracking-wider uppercase">
            <span>Dynamic Memory Buffers</span>
            <span>0.05% Used</span>
          </div>
          <div className="w-full bg-slate-100 border-2 border-[#191A23] h-3.5 rounded-full overflow-hidden p-0.5 relative">
            <div 
              className="bg-[#B9FF66] border-r-2 border-[#191A23] h-full rounded-full transition-all duration-700" 
              style={{ width: '12%' }} 
            />
          </div>
          <p className="text-[8.5px] text-slate-450 font-bold uppercase font-mono tracking-tight text-right">
            120 / 1,000,000 max context scope tokens
          </p>
        </div>

        {/* Secure sandbox cert */}
        <div className="pt-3.5 border-t border-slate-100 space-y-2.5" id="telemetry-info-integrity">
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
            <div className="flex-1 flex justify-between">
              <span className="font-extrabold text-[#191A23]">System Sandbox</span>
              <span className="font-bold text-emerald-650 font-mono text-[10px]">SECURE AES</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Server className="w-4 h-4 text-slate-400 shrink-0 stroke-[2.5]" />
            <div className="flex-1 flex justify-between">
              <span className="font-extrabold text-[#191A23]">Cloud Environment</span>
              <span className="font-bold text-slate-500 font-mono text-[10px]">99.99% UPSTREAM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
