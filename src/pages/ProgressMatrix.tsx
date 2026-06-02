import { useState } from 'react';
import { Plus } from 'lucide-react';
import { WeightRecord } from '../types';
import { WeightChart } from '../components/WeightChart';

interface ProgressMatrixProps {
  weightHistory: WeightRecord[];
  weightInput: string;
  setWeightInput: (val: string) => void;
  heightInput: string;
  setHeightInput: (val: string) => void;
  bmiValue: number;
  progressPhotos: string[];
  setProgressPhotos: (photos: string[]) => void;
  onAddWeightRecord: () => void;
  onNotify: (msg: string) => void;
}

export function ProgressMatrix({
  weightHistory,
  weightInput,
  setWeightInput,
  heightInput,
  setHeightInput,
  bmiValue,
  progressPhotos,
  setProgressPhotos,
  onAddWeightRecord,
  onNotify
}: ProgressMatrixProps) {
  return (
    <div className="space-y-6 bg-white p-2">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          Body Mass Progression Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Monitor historic body mass, compute body mass indexes (BMI), and organize daily physical posture vision cards.
        </p>
      </div>

      {/* Recharts dynamic mass graphics, wrapped in white cardboard card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-soft-sm">
        <h4 className="font-extrabold text-slate-900 mb-4 text-sm font-mono text-left uppercase tracking-wider">
          Mass metrics chart
        </h4>
        <div id="chart-panel" className="bg-white rounded-xl overflow-hidden p-2">
          <WeightChart data={weightHistory} targetWeight={68} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Biometrics submission controller */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft-sm space-y-4 text-left">
          <h4 className="font-extrabold text-slate-900 tracking-tight text-sm">Log Latest Mass Reading</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase block mb-1">HEIGHT (CM)</label>
              <input
                type="number"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 outline-none text-xs font-bold bg-white"
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-400 tracking-wider uppercase block mb-1">MASS (KG)</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="71.5"
                className="w-full p-3 rounded-xl border border-slate-200 outline-none text-xs font-bold bg-white"
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500 font-bold block">Current BMI value</span>
              <span className="font-black text-indigo-700 font-mono text-sm">
                {bmiValue.toFixed(1)} Unit
              </span>
            </div>
            <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded font-black tracking-tight uppercase">
              Healthy Range
            </span>
          </div>

          <button
            onClick={onAddWeightRecord}
            id="btn-matrix-add-weight"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs rounded-xl shadow cursor-pointer transition-colors"
          >
            Commit Biometric Record
          </button>
        </div>

        {/* Continuous posture photo visual checkin */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft-sm space-y-4 text-left">
          <h4 className="font-extrabold text-slate-900 tracking-tight text-sm">Continuous Vision Logs</h4>
          <p className="text-xs text-slate-400 font-semibold whitespace-pre-wrap leading-relaxed">
            Upload daily posture vision photos to monitor target symmetrical align variables.
          </p>
          
          <div className="grid grid-cols-4 gap-2.5">
            {progressPhotos.map((ph, i) => (
              <div key={i} className="relative aspect-square border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 shadow-soft-sm">
                <img
                  src={ph}
                  alt="progress log"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <button
              onClick={() => {
                onNotify('Simulating camera vision upload... Completed!');
                setProgressPhotos([...progressPhotos, 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=200&auto=format&fit=crop']);
              }}
              id="btn-progress-photo-upload"
              className="aspect-square rounded-2xl border border-dashed border-slate-300 hover:border-indigo-600 text-slate-400 hover:text-indigo-600 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[8px] font-mono font-black tracking-wider uppercase">Upload</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
