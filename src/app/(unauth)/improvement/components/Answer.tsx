import React from 'react';
import Markdown from 'react-markdown';

interface AnswerProps {
  content: string;
}

export default function Answer(props: AnswerProps) {
  const { content } = props;

  return (
    <div>
      <Markdown>{content}</Markdown>
    </div>
  );
}
