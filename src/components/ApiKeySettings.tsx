'use client';

import {
  clearGeminiApiKey,
  GeminiApiKeyStorageMode,
  getStoredGeminiApiKeyMode,
  saveGeminiApiKey,
} from '@/libs/gemini-api-key';
import { CheckCircledIcon, Cross2Icon, GearIcon } from '@radix-ui/react-icons';
import React, { useEffect, useState } from 'react';

const STORAGE_OPTIONS: Array<{
  label: string;
  mode: GeminiApiKeyStorageMode;
  description: string;
}> = [
  {
    label: 'This tab only',
    mode: 'session',
    description:
      'The key is forgotten when this browser tab is closed. Choose this on shared computers.',
  },
  {
    label: 'Remember on this device',
    mode: 'local',
    description:
      'The key stays in this browser until you clear it here or clear browser data.',
  },
];

export default function ApiKeySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [mode, setMode] = useState<GeminiApiKeyStorageMode>('session');
  const [savedMode, setSavedMode] = useState<GeminiApiKeyStorageMode | null>(
    null
  );

  useEffect(() => {
    setSavedMode(getStoredGeminiApiKeyMode());
  }, [isOpen]);

  const handleSave = () => {
    const trimmedApiKey = apiKey.trim();
    if (!trimmedApiKey) return;

    saveGeminiApiKey(trimmedApiKey, mode);
    setApiKey('');
    setSavedMode(mode);
  };

  const handleClear = () => {
    clearGeminiApiKey();
    setSavedMode(null);
    setApiKey('');
  };

  return (
    <div className="relative">
      <button
        aria-label="Gemini API key settings"
        className="icon-button"
        type="button"
        onClick={() => setIsOpen((value) => !value)}
      >
        <GearIcon height={20} width={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-20 w-[min(92vw,28rem)] rounded-lg border border-slate-700 bg-slate-950 p-4 shadow-2xl shadow-black/40">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">Gemini API key</h2>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Used only when this app has no server API key configured.
              </p>
            </div>
            <button
              aria-label="Close API key settings"
              className="rounded-md p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              <Cross2Icon />
            </button>
          </div>

          {savedMode && (
            <p className="mb-3 flex items-center gap-2 rounded-lg border border-teal-400/30 bg-teal-400/10 px-3 py-2 text-sm text-teal-100">
              <CheckCircledIcon />A key is saved for{' '}
              {savedMode === 'local' ? 'this device' : 'this tab'}.
            </p>
          )}

          <label
            className="mb-2 block text-sm font-semibold text-slate-200"
            htmlFor="gemini-api-key"
          >
            API key
          </label>
          <input
            id="gemini-api-key"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"
            placeholder={
              savedMode
                ? 'Enter a new key to replace it'
                : 'Paste your Gemini API key'
            }
            type="password"
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
          />

          <div className="mt-4 grid gap-2">
            {STORAGE_OPTIONS.map((option) => (
              <label
                key={option.mode}
                className="flex cursor-pointer gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 transition hover:border-slate-700"
              >
                <input
                  checked={mode === option.mode}
                  className="mt-1 accent-teal-400"
                  name="gemini-key-storage"
                  type="radio"
                  onChange={() => setMode(option.mode)}
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-100">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-sm leading-5 text-slate-400">
                    {option.description}
                  </span>
                </span>
              </label>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              className="button--primary"
              disabled={!apiKey.trim()}
              type="button"
              onClick={handleSave}
            >
              Save key
            </button>
            <button
              className="button--secondary"
              type="button"
              onClick={handleClear}
            >
              Clear saved key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
