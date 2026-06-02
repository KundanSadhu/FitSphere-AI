import React, { useState, useEffect } from 'react';
import { Play, Check, Clock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { ExerciseVideo } from './ExerciseVideo';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete?: (exerciseName: string) => void;
  index: number;
  key?: any;
}

export const ExerciseCard = ({ exercise, onComplete, index }: ExerciseCardProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [setsCompleted, setSetsCompleted] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(exercise.restSeconds);

  const handleSetComplete = () => {
    const next = setsCompleted + 1;
    setSetsCompleted(next);
    if (next >= exercise.sets) {
      setCompleted(true);
      onComplete?.(exercise.name);
    } else {
      startRest();
    }
  };

  const startRest = () => {
    setIsResting(true);
    setRestTime(exercise.restSeconds);
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isResting) {
      timerId = setInterval(() => {
        setRestTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isResting]);

  const progressPct = (setsCompleted / exercise.sets) * 100;

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-300 text-left ${
      completed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-8 h-8 rounded-lg font-mono flex items-center justify-center text-xs font-bold border ${
              completed ? 'bg-green-600 text-white border-transparent' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {index + 1}
            </span>
            <h3 className="font-bold text-slate-900 leading-tight text-base">{exercise.name}</h3>
            {completed && <Check className="w-5 h-5 text-green-600 stroke-[3px]" />}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 mt-2">
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">{exercise.sets} Sets</span>
            <span className="bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">{exercise.reps} Reps</span>
            <span className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5" /> {exercise.restSeconds}s Rest
            </span>
            <span className="text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
              {exercise.muscleGroup}
            </span>
          </div>
          {exercise.notes && (
            <p className="text-xs text-slate-600 mt-3 font-medium italic border-l-2 pl-2 border-slate-300">
              💡 {exercise.notes}
            </p>
          )}

          {showVideo && (
            <div className="mt-4 space-y-3">
              {exercise.steps && exercise.steps.length > 0 && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-xs uppercase mb-2 tracking-wider text-slate-800">Steps</h4>
                  <ol className="list-decimal list-inside text-xs font-medium space-y-1 text-slate-700">
                    {exercise.steps.map((step, i) => <li key={i}>{step}</li>)}
                  </ol>
                </div>
              )}
              {exercise.tips && exercise.tips.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-xs uppercase mb-2 tracking-wider text-blue-900 border-b border-blue-200 pb-1">Tips & Form Tricks</h4>
                  <ul className="list-disc list-inside text-xs font-medium space-y-1 text-blue-800">
                    {exercise.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              )}
              {exercise.precautions && exercise.precautions.length > 0 && (
                <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                  <h4 className="font-bold text-xs uppercase mb-2 tracking-wider text-red-900 flex items-center gap-1 border-b border-red-200 pb-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Precautions
                  </h4>
                  <ul className="list-disc list-inside text-xs font-medium space-y-1 text-red-800">
                    {exercise.precautions.map((precaution, i) => <li key={i}>{precaution}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setShowVideo(!showVideo)}
          className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            showVideo
              ? 'bg-indigo-600 text-white border-transparent shadow-md shadow-indigo-200'
              : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-sm'
          }`}
          title={showVideo ? 'Hide video demo' : 'Watch video demo'}
        >
          {showVideo ? <EyeOff className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-700" />}
        </button>
      </div>

      {/* Video Iframe View */}
      {showVideo && exercise.videoUrl && (
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
          <ExerciseVideo url={exercise.videoUrl} title={exercise.name} />
        </div>
      )}

      {/* Progress slider bar & actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500 tracking-wider font-mono uppercase">
            <span>SET TRAINING PROGRESS</span>
            <span>{setsCompleted} / {exercise.sets}</span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
            <div
              className={`h-full border-r border-transparent transition-all duration-500 ease-out ${completed ? 'bg-green-500' : 'bg-indigo-500'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {!completed && (
          <button
            onClick={handleSetComplete}
            disabled={isResting}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border ${
              isResting
                ? 'bg-amber-50 text-amber-700 border-amber-200 font-mono animate-pulse'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 border-transparent shadow-md shadow-indigo-200'
            }`}
          >
            {isResting ? (
              <>
                <Clock className="w-4 h-4" />
                <span>Rest: {restTime}s</span>
              </>
            ) : (
              <span>Complete Set {setsCompleted + 1}</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
