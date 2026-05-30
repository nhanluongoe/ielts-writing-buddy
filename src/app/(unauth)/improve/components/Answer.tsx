import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AnswerProps {
  content: string;
  isLoading: boolean;
}

export default function Answer(props: AnswerProps) {
  const { content, isLoading } = props;

  if (!content && !isLoading) {
    return (
      <aside className="flex min-h-[24rem] rounded-lg border border-dashed border-slate-700 bg-slate-900/45 p-6">
        <div className="m-auto max-w-sm text-center">
          <p className="text-lg font-semibold text-slate-200">
            Feedback will appear here
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Paste your answer and the assistant will return strengths,
            improvements, and a clearer revision path.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <div
      className="answer max-h-[72vh] overflow-auto rounded-lg border border-slate-700 bg-slate-900/80 p-5 text-slate-200"
      style={{ scrollbarColor: 'gray transparent', scrollbarGutter: 'stable' }}
    >
      {isLoading && !content && (
        <p className="text-sm font-semibold text-teal-200">
          Reviewing your answer...
        </p>
      )}
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
