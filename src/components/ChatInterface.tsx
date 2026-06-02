import { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
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
                  setStreamingText((prev) => prev + parsed.chunk);
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
          content: streamingText || 'Success! Let me know what else I can optimize for you.',
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
    <div id="chat-coach-wrapper" className="flex flex-col h-[600px] bg-white border border-slate-100 rounded-3xl shadow-soft-sm p-5 overflow-hidden">
      {/* Dynamic Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-500 to-indigo-600 shadow-md text-white flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-extrabold text-slate-900 tracking-tight text-base leading-tight">Coach Sphere</h2>
          <p className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 24/7 BIOMECHANICAL AGENT
          </p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 pb-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 tracking-tight text-base">Optimize Your Biomechanics</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-6 font-medium leading-relaxed">
              Ask about hyper-targeted movements, nutrition calculations, sleep restoration, or posture alignment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg">
              {SUGGESTED_QS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="px-4 py-3 text-left text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition-all cursor-pointer leading-normal flex items-center justify-between"
                >
                  <span>{q}</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-2" />
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
          <div className="flex gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-soft-sm shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="relative max-w-[82%] px-4 py-3 rounded-2xl shadow-soft-sm border bg-white border-slate-100 rounded-tl-none">
              <div className="text-sm font-medium space-y-1.5 leading-relaxed text-slate-800">
                {streamingText.split('\n').map((para, ind) => (
                  <p key={ind} className="my-1 whitespace-pre-wrap">{para}</p>
                ))}
              </div>
              <span className="inline-block w-1.5 h-4 bg-indigo-600 ml-1 animate-pulse" />
            </div>
          </div>
        )}

        {/* API Error indicator */}
        {errorText && (
          <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            <AlertCircle className="w-5 h-5" />
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
