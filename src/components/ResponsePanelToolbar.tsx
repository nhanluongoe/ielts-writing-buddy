'use client';

import { CheckIcon, ClipboardCopyIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';

interface ResponsePanelToolbarProps {
  content: string;
}

const COPIED_STATE_DURATION_MS = 1800;

export default function ResponsePanelToolbar(props: ResponsePanelToolbarProps) {
  const { content } = props;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timeout = window.setTimeout(() => {
      setIsCopied(false);
    }, COPIED_STATE_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
  };

  return (
    <div className="sticky top-0 z-10 mb-4 flex justify-end bg-slate-900/95 pb-3 backdrop-blur">
      <button
        className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-teal-400/50 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400/40"
        type="button"
        onClick={handleCopy}
      >
        {isCopied ? (
          <>
            <CheckIcon className="h-4 w-4 text-teal-300" />
            Copied
          </>
        ) : (
          <>
            <ClipboardCopyIcon className="h-4 w-4" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}
