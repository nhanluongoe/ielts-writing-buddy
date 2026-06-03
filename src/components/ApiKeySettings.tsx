'use client';

import {
  useApiKeyActions,
  useIsApiKeySettingsOpen,
  useSavedApiKeyMode,
  useSelectedAiModel,
  useSelectedAiProvider,
  useSelectedAiProviderConfig,
} from '@/contexts/ApiKeyContext';
import { getStoredApiKey, getStoredApiKeyMode } from '@/libs/ai/api-settings';
import { AI_PROVIDER_OPTIONS } from '@/libs/ai/providers';
import type {
  AiProviderConfig,
  AiProviderId,
  ApiKeyStorageMode,
} from '@/libs/ai/types';
import {
  CheckCircledIcon,
  ChevronDownIcon,
  Cross2Icon,
  EyeClosedIcon,
  EyeOpenIcon,
  GearIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';

const STORAGE_OPTIONS: Array<{
  label: string;
  mode: ApiKeyStorageMode;
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

const SETTINGS_ICON_SIZE = 20;

export default function ApiKeySettings() {
  const panelRef = useRef<HTMLDivElement>(null);
  const { closeSettings, toggleSettings } = useApiKeyActions();
  const isSettingsOpen = useIsApiKeySettingsOpen();

  useEffect(() => {
    if (!isSettingsOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        closeSettings();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeSettings, isSettingsOpen]);

  return (
    <div ref={panelRef} className="relative">
      <button
        aria-label="AI provider API key settings"
        className="icon-button"
        type="button"
        onClick={toggleSettings}
      >
        <GearIcon height={SETTINGS_ICON_SIZE} width={SETTINGS_ICON_SIZE} />
      </button>

      {isSettingsOpen && <ApiKeySettingsPanel />}
    </div>
  );
}

function ApiKeySettingsPanel() {
  const { closeSettings, selectModel, selectProvider } = useApiKeyActions();
  const selectedModel = useSelectedAiModel();
  const selectedProvider = useSelectedAiProvider();
  const selectedProviderConfig = useSelectedAiProviderConfig();
  const savedMode = useSavedApiKeyMode();

  return (
    <div className="absolute right-0 top-12 z-20 w-[min(92vw,28rem)] rounded-lg border border-slate-700 bg-slate-950 p-4 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white">AI provider</h2>
        </div>
        <button
          aria-label="Close API key settings"
          className="rounded-md p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          type="button"
          onClick={closeSettings}
        >
          <Cross2Icon />
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        {AI_PROVIDER_OPTIONS.map((provider) => (
          <button
            key={provider.id}
            className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
              selectedProvider === provider.id
                ? 'border-teal-400 bg-teal-400/10 text-teal-100'
                : 'border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
            type="button"
            onClick={() => selectProvider(provider.id)}
          >
            {provider.label}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-semibold text-slate-200"
          htmlFor="ai-provider-model"
        >
          Model
        </label>
        <div className="relative">
          <select
            id="ai-provider-model"
            className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-900 py-2 pl-3 pr-12 text-sm text-slate-100 outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30"
            value={selectedModel.id}
            onChange={(event) => selectModel(event.target.value)}
          >
            {selectedProviderConfig.models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-200" />
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {selectedModel.description}
        </p>
      </div>

      <ApiKeyForm
        key={selectedProvider}
        providerConfig={selectedProviderConfig}
        providerId={selectedProvider}
        savedMode={savedMode}
      />
    </div>
  );
}

function ApiKeyForm({
  providerConfig,
  providerId,
  savedMode,
}: {
  providerConfig: AiProviderConfig;
  providerId: AiProviderId;
  savedMode: ApiKeyStorageMode | null;
}) {
  const { clearApiKey, closeSettings, saveApiKey } = useApiKeyActions();
  const [apiKey, setApiKey] = useState(() => getStoredApiKey(providerId));
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [mode, setMode] = useState<ApiKeyStorageMode>(
    () => getStoredApiKeyMode(providerId) ?? 'session'
  );

  const handleSave = () => {
    const trimmedApiKey = apiKey.trim();
    if (!trimmedApiKey) return;

    saveApiKey(trimmedApiKey, mode);
    setApiKey(trimmedApiKey);
    setIsApiKeyVisible(false);
    closeSettings();
  };

  const handleClear = () => {
    clearApiKey();
    setApiKey('');
    setIsApiKeyVisible(false);
  };

  return (
    <>
      {savedMode && (
        <p className="mb-3 flex items-center gap-2 rounded-lg border border-teal-400/30 bg-teal-400/10 px-3 py-2 text-sm text-teal-100">
          <CheckCircledIcon />A {providerConfig.label} key is saved for{' '}
          {savedMode === 'local' ? 'this device' : 'this tab'}.
        </p>
      )}

      <label
        className="mb-2 block text-sm font-semibold text-slate-200"
        htmlFor="ai-provider-api-key"
      >
        {providerConfig.apiKeyLabel}
      </label>
      <div className="flex rounded-lg border border-slate-700 bg-slate-900 focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-400/30">
        <input
          id="ai-provider-api-key"
          className="min-w-0 flex-1 rounded-l-lg bg-transparent px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder={providerConfig.apiKeyPlaceholder}
          type={isApiKeyVisible ? 'text' : 'password'}
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />
        <button
          aria-label={isApiKeyVisible ? 'Hide API key' : 'Show API key'}
          className="inline-flex w-10 items-center justify-center rounded-r-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
          disabled={!apiKey}
          type="button"
          onClick={() => setIsApiKeyVisible((value) => !value)}
        >
          {isApiKeyVisible ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
      </div>
      {savedMode && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          The saved key is shown as dots until you use the eye button. You can
          edit it here and save again.
        </p>
      )}

      <p className="mt-4 flex gap-2 rounded-lg border border-sky-400/20 bg-sky-400/10 px-3 py-2 text-xs leading-5 text-sky-100/90">
        <InfoCircledIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-200" />
        <span>
          Your key is stored only in this browser and is never sent to the IELTS
          Writing Buddy server. Requests are sent directly from your browser to
          {` ${providerConfig.label}`}.
        </span>
      </p>

      <div className="mt-4 grid gap-2">
        {STORAGE_OPTIONS.map((option) => (
          <label
            key={option.mode}
            className="flex cursor-pointer gap-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3 transition hover:border-slate-700"
          >
            <input
              checked={mode === option.mode}
              className="mt-1 accent-teal-400"
              name="api-key-storage"
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
    </>
  );
}
