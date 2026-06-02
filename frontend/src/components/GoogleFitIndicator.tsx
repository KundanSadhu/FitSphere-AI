import React, { useEffect, useState, useRef } from 'react';
import { Activity, RefreshCw, CheckCircle2, AlertCircle, ShieldCheck, X } from 'lucide-react';
import { checkGoogleFitConnection, GoogleFitStatus } from '../lib/googleApi';

function parseErrorWithLinks(text: string) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  const parts = text.split(urlRegex);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return (
            <a 
              key={i} 
              href={part} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-600 hover:text-indigo-800 font-extrabold underline break-all inline"
            >
              Configure Fitness API
            </a>
          );
        }
        return part;
      })}
    </span>
  );
}

export function GoogleFitIndicator() {
  const [status, setStatus] = useState<GoogleFitStatus>({
    connected: false,
    message: 'Checking connection...'
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const fetchStatus = async () => {
    setIsSyncing(true);
    try {
      const result = await checkGoogleFitConnection();
      setStatus(result);
    } catch (e) {
      console.error('Failed to resolve Google Fit connection', e);
      setStatus({
        connected: false,
        message: 'Unable to query Google Fit APIs'
      });
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchStatus();

    // Custom event listener for refreshing when Google Login completes or weight updates
    const handleGoogleSyncEvent = () => {
      fetchStatus();
    };

    window.addEventListener('google-fit-sync-requested', handleGoogleSyncEvent);
    
    // Auto-refresh static sync check every 45 seconds
    const interval = setInterval(fetchStatus, 45000);

    return () => {
      window.removeEventListener('google-fit-sync-requested', handleGoogleSyncEvent);
      clearInterval(interval);
    };
  }, []);

  // Handle clicking outside of the popover to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleForceSync = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await fetchStatus();
    // Dispatch event to also update step state in Dashboard or anywhere else
    window.dispatchEvent(new CustomEvent('google-fit-steps-updated', { 
      detail: { steps: status.stepsCountToday } 
    }));
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Neo-brutalist trigger badge button */}
      <button
        id="gfit-indicator-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#191A23] font-mono text-xs font-black tracking-wide shadow-[2px_2px_0px_#191A23] transition-all cursor-pointer select-none active:translate-y-0.5 active:shadow-none ${
          status.connected 
            ? 'bg-[#B9FF66] text-[#191A23] hover:bg-[#a2e652]' 
            : 'bg-white text-slate-500 hover:text-[#191A23] hover:bg-slate-50'
        }`}
        title="Google Fit integration state"
      >
        <div className="relative flex items-center justify-center">
          <Activity className={`w-4 h-4 ${status.connected ? 'animate-pulse text-indigo-600' : 'text-slate-400'}`} />
          {status.connected && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#191A23] rounded-full" />
          )}
        </div>
        <span className="hidden sm:inline-block">
          {status.connected ? 'GOOGLE FIT: ON' : 'GOOGLE FIT: OFF'}
        </span>
        <span className="inline-block sm:hidden">
          {status.connected ? 'G-FIT' : 'G-FIT'}
        </span>
      </button>

      {/* Retro Neo-brutalist Popover Details Dialog */}
      {isOpen && (
        <div 
          id="gfit-detailed-popover"
          className="absolute right-0 mt-3 w-80 md:w-96 bg-white border-2 border-[#191A23] rounded-[20px] shadow-[6px_6px_0px_#191A23] p-5 z-50 animate-slide-up text-[#191A23]"
        >
          <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <span className="font-mono font-black text-xs uppercase tracking-widest text-[#191A23]">
                FITNESS DATA STREAM
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-[#191A23]" />
            </button>
          </div>

          <div className="space-y-4 pt-4">
            {/* Connection Status Flag */}
            <div className="flex items-start gap-3 p-3 rounded-xl border border-[#191A23] bg-white">
              {status.connected ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-left">
                <p className="text-xs font-black uppercase text-slate-400 leading-none mb-1 font-mono">
                  CONNECTION STATUS
                </p>
                <p className="text-xs font-bold leading-normal text-[#191A23]">
                  {status.message}
                </p>
              </div>
            </div>

            {/* Auth Metadata Info Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3 font-mono text-[11px] text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="text-slate-450 uppercase font-bold">OAuth Client State</span>
                <span className="font-extrabold text-[#191A23] bg-[#B9FF66] px-1.5 py-0.5 rounded border border-[#191A23] text-[9px]">
                  {status.connected ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-450 uppercase font-bold shrink-0">Google Project:</span>
                <span className="text-[#191A23] font-bold text-right break-all max-w-[180px]">
                  earnest-setup-498216-k9
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-slate-450 uppercase font-bold shrink-0">Required Scopes:</span>
                <span className="text-[#191A23] font-bold text-right">
                  fitness.activity.read<br/>
                  fitness.body.read
                </span>
              </div>
              {status.connected && (
                <>
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-200">
                    <span className="text-slate-450 uppercase font-bold">Steps Today:</span>
                    <span className="text-indigo-600 font-extrabold text-xs">
                      {status.stepsCountToday !== undefined ? status.stepsCountToday.toLocaleString() : '--'} steps
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 uppercase font-bold">Last Evaluated:</span>
                    <span className="text-[#191A23] font-bold">
                      {status.lastFetchedAt || 'N/A'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Explanations if not connected */}
            {!status.connected && (
              <div className="space-y-3">
                {status.error && (
                  <div className="bg-red-50 border-2 border-red-500 text-red-900 rounded-xl p-3 text-xs leading-relaxed text-left font-mono shadow-[2px_2px_0px_#EF4444] flex flex-col gap-1.5">
                    <div className="flex gap-2 items-center text-red-700 font-extrabold text-[10px]">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 text-red-600 animate-bounce" />
                      <span>API EXCEPTION / REQUIRES CONFIG</span>
                    </div>
                    <div className="text-[11px] leading-relaxed break-words text-slate-800">
                      {status.error.includes('Fitness API has not been used') ? (
                        <>
                          The <strong>Fitness API</strong> is disabled on your GCP project. Please click below to enable it:<br/>
                          <div className="mt-2">
                            {parseErrorWithLinks(status.error)}
                          </div>
                        </>
                      ) : (
                        parseErrorWithLinks(status.error)
                      )}
                    </div>
                  </div>
                )}
                <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-xs leading-relaxed text-left font-sans flex gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <p>
                    To sync realtime data, log out of FitSphere and log in using your Google Account configured with Fitness Permissions.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleForceSync}
                disabled={isSyncing}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#191A23] text-white font-mono text-xs font-extrabold rounded-xl border border-[#191A23] shadow-[2px_2px_0px_#B9FF66] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-50 disabled:translate-none disabled:shadow-none transition-all cursor-pointer uppercase"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Real Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
