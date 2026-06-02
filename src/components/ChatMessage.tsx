import { ChatMessage as ChatMessageType } from '../types';
import { Bot, User as UserIcon } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  key?: any;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.role === 'assistant';

  // Simple, highly performant regex-based markdown parser to avoid heavy npm libraries
  const renderFormattedContent = (text: string) => {
    // Escape standard HTML tags
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks `code`
    html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-150 rounded text-slate-800 font-mono text-xs border border-slate-200 font-bold">$1</code>');

    // Bold text **bold**
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');

    // Italic text *italic*
    html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-700">$1</em>');

    // Bullet points (bullet-point lists starting with * or - followed by space)
    html = html.replace(/^(?:\*|-)\s+(.+)$/gm, '<li class="ml-4 list-disc pl-1 text-slate-700 my-1">$1</li>');

    // Headers like ### title or ## title
    html = html.replace(/^###\s+(.+)$/gm, '<h5 class="text-sm font-bold text-slate-950 tracking-tight mt-4 mb-2">$1</h5>');
    html = html.replace(/^##\s+(.+)$/gm, '<h4 class="text-base font-extrabold text-slate-950 tracking-tight mt-5 mb-2.5">$1</h4>');

    // Paragraphs
    const lines = html.split('\n');
    const groupedLines = lines.map((line) => {
      if (line.trim().startsWith('<li') || line.trim().startsWith('<h')) {
        return line;
      }
      return line.trim() ? `<p class="my-2 text-slate-700 leading-relaxed">${line}</p>` : '';
    });

    return (
      <div
        className="text-sm font-medium space-y-1.5"
        dangerouslySetInnerHTML={{ __html: groupedLines.join('\n') }}
      />
    );
  };

  return (
    <div className={`flex gap-3.5 max-w-full ${isAssistant ? '' : 'flex-row-reverse'}`}>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-soft-sm shrink-0 ${
        isAssistant
          ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white'
          : 'bg-slate-100 text-slate-600 border border-slate-200'
      }`}>
        {isAssistant ? <Bot className="w-5 h-5" /> : <UserIcon className="w-4 h-4" />}
      </div>

      <div className={`relative max-w-[82%] px-4 py-3 rounded-2xl shadow-soft-sm border transition-all ${
        isAssistant
          ? 'bg-white border-slate-100 rounded-tl-none'
          : 'bg-indigo-50/50 border-indigo-100 rounded-tr-none text-slate-800'
      }`}>
        {renderFormattedContent(message.content)}
        <span className="block text-[9px] font-bold text-slate-400 font-mono mt-1 right-3 bottom-1 select-none text-right">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
