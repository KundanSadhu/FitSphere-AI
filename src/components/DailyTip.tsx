import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

export const DailyTip = () => {
  const [tip, setTip] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTip = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/daily-tip');
      const data = await res.json();
      setTip(data.tip);
    } catch (err) {
      console.error(err);
      setTip('Stay adequately hydrated! Consuming 500ml of fresh water before training session primes joint lubrication.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div id="daily-tip-box" className="p-5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/20 rounded-full blur-xl pointer-events-none -mr-8 -mt-8" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="p-2.5 rounded-lg bg-violet-500 text-white shadow-soft-sm flex items-center justify-center">
            <Sparkles className="w-5 h-5 fill-violet-100" />
          </div>
          <div>
            <span className="text-xs font-bold text-violet-600 tracking-wide uppercase">AI Daily Tip</span>
            <p className="text-sm font-medium text-slate-700 mt-1 leading-relaxed">
              {loading ? (
                <span className="inline-flex gap-1 items-center text-slate-500 animate-pulse">
                  Querying neural database...
                </span>
              ) : (
                tip
              )}
            </p>
          </div>
        </div>
        <button
          onClick={fetchTip}
          disabled={loading}
          className="p-1.5 rounded-full hover:bg-violet-100 text-violet-500 transition-colors cursor-pointer"
          title="Regenerate dynamic tip"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </div>
  );
};
