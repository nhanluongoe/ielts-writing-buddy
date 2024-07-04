import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnswerProps {
  content: string;
}

export default function Answer(props: AnswerProps) {
  const { content } = props;
  if (!content) return null;

  return (
    <div className="rounded-lg p-5 mt-5 text-zinc-100">
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
