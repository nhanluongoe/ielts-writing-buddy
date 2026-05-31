import type { CSSProperties } from 'react';

interface ResponseLoadingIndicatorProps {
  label: string;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

const SKELETON_LINES = ['w-11/12', 'w-4/5', 'w-full', 'w-3/5'];

export default function ResponseLoadingIndicator(
  props: ResponseLoadingIndicatorProps
) {
  const { label, compact = false, className = '', style } = props;

  if (compact) {
    return (
      <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-teal-400/25 bg-teal-400/10 px-3 py-1.5 text-sm font-semibold text-teal-100">
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
        {label}
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-[24rem] rounded-lg border border-slate-700 bg-slate-900/80 p-6 ${className}`}
      style={style}
    >
      <div className="m-auto w-full max-w-md">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400/10">
            <span className="absolute h-8 w-8 animate-spin rounded-full border-2 border-teal-300/20 border-t-teal-300" />
            <span className="h-2 w-2 rounded-full bg-teal-200" />
          </span>
          <div>
            <p className="font-semibold text-slate-100">{label}</p>
            <p className="mt-1 text-sm text-slate-500">
              Preparing a structured IELTS response.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {SKELETON_LINES.map((widthClass) => (
            <div
              key={widthClass}
              className={`${widthClass} h-3 animate-pulse rounded-full bg-slate-700/80`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
