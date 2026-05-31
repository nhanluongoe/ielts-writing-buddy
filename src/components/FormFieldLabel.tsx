import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import type { ReactNode } from 'react';

interface InfoTooltipProps {
  text: string;
}

interface FormFieldLabelProps extends InfoTooltipProps {
  htmlFor: string;
  children: ReactNode;
}

export function InfoTooltip(props: InfoTooltipProps) {
  const { text } = props;

  return (
    <span
      aria-label={text}
      className="group relative inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-slate-500 outline-none transition hover:text-teal-200 focus-visible:text-teal-200"
      role="img"
      tabIndex={0}
    >
      <QuestionMarkCircledIcon className="h-4 w-4" />
      <span className="pointer-events-none absolute left-1/2 top-7 z-20 hidden w-64 -translate-x-1/2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-left text-xs font-normal leading-5 text-slate-300 shadow-xl shadow-black/30 group-hover:block group-focus-visible:block">
        {text}
      </span>
    </span>
  );
}

export default function FormFieldLabel(props: FormFieldLabelProps) {
  const { children, htmlFor, text } = props;

  return (
    <label
      className="flex items-center gap-2 px-4 pt-4 text-sm font-semibold text-slate-300"
      htmlFor={htmlFor}
    >
      <span>{children}</span>
      <InfoTooltip text={text} />
    </label>
  );
}
