import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lesson, ContentBlock } from '@/pages/Index';

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

  const renderBlock = (block: ContentBlock) => {
    if (block.type === 'text') {
      return (
        <div key={block.id} className="prose prose-lg max-w-none dark:prose-invert my-4"
          dangerouslySetInnerHTML={{ __html: block.content }}
        ></div>
      );
    } else if (block.type === 'code') {
      return (
        <div key={block.id} className="relative group my-6">
          <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-600">
              <span className="text-sm text-slate-300 font-medium">{block.language || 'text'}</span>
              <Button variant="ghost" size="sm" onClick={() => copyToClipboard(block.content, block.id)} className="h-8 px-2 text-slate-300 hover:text-white hover:bg-slate-600">
                {copiedBlocks.has(block.id) ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-slate-100 font-mono leading-relaxed">
                {block.content}
              </code>
            </pre>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <article className="lesson-content">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
          {lesson.title}
        </h1>
      </div>
      <div className="animate-fade-in space-y-6">
        {lesson.codeBlocks && lesson.codeBlocks.map(renderBlock)}
      </div>
    </article>
  );
}
