import { useState } from 'react';
import { Play, EyeOff, Youtube, ExternalLink, HelpCircle, Sparkles } from 'lucide-react';

interface ExerciseVideoProps {
  url: string;
  title: string;
}

export const ExerciseVideo = ({ url, title }: ExerciseVideoProps) => {
  const [loaded, setLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Helper method matching the spec to resolve normal youtube watch urls into embed URLs securely
  const getYoutubeEmbedUrl = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      const id = match?.[2]?.length === 11 ? match[2] : null;
      return id ? `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=0` : url;
    } catch (e) {
      return url;
    }
  };

  const embedUrl = getYoutubeEmbedUrl(url);

  // Generate a premium search URL fallback in case of blocklists or generic errors
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " exercise form demo")}`;

  return (
    <div className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-800 transition-all duration-350">
      
      {/* Loading state indicator visual */}
      {!loaded && !iframeError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3 z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <Play className="w-5 h-5 text-indigo-400 animate-pulse fill-indigo-400/30" />
          </div>
          <div className="text-center space-y-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 block">LOADING VIDEO...</span>
            <span className="text-[9px] text-slate-500 font-semibold block">{title}</span>
          </div>
        </div>
      )}

      {/* Frame view */}
      {!iframeError && (
        <iframe
          src={embedUrl}
          title={title}
          className={`w-full h-full relative z-20 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 border-0`}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setLoaded(true)}
          onError={() => setIframeError(true)}
        />
      )}

      {/* Absolute Header Overlay for Video */}
      <div className="absolute top-3 left-3 right-3 z-30 flex justify-between items-center pointer-events-none">
        <span className="pointer-events-auto backdrop-blur-md bg-black/50 border border-white/10 px-2.5 py-1 rounded-xl text-[10px] font-medium text-white flex items-center gap-1.5">
          <Youtube className="w-3 h-3 text-red-500" />
          <span>Exercise Demo</span>
        </span>

        <div className="flex gap-1.5 pointer-events-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-md bg-black/50 hover:bg-black/70 border border-white/10 p-2 rounded-xl text-white transition-all cursor-pointer flex items-center justify-center"
            title="Open on YouTube"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href={searchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-md bg-black/50 hover:bg-black/70 border border-white/10 p-2 rounded-xl text-white transition-all cursor-pointer flex items-center justify-center"
            title="Search alternatives"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

