import { useState, useEffect } from 'react';
import { Play, Check, Clock, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { ExerciseVideo } from './ExerciseVideo';

interface ExerciseCardProps {
  exercise: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
    videoUrl: string;
    notes?: string;
    muscleGroup: string;
  };
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
    <div className={`p-5 rounded-2xl border bg-white shadow-soft-sm transition-all duration-300 ${
      completed ? 'border-emerald-300 bg-emerald-50/20 shadow-none' : 'border-slate-100'
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-7 h-7 rounded-lg font-mono flex items-center justify-center text-xs font-bold ${
              completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {index + 1}
            </span>
            <h3 className="font-bold text-slate-900 leading-tight">{exercise.name}</h3>
            {completed && <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 mt-1">
            <span className="bg-slate-50 px-2 py-0.5 rounded text-slate-600">{exercise.sets} Sets</span>
            <span className="bg-slate-50 px-2 py-0.5 rounded text-slate-600">{exercise.reps} Reps</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5" /> {exercise.restSeconds}s Rest
            </span>
            <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
              {exercise.muscleGroup}
            </span>
          </div>
          {exercise.notes && (
            <p className="text-xs text-slate-500 mt-2.5 font-medium italic border-l-2 pl-2 border-slate-200">
              💡 {exercise.notes}
            </p>
          )}
        </div>

        <button
          onClick={() => setShowVideo(!showVideo)}
          className={`flex-shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
            showVideo
              ? 'bg-slate-900 border-slate-900 text-white shadow-md'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title={showVideo ? 'Hide video demo' : 'Watch video demo'}
        >
          {showVideo ? <EyeOff className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-500 text-slate-500 hover:fill-slate-600" />}
        </button>
      </div>

      {/* Video Iframe View */}
      {showVideo && exercise.videoUrl && (
        <div className="mt-4 rounded-xl overflow-hidden shadow-inner">
          <ExerciseVideo url={exercise.videoUrl} title={exercise.name} />
        </div>
      )}

      {/* Progress slider bar & actions */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500 tracking-wider">
            <span>SET TRAINING PROGRESS</span>
            <span>{setsCompleted} / {exercise.sets}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {!completed && (
          <button
            onClick={handleSetComplete}
            disabled={isResting}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer ${
              isResting
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200 animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isResting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Resting: {restTime}s</span>
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
