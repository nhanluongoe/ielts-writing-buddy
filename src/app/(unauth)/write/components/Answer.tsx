import type { CSSProperties } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ResponseLoadingIndicator from '@/components/ResponseLoadingIndicator';
import ResponsePanelToolbar from '@/components/ResponsePanelToolbar';

interface AnswerProps {
  content: string;
  isLoading: boolean;
  panelHeight?: number;
}

export default function Answer(props: AnswerProps) {
  const { content, isLoading, panelHeight } = props;
  const panelStyle = panelHeight
    ? ({
        '--response-panel-height': `${panelHeight}px`,
        scrollbarColor: 'gray transparent',
        scrollbarGutter: 'stable',
      } as CSSProperties)
    : {
        scrollbarColor: 'gray transparent',
        scrollbarGutter: 'stable',
      };
  const panelHeightClass = panelHeight
    ? 'lg:h-[var(--response-panel-height)] lg:max-h-[var(--response-panel-height)]'
    : 'max-h-[72vh]';

  if (!content && isLoading) {
    return (
      <ResponseLoadingIndicator
        className={panelHeightClass}
        label="Drafting your answer..."
        style={panelStyle}
      />
    );
  }

  if (!content && !isLoading) {
    return (
      <aside
        className={`flex min-h-[24rem] rounded-lg border border-dashed border-slate-700 bg-slate-900/45 p-6 ${panelHeightClass}`}
        style={panelStyle}
      >
        <div className="m-auto max-w-sm text-center">
          <p className="text-lg font-semibold text-slate-200">
            Your sample answer will appear here
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Add the IELTS prompt, include an image for Task 1 when needed, and
            generate a structured response.
          </p>
        </div>
      </aside>
    );
  }

  return (
    <div
      className={`answer overflow-auto rounded-lg border border-slate-700 bg-slate-900/80 p-5 text-slate-200 ${panelHeightClass}`}
      style={panelStyle}
    >
      <ResponsePanelToolbar content={content} />
      {isLoading && (
        <ResponseLoadingIndicator compact label="Still drafting..." />
      )}
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
