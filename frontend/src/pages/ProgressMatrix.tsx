import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { WeightRecord, User } from '../types';
import { WeightChart } from '../components/WeightChart';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProgressMatrixProps {
  user: User;
  saveUserAndSync: (u: User, overrides?: any) => void;
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
  user,
  saveUserAndSync,
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
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const storageRef = ref(storage, `progress_photos/${user.id}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      const nextPhotos = [...progressPhotos, url];
      setProgressPhotos(nextPhotos);
      saveUserAndSync(user, { progressPhotos: nextPhotos });
      onNotify('Progress photo logged successfully.');
    } catch (err) {
      console.error('Photo upload failed:', err);
      onNotify('Failed to upload progress photo.');
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="space-y-6 bg-white p-2 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-[#191A23] tracking-tight">
          Body Progression Matrix
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-semibold">
          Monitor your weight trend over time, calculate your Body Mass Index (BMI), and keep a visual progress journal.
        </p>
      </div>

      {/* Weight Chart, wrapped in premium card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-5 rounded-[24px] border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23]"
      >
        <h4 className="font-extrabold text-[#191A23] mb-4 text-xs font-mono text-left uppercase tracking-wider">
          Weight Progression Chart
        </h4>
        <div id="chart-panel" className="bg-white rounded-xl overflow-hidden p-2">
          <WeightChart data={weightHistory} targetWeight={68} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Biometrics submission controller */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-[24px] border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23] space-y-4 text-left"
        >
          <h4 className="font-black text-[#191A23] tracking-tight text-base">Log Latest Weight Entry</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">HEIGHT (CM)</label>
              <input
                type="number"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-[#191A23] outline-none text-xs font-black bg-white focus:bg-[#B9FF66]/10"
              />
            </div>
            <div>
              <label className="text-[9px] font-black text-slate-500 tracking-wider uppercase block mb-1">WEIGHT (KG)</label>
              <input
                type="number"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="71.5"
                className="w-full p-3 rounded-xl border-2 border-[#191A23] outline-none text-xs font-black bg-white focus:bg-[#B9FF66]/10"
              />
            </div>
          </div>

          <div className="p-4 bg-[#F3F3F3] border-2 border-[#191A23] rounded-2xl flex items-center justify-between text-xs font-black">
            <div>
              <span className="text-slate-600 font-bold block">Current BMI value</span>
              <span className="font-black text-[#191A23] font-mono text-base">
                {bmiValue.toFixed(1)} Unit
              </span>
            </div>
            <span className="text-[9px] text-[#191A23] bg-[#B9FF66] border border-[#191A23] px-2.5 py-1 rounded-sm font-black tracking-tight uppercase shadow-[1px_1px_0px_#191A23]">
              Healthy Range
            </span>
          </div>

          <button
            onClick={onAddWeightRecord}
            id="btn-matrix-add-weight"
            className="w-full py-3 px-4 bg-[#B9FF66] text-[#191A23] border-2 border-[#191A23] font-black text-xs rounded-xl shadow-[2px_2px_0px_#191A23] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer transition-all"
          >
            Commit Weight Entry
          </button>
        </motion.div>

        {/* Continuous posture photo visual checkin */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-[24px] border-2 border-[#191A23] shadow-[4px_4px_0px_#191A23] space-y-4 text-left"
        >
          <h4 className="font-black text-[#191A23] tracking-tight text-base font-sans">Progress Vision Journal</h4>
          <p className="text-xs text-slate-500 font-semibold whitespace-pre-wrap leading-relaxed">
            Upload visual posture photos periodically to monitor structural symmetrical changes.
          </p>
          
          <div className="grid grid-cols-4 gap-2.5">
            {progressPhotos.map((ph, i) => (
              <div key={i} className="relative aspect-square border-2 border-[#191A23] rounded-2xl overflow-hidden bg-[#F3F3F3] shadow-[1.5px_1.5px_0px_0px_#191A23]">
                <img
                  src={ph}
                  alt="progress log"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <label
              htmlFor="progress-photo-upload"
              className="aspect-square rounded-2xl border-2 border-[#191A23] bg-white hover:bg-[#F3F3F3] text-[#191A23] flex flex-col items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              {isUploading ? (
                <span className="text-[8px] font-mono font-black tracking-wider uppercase animate-pulse">Load...</span>
              ) : (
                <>
                  <Plus className="w-5 h-5 stroke-[3]" />
                  <span className="text-[8px] font-mono font-black tracking-wider uppercase">Upload</span>
                </>
              )}
              <input
                id="progress-photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
