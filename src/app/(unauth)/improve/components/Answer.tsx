import ParagraphLoadingSkeleton from '@/components/ParagraphLoadingSkeleton';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnswerProps {
  content: string;
  isLoading: boolean;
}

export default function Answer(props: AnswerProps) {
  const { content, isLoading } = props;

  if (!content) return null;

  return (
    <div
      className="text-gray-200 answer bg-[#2B2F36] w-1/2 ml-1 p-3 max-h-screen overflow-auto"
      style={{ scrollbarColor: 'gray transparent', scrollbarGutter: 'stable' }}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
