import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Sparkles, HelpCircle } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    onSend(text);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  return (
    <div id="chat-input-wrapper" className="border-t-2 border-[#191A23]/10 bg-white pt-4">
      <div className="flex items-end gap-2 bg-[#F3F3F3] rounded-[20px] border-2 border-[#191A23] p-2 focus-within:ring-2 focus-within:ring-[#B9FF66]/20 focus-within:bg-white transition-all shadow-[2px_2px_0px_#191A23]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleInputResize();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask Coach Sphere about workout splits, posture, calories, or diet advice..."
          rows={1}
          className="flex-1 px-3 py-2 resize-none outline-none text-xs sm:text-sm text-[#191A23] placeholder:text-slate-450 bg-transparent max-h-[120px] font-black leading-relaxed"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 rounded-xl bg-[#B9FF66] border-2 border-[#191A23] text-[#191A23] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 cursor-pointer shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-[#191A23] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-[#191A23] stroke-[3]" />
          )}
        </button>
      </div>
      
      <p className="text-[10px] text-slate-500 font-extrabold mt-2 text-center flex items-center justify-center gap-1 uppercase tracking-wider font-mono">
        <Sparkles className="w-3.5 h-3.5 text-[#191A23] fill-[#B9FF66]" /> Powered by Gemini AI • Direct Coaching Feedback
      </p>
    </div>
  );
};
