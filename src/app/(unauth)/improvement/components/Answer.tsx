import React from 'react';

interface AnswerProps {
  content: string;
}

export default function Answer(props: AnswerProps) {
  const { content } = props;

  return (
    <div>
      <p>{content}</p>
    </div>
  );
}
