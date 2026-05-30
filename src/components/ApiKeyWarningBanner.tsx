'use client';

import { getStoredGeminiApiKey } from '@/libs/gemini-api-key';
import {
  GEMINI_API_KEY_CHANGE_EVENT,
  OPEN_GEMINI_API_KEY_SETTINGS_EVENT,
} from '@/libs/gemini-api-key-events';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';

interface ApiKeyWarningBannerProps {
  hasServerApiKey: boolean;
}

export default function ApiKeyWarningBanner(props: ApiKeyWarningBannerProps) {
  const { hasServerApiKey } = props;
  const [hasSavedApiKey, setHasSavedApiKey] = useState(true);

  useEffect(() => {
    const syncSavedKeyState = () => {
      setHasSavedApiKey(Boolean(getStoredGeminiApiKey()));
    };

    syncSavedKeyState();
    window.addEventListener('storage', syncSavedKeyState);
    window.addEventListener(GEMINI_API_KEY_CHANGE_EVENT, syncSavedKeyState);

    return () => {
      window.removeEventListener('storage', syncSavedKeyState);
      window.removeEventListener(
        GEMINI_API_KEY_CHANGE_EVENT,
        syncSavedKeyState
      );
    };
  }, []);

  if (hasServerApiKey || hasSavedApiKey) return null;

  return (
    <div className="mb-4 rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-amber-50">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-200" />
          <div>
            <p className="font-semibold">Gemini API key is not configured.</p>
            <p className="mt-1 text-sm leading-6 text-amber-100/80">
              Add your key before using Write or Improve. You can choose to keep
              it for this tab only or remember it on this device.
            </p>
          </div>
        </div>
        <button
          className="inline-flex min-h-10 w-fit items-center justify-center rounded-lg bg-amber-200 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-slate-950"
          type="button"
          onClick={() =>
            window.dispatchEvent(new Event(OPEN_GEMINI_API_KEY_SETTINGS_EVENT))
          }
        >
          Add API key
        </button>
      </div>
    </div>
  );
}
