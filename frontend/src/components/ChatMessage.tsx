import { ChatMessage as ChatMessageType } from '../types';
import { Bot, User as UserIcon } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatMessageProps {
  message: ChatMessageType;
  key?: any;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 px-1.5 max-w-full ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border-2 border-[#191A23] shadow-[1.5px_1.5px_0px_#191A23] shrink-0 ${
        isAssistant
          ? 'bg-[#B9FF66] text-[#191A23]'
          : 'bg-[#F3F3F3] text-[#191A23]'
      }`}>
        {isAssistant ? <Bot className="w-5 h-5 stroke-[2.5]" /> : <UserIcon className="w-4 h-4 stroke-[2.5]" />}
      </div>

      <div className={`relative max-w-[82%] px-4 py-3 rounded-2xl border-2 border-[#191A23] shadow-[2.5px_2.5px_0px_#191A23] transition-all ${
        isAssistant
          ? 'bg-white text-[#191A23] rounded-tl-none'
          : 'bg-[#F3F3F3] text-[#191A23] rounded-tr-none'
      }`}>
        <MarkdownRenderer content={message.content} />
        <span className="block text-[8px] font-black text-slate-500 font-mono mt-1 text-right select-none">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
