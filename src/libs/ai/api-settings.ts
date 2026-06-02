'use client';

import type { AiProviderId, ApiKeyStorageMode } from './types';

const DEFAULT_PROVIDER: AiProviderId = 'gemini';

const SELECTED_PROVIDER_STORAGE_KEY = 'ielts-writing-buddy:ai-provider';
const LEGACY_GEMINI_LOCAL_STORAGE_KEY = 'ielts-writing-buddy:gemini-api-key';
const LEGACY_GEMINI_SESSION_STORAGE_KEY = 'ielts-writing-buddy:gemini-api-key';

const PROVIDER_IDS = ['gemini', 'openai'] as const satisfies AiProviderId[];

function getApiKeyStorageKey(
  providerId: AiProviderId,
  mode: ApiKeyStorageMode
) {
  return `ielts-writing-buddy:${providerId}:api-key:${mode}`;
}

function isAiProviderId(value: string | null): value is AiProviderId {
  return PROVIDER_IDS.some((providerId) => providerId === value);
}

export function getStoredAiProvider(): AiProviderId {
  if (typeof window === 'undefined') return DEFAULT_PROVIDER;

  const providerId = window.localStorage.getItem(SELECTED_PROVIDER_STORAGE_KEY);

  return isAiProviderId(providerId) ? providerId : DEFAULT_PROVIDER;
}

export function saveAiProvider(providerId: AiProviderId) {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(SELECTED_PROVIDER_STORAGE_KEY, providerId);
}

export function getStoredApiKey(providerId: AiProviderId) {
  if (typeof window === 'undefined') return '';

  const sessionApiKey = window.sessionStorage.getItem(
    getApiKeyStorageKey(providerId, 'session')
  );
  const localApiKey = window.localStorage.getItem(
    getApiKeyStorageKey(providerId, 'local')
  );

  if (sessionApiKey ?? localApiKey) {
    return sessionApiKey ?? localApiKey ?? '';
  }

  if (providerId === 'gemini') {
    return (
      window.sessionStorage.getItem(LEGACY_GEMINI_SESSION_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_GEMINI_LOCAL_STORAGE_KEY) ??
      ''
    );
  }

  return '';
}

export function getStoredApiKeyMode(
  providerId: AiProviderId
): ApiKeyStorageMode | null {
  if (typeof window === 'undefined') return null;

  if (window.sessionStorage.getItem(getApiKeyStorageKey(providerId, 'session')))
    return 'session';
  if (window.localStorage.getItem(getApiKeyStorageKey(providerId, 'local')))
    return 'local';

  if (providerId === 'gemini') {
    if (window.sessionStorage.getItem(LEGACY_GEMINI_SESSION_STORAGE_KEY))
      return 'session';
    if (window.localStorage.getItem(LEGACY_GEMINI_LOCAL_STORAGE_KEY))
      return 'local';
  }

  return null;
}

export function saveApiKey(
  providerId: AiProviderId,
  apiKey: string,
  mode: ApiKeyStorageMode
) {
  if (typeof window === 'undefined') return;

  clearApiKey(providerId);

  const storage =
    mode === 'local' ? window.localStorage : window.sessionStorage;
  storage.setItem(getApiKeyStorageKey(providerId, mode), apiKey);
}

export function clearApiKey(providerId: AiProviderId) {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(getApiKeyStorageKey(providerId, 'local'));
  window.sessionStorage.removeItem(getApiKeyStorageKey(providerId, 'session'));

  if (providerId === 'gemini') {
    window.localStorage.removeItem(LEGACY_GEMINI_LOCAL_STORAGE_KEY);
    window.sessionStorage.removeItem(LEGACY_GEMINI_SESSION_STORAGE_KEY);
  }
}
