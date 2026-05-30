'use client';

export type GeminiApiKeyStorageMode = 'session' | 'local';

const LOCAL_STORAGE_KEY = 'ielts-writing-buddy:gemini-api-key';
const SESSION_STORAGE_KEY = 'ielts-writing-buddy:gemini-api-key';

export function getStoredGeminiApiKey() {
  if (typeof window === 'undefined') return '';

  return (
    window.sessionStorage.getItem(SESSION_STORAGE_KEY) ??
    window.localStorage.getItem(LOCAL_STORAGE_KEY) ??
    ''
  );
}

export function getStoredGeminiApiKeyMode(): GeminiApiKeyStorageMode | null {
  if (typeof window === 'undefined') return null;

  if (window.sessionStorage.getItem(SESSION_STORAGE_KEY)) return 'session';
  if (window.localStorage.getItem(LOCAL_STORAGE_KEY)) return 'local';

  return null;
}

export function saveGeminiApiKey(
  apiKey: string,
  mode: GeminiApiKeyStorageMode
) {
  if (typeof window === 'undefined') return;

  clearGeminiApiKey();

  const storage =
    mode === 'local' ? window.localStorage : window.sessionStorage;
  storage.setItem(
    mode === 'local' ? LOCAL_STORAGE_KEY : SESSION_STORAGE_KEY,
    apiKey
  );
}

export function clearGeminiApiKey() {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export function withGeminiApiKey<T extends object>(value: T) {
  const geminiApiKey = getStoredGeminiApiKey();

  return geminiApiKey ? { ...value, geminiApiKey } : value;
}
