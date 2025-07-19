
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lesson } from '@/pages/Index';

interface LessonContentProps {
  lesson: Lesson;
}

export function LessonContent({ lesson }: LessonContentProps) {
  const [copiedBlocks, setCopiedBlocks] = useState<Set<string>>(new Set());

  const copyToClipboard = async (code: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedBlocks(prev => new Set(prev).add(blockId));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet.delete(blockId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const renderContent = (content: string) => {
    // Split content into paragraphs and code blocks
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/g);
    const elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0) {
        // Regular text content
        if (parts[i].trim()) {
          const textParts = parts[i].split('\n\n').filter(p => p.trim());
          textParts.forEach((paragraph, pIndex) => {
            elements.push(
              <div key={`text-${i}-${pIndex}`} className="prose prose-lg max-w-none dark:prose-invert">
                {formatText(paragraph)}
              </div>
            );
          });
        }
      } else if (i % 3 === 1) {
        // Language identifier
        continue;
      } else {
        // Code block content
        const language = parts[i - 1] || 'text';
        const code = parts[i];
        const blockId = `code-${i}`;
        
        elements.push(
          <div key={blockId} className="relative group my-6">
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Code block header */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 dark:bg-slate-700 border-b border-slate-700 dark:border-slate-600">
                <span className="text-sm text-slate-300 font-medium">{language}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(code, blockId)}
                  className="h-8 px-2 text-slate-300 hover:text-white hover:bg-slate-600"
                >
                  {copiedBlocks.has(blockId) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {/* Code content */}
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm text-slate-100 font-mono leading-relaxed">
                  {formatCodeWithSyntaxHighlighting(code, language)}
                </code>
              </pre>
            </div>
          </div>
        );
      }
    }
    
    return elements;
  };

  const formatText = (text: string) => {
    // Handle headers
    if (text.startsWith('# ')) {
      return <h1 className="text-4xl font-bold mt-8 mb-6 text-gray-900 dark:text-white">{text.slice(2)}</h1>;
    }
    if (text.startsWith('## ')) {
      return <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{text.slice(3)}</h2>;
    }
    if (text.startsWith('### ')) {
      return <h3 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{text.slice(4)}</h3>;
    }
    if (text.startsWith('#### ')) {
      return <h4 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">{text.slice(5)}</h4>;
    }

    // Handle lists
    if (text.includes('\n- ') || text.includes('\n* ')) {
      const items = text.split('\n').filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
      if (items.length > 0) {
        return (
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            {items.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {formatInlineElements(item.replace(/^[\s]*[-*]\s/, ''))}
              </li>
            ))}
          </ul>
        );
      }
    }

    // Handle numbered lists
    if (/^\d+\./.test(text.trim())) {
      const items = text.split('\n').filter(line => /^\d+\./.test(line.trim()));
      if (items.length > 0) {
        return (
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            {items.map((item, index) => (
              <li key={index} className="leading-relaxed">
                {formatInlineElements(item.replace(/^\d+\.\s/, ''))}
              </li>
            ))}
          </ol>
        );
      }
    }

    // Regular paragraphs
    return (
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        {formatInlineElements(text)}
      </p>
    );
  };

  const formatInlineElements = (text: string) => {
    // Handle inline code
    return text.split(/(`[^`]+`)/).map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-mono text-blue-600 dark:text-blue-400">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const formatCodeWithSyntaxHighlighting = (code: string, language: string) => {
    // Basic syntax highlighting for common languages
    const lines = code.split('\n');
    
    return lines.map((line, index) => (
      <div key={index} className="min-h-[1.5rem]">
        {highlightSyntax(line, language)}
      </div>
    ));
  };

  const highlightSyntax = (line: string, language: string) => {
    if (!line.trim()) return '\n';
    
    let highlightedLine = line;
    
    // Language-specific highlighting
    if (language === 'go' || language === 'golang') {
      // Go keywords
      highlightedLine = highlightedLine.replace(
        /\b(package|import|func|var|const|if|else|for|range|return|type|struct|interface|map|chan|go|defer|select|case|default|switch|break|continue)\b/g,
        '<span class="text-purple-400">$1</span>'
      );
      // Go types
      highlightedLine = highlightedLine.replace(
        /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float32|float64|string|bool|byte|rune)\b/g,
        '<span class="text-blue-400">$1</span>'
      );
    } else if (language === 'rust') {
      // Rust keywords
      highlightedLine = highlightedLine.replace(
        /\b(fn|let|mut|const|static|if|else|match|for|while|loop|return|break|continue|struct|enum|impl|trait|pub|use|mod|crate|super|self|where|async|await|unsafe|extern)\b/g,
        '<span class="text-purple-400">$1</span>'
      );
      // Rust types
      highlightedLine = highlightedLine.replace(
        /\b(i8|i16|i32|i64|i128|u8|u16|u32|u64|u128|f32|f64|bool|char|str|String|Vec|Option|Result)\b/g,
        '<span class="text-blue-400">$1</span>'
      );
    }
    
    // Comments
    highlightedLine = highlightedLine.replace(
      /(\/\/.*$|\/\*.*?\*\/|#.*$)/g,
      '<span class="text-green-400">$1</span>'
    );
    
    // Strings
    highlightedLine = highlightedLine.replace(
      /(".*?"|'.*?'|`.*?`)/g,
      '<span class="text-yellow-300">$1</span>'
    );
    
    // Numbers
    highlightedLine = highlightedLine.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="text-orange-400">$1</span>'
    );

    return <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />;
  };

  return (
    <article className="lesson-content">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
          {lesson.title}
        </h1>
      </div>
      
      <div className="animate-fade-in space-y-6">
        {renderContent(lesson.content)}
      </div>
    </article>
  );
}
