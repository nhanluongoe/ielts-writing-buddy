import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnswerProps {
  content: string;
  isLoading: boolean;
}

export default function Answer(props: AnswerProps) {
  const { content } = props;

  if (!content) return null;

  return (
    <div
      className="text-gray-200 answer bg-[#2B2F36] w-1/2 ml-1 p-3"
      style={{ scrollbarColor: 'gray transparent', scrollbarGutter: 'stable' }}
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
