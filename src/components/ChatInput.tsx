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
    <div id="chat-input-wrapper" className="border-t border-slate-100 bg-white pt-4">
      <div className="flex items-end gap-2 bg-slate-50 rounded-xl border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white focus-within:border-indigo-600 transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleInputResize();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask Coach Sphere about hypertrophy splits, posture, fat synthesis, or hydration tips..."
          rows={1}
          className="flex-1 px-3 py-2 resize-none outline-none text-sm text-slate-900 placeholder:text-slate-400 bg-transparent max-h-[120px] font-medium leading-relaxed"
        />
        
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 cursor-pointer shadow-md shadow-indigo-150"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="w-4.5 h-4.5" />
          )}
        </button>
      </div>
      
      <p className="text-[10px] text-slate-400 font-bold mt-2 text-center flex items-center justify-center gap-1 uppercase tracking-wider font-mono">
        <Sparkles className="w-3 h-3 text-indigo-400" /> Powered by Gemini-3.5-Flash AI • Direct coaching feedback
      </p>
    </div>
  );
};
