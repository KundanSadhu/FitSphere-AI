import { useState } from 'react';
import { Play, EyeOff } from 'lucide-react';

interface ExerciseVideoProps {
  url: string;
  title: string;
}

export const ExerciseVideo = ({ url, title }: ExerciseVideoProps) => {
  const [loaded, setLoaded] = useState(false);

  // Helper method matching the spec to resolve normal youtube watch urls into embed URLs
  const getYoutubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const id = match?.[2]?.length === 11 ? match[2] : null;
    return id ? `https://www.youtube.com/embed/${id}?rel=0` : url;
  };

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-800">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3 z-10 bg-slate-950">
          <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-[10px] font-mono tracking-wider">RESOLVING MEDIA HOST...</span>
        </div>
      )}
      <iframe
        src={getYoutubeEmbedUrl(url)}
        title={title}
        className={`w-full h-full relative z-20 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        allowFullScreen
        referrerPolicy="no-referrer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
