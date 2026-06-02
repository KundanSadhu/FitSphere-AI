import { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { MarkdownRenderer } from './MarkdownRenderer';
import { Sparkles, Bot, AlertCircle } from 'lucide-react';

interface ChatInterfaceProps {
  initialMessages?: ChatMessageType[];
}

export const ChatInterface = ({ initialMessages = [] }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessageType[]>(initialMessages);
  const [streamingText, setStreamingText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const handleSend = async (text: string) => {
    setErrorText(null);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add User message
    const userMsg: ChatMessageType = {
      role: 'user',
      content: text,
      timestamp: timeString
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setStreamingText('');

    let accumulatedText = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-10) // feed latest 10 messages for continuous buffer context
        })
      });

      if (!response.body) {
        throw new Error('Streaming not supported or failed on host!');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        let chunkText = decoder.decode(value, { stream: !done });
        buffer += chunkText;

        // Process SSE lines
        const lines = buffer.split('\n');
        // Save the last incomplete line back to buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          const cleanedLine = line.trim();
          if (cleanedLine.startsWith('data: ')) {
            const dataStr = cleanedLine.slice(6);
            if (dataStr === '[DONE]') {
              done = true;
            } else {
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.error) {
                  setErrorText(parsed.error);
                } else if (parsed.chunk) {
                  accumulatedText += parsed.chunk;
                  setStreamingText(accumulatedText);
                }
              } catch (e) {
                // Ignore incomplete JSONs
              }
            }
          }
        }
      }

      // 2. Commit completed response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: accumulatedText.trim() || 'Success! Let me know what else I can optimize for you.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setStreamingText('');
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      // Fallback fallback simulated response
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I momentarily lost connection with the FitSphere core server. Progressive overload splits, hydration balance, and sleep deep REM restoration remain paramount to hypertrophy. Let me know which exact muscle target we are refining!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const SUGGESTED_QS = [
    'Recommend a 3-day intermediate split schedule',
    'Perfect posture check guides for incline presses',
    'Calculate aesthetic macro rules for lean muscle',
    'Hydration rules during high intensity sessions'
  ];

  return (
    <div id="chat-coach-wrapper" className="flex flex-col h-[550px] bg-white border-2 border-[#191A23] rounded-[24px] shadow-[4px_4px_0px_#191A23] p-5 overflow-hidden text-left">
      {/* Dynamic Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b-2 border-[#191A23] mb-4">
        <div className="w-11 h-11 rounded-2xl bg-[#B9FF66] border-2 border-[#191A23] shadow-[2px_2px_0px_#191A23] text-[#191A23] flex items-center justify-center shrink-0">
          <Bot className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div>
          <h2 className="font-black text-[#191A23] tracking-tight text-base leading-tight">Coach Sphere</h2>
          <p className="text-[10px] font-black text-slate-500 font-mono tracking-wider uppercase flex items-center gap-1.5 mt-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9FF66] border border-[#191A23]" /> 24/7 BIOMECHANICAL ASSISTANT
          </p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 pb-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#B9FF66] border-2 border-[#191A23] shadow-[3px_3px_0px_#191A23] text-[#191A23] flex items-center justify-center mb-4">
              <Bot className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="font-black text-[#191A23] tracking-tight text-base">Optimize Your Workouts</h3>
            <p className="text-xs text-slate-550 max-w-sm mt-1 mb-6 font-semibold leading-relaxed">
              Ask about target split movements, physical form guidelines, nutrition metrics, or workout scheduling.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTED_QS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-3 text-left text-xs font-black text-[#191A23] bg-white hover:bg-[#F3F3F3] border-2 border-[#191A23] rounded-2xl transition-all shadow-[2px_2px_0px_#191A23] active:translate-y-0.5 active:shadow-none cursor-pointer leading-normal flex items-center justify-between"
                >
                  <span className="truncate mr-1">{q}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#191A23] shrink-0 ml-1.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render each historical message bubble */}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {/* Streaming text bubble */}
        {streamingText && (
          <div className="flex gap-3 px-1.5">
            <div className="w-9 h-9 rounded-xl bg-[#B9FF66] border-2 border-[#191A23] text-[#191A23] flex items-center justify-center shadow-[1.5px_1.5px_0px_#191A23] shrink-0">
              <Bot className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="relative max-w-[82%] px-4 py-3 rounded-2xl border-2 border-[#191A23] bg-white text-[#191A23] shadow-[2.5px_2.5px_0px_#191A23] rounded-tl-none">
              <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                <MarkdownRenderer content={streamingText} />
                <span className="inline-block w-1.5 h-3.5 bg-[#191A23] ml-1 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* API Error indicator */}
        {errorText && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border-2 border-[#191A23] text-rose-700 text-xs font-black shadow-[2px_2px_0px_#191A23]">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>AI Interface error: {errorText}</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Chat input form container */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
};
