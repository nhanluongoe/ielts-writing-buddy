import React from 'react';
import Markdown from 'react-markdown';

interface AnswerProps {
  content: string;
}

export default function Answer(props: AnswerProps) {
  const { content } = props;
  if (!content) return null;

  return (
    <div className="rounded-lg bg-gray-200 p-5 mt-5">
      <Markdown>{content}</Markdown>
    </div>
  );
}
