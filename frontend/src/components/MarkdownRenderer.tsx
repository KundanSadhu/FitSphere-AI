import React from 'react';

// Highly precise recursive parser for inline elements (bolds, italics, and inline code)
export function parseInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining) {
    const inlineCodeIdx = remaining.indexOf('`');
    const boldIdx = remaining.indexOf('**');
    const italicIdx = remaining.indexOf('*');

    let earliest = -1;
    let type: 'code' | 'bold' | 'italic' | 'none' = 'none';

    if (inlineCodeIdx !== -1) {
      if (earliest === -1 || inlineCodeIdx < earliest) {
        earliest = inlineCodeIdx;
        type = 'code';
      }
    }
    if (boldIdx !== -1) {
      if (earliest === -1 || boldIdx < earliest) {
        earliest = boldIdx;
        type = 'bold';
      }
    }
    if (italicIdx !== -1) {
      if (boldIdx !== earliest && (earliest === -1 || italicIdx < earliest)) {
        earliest = italicIdx;
        type = 'italic';
      }
    }

    if (type === 'none' || earliest === -1) {
      tokens.push(remaining);
      break;
    }

    if (earliest > 0) {
      tokens.push(remaining.substring(0, earliest));
    }

    remaining = remaining.substring(earliest);

    if (type === 'code') {
      const closeIdx = remaining.indexOf('`', 1);
      if (closeIdx !== -1) {
        tokens.push(
          <code key={`code-${idx++}`} className="px-1.5 py-0.5 bg-slate-100 text-[#191A23] font-mono text-xs rounded border border-slate-200/80 font-black">
            {remaining.substring(1, closeIdx)}
          </code>
        );
        remaining = remaining.substring(closeIdx + 1);
      } else {
        tokens.push(remaining);
        break;
      }
    } else if (type === 'bold') {
      const closeIdx = remaining.indexOf('**', 2);
      if (closeIdx !== -1) {
        tokens.push(
          <strong key={`bold-${idx++}`} className="font-extrabold text-slate-900">
            {parseInline(remaining.substring(2, closeIdx))}
          </strong>
        );
        remaining = remaining.substring(closeIdx + 2);
      } else {
        tokens.push(remaining);
        break;
      }
    } else if (type === 'italic') {
      const closeIdx = remaining.indexOf('*', 1);
      if (closeIdx !== -1) {
        tokens.push(
          <em key={`italic-${idx++}`} className="italic text-slate-700">
            {parseInline(remaining.substring(1, closeIdx))}
          </em>
        );
        remaining = remaining.substring(closeIdx + 1);
      } else {
        tokens.push(remaining);
        break;
      }
    }
  }

  return tokens;
}

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  
  let currentBlockType: 'p' | 'ul' | 'ol' | 'code' | 'none' = 'none';
  let listItems: string[] = [];
  let codeBlockLines: string[] = [];
  let codeBlockLang = '';
  
  const flushCurrentBlock = (keyPrefix: string) => {
    if (currentBlockType === 'ul' && listItems.length > 0) {
      renderedElements.push(
        <ul key={`${keyPrefix}-ul`} className="my-3 space-y-1.5 list-disc pl-5 text-slate-700 text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed font-semibold">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    } else if (currentBlockType === 'ol' && listItems.length > 0) {
      renderedElements.push(
        <ol key={`${keyPrefix}-ol`} className="my-3 space-y-1.5 list-decimal pl-5 text-slate-700 text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed font-semibold">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      listItems = [];
    } else if (currentBlockType === 'code' && codeBlockLines.length > 0) {
      renderedElements.push(
        <div key={`${keyPrefix}-code`} className="my-4 rounded-xl border border-slate-200 overflow-hidden bg-slate-900 shadow-sm">
          {codeBlockLang && (
            <div className="bg-slate-950 px-4 py-1.5 text-[10px] font-mono text-slate-400 border-b border-white/5 flex items-center justify-between">
              <span>{codeBlockLang.toUpperCase()}</span>
              <span className="text-[9px] text-emerald-400 font-bold bg-emerald-950/50 px-1 rounded">METHOD DIRECTIVE</span>
            </div>
          )}
          <pre className="p-4 overflow-x-auto text-xs font-mono text-indigo-200 leading-relaxed bg-[#0b0f19]">
            <code>{codeBlockLines.join('\n')}</code>
          </pre>
        </div>
      );
      codeBlockLines = [];
      codeBlockLang = '';
    }
    currentBlockType = 'none';
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // 1. Detect code block fences
    if (trimmed.startsWith('```')) {
      if (currentBlockType === 'code') {
        flushCurrentBlock(`line-${i}`);
      } else {
        flushCurrentBlock(`line-${i}`);
        currentBlockType = 'code';
        codeBlockLang = trimmed.substring(3).trim();
      }
      continue;
    }

    if (currentBlockType === 'code') {
      codeBlockLines.push(line);
      continue;
    }

    // 2. Headings
    if (trimmed.startsWith('#')) {
      flushCurrentBlock(`line-${i}`);
      const hMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (hMatch) {
         const depth = hMatch[1].length;
         const titleText = hMatch[2];
         if (depth === 1) {
           renderedElements.push(
             <h1 key={`h1-${i}`} className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-5 mb-2 border-b pb-2">
               {parseInline(titleText)}
             </h1>
           );
         } else if (depth === 2) {
           renderedElements.push(
             <h2 key={`h2-${i}`} className="text-lg sm:text-xl font-black text-slate-800 tracking-tight mt-4.5 mb-2.5">
               {parseInline(titleText)}
             </h2>
           );
         } else if (depth === 3) {
           renderedElements.push(
             <h3 key={`h3-${i}`} className="text-sm sm:text-base font-black text-slate-900 tracking-tight mt-4 mb-2">
               {parseInline(titleText)}
             </h3>
           );
         } else {
           renderedElements.push(
             <h4 key={`h4-${i}`} className="text-xs sm:text-sm font-extrabold text-slate-700 tracking-tight mt-3 mb-1.5 uppercase font-mono">
               {parseInline(titleText)}
             </h4>
           );
         }
         continue;
      }
    }

    // 3. Bullet list items * or -
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const bulletContent = trimmed.substring(2).trim();
      if (currentBlockType !== 'ul') {
        flushCurrentBlock(`line-${i}`);
        currentBlockType = 'ul';
      }
      listItems.push(bulletContent);
      continue;
    }

    // 4. Ordered list items
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      const orderContent = olMatch[2].trim();
      if (currentBlockType !== 'ol') {
        flushCurrentBlock(`line-${i}`);
        currentBlockType = 'ol';
      }
      listItems.push(orderContent);
      continue;
    }

    // 5. Blank lines
    if (trimmed === '') {
      flushCurrentBlock(`line-${i}`);
      continue;
    }

    // 6. Paragraph line
    if (currentBlockType !== 'ul' && currentBlockType !== 'ol') {
      renderedElements.push(
        <p key={`p-${i}`} className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed my-1.5">
          {parseInline(line)}
        </p>
      );
    } else {
      if (currentBlockType === 'ul' || currentBlockType === 'ol') {
        listItems[listItems.length - 1] += ' ' + trimmed;
      }
    }
  }

  flushCurrentBlock('final');

  return (
    <div className="whitespace-normal break-words text-left space-y-1.5">
      {renderedElements}
    </div>
  );
}
