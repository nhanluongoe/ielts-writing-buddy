'use client';

import {
  clearGeminiApiKey,
  getStoredGeminiApiKey,
  getStoredGeminiApiKeyMode,
  saveGeminiApiKey,
} from '@/libs/gemini-api-key';
import type { GeminiApiKeyStorageMode } from '@/libs/gemini-api-key';
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';

interface ApiKeyState {
  hasSavedApiKey: boolean;
  savedMode: GeminiApiKeyStorageMode | null;
}

interface ApiKeyStore {
  clearApiKey: () => void;
  closeSettings: () => void;
  getHasSavedApiKey: () => boolean;
  getIsSettingsOpen: () => boolean;
  getSavedMode: () => GeminiApiKeyStorageMode | null;
  openSettings: () => void;
  saveApiKey: (apiKey: string, mode: GeminiApiKeyStorageMode) => void;
  subscribe: (listener: () => void) => () => void;
  toggleSettings: () => void;
}

const SERVER_API_KEY_STATE: ApiKeyState = {
  hasSavedApiKey: true,
  savedMode: null,
};
const SERVER_IS_SETTINGS_OPEN = false;
const ApiKeyContext = createContext<ApiKeyStore | null>(null);

function readStoredApiKeyState(): ApiKeyState {
  return {
    hasSavedApiKey: Boolean(getStoredGeminiApiKey()),
    savedMode: getStoredGeminiApiKeyMode(),
  };
}

function createApiKeyStore(): ApiKeyStore {
  const listeners = new Set<() => void>();
  let apiKeyState = SERVER_API_KEY_STATE;
  let isSettingsOpen = SERVER_IS_SETTINGS_OPEN;

  const emit = () => {
    listeners.forEach((listener) => listener());
  };

  const syncStoredApiKeyState = () => {
    const nextState = readStoredApiKeyState();
    const hasChanged =
      nextState.hasSavedApiKey !== apiKeyState.hasSavedApiKey ||
      nextState.savedMode !== apiKeyState.savedMode;

    if (hasChanged) {
      apiKeyState = nextState;
    }

    return hasChanged;
  };

  const emitIfChanged = (hasChanged: boolean) => {
    if (hasChanged) emit();
  };

  const handleStorage = () => {
    emitIfChanged(syncStoredApiKeyState());
  };

  return {
    clearApiKey() {
      clearGeminiApiKey();
      emitIfChanged(syncStoredApiKeyState());
    },

    closeSettings() {
      if (!isSettingsOpen) return;

      isSettingsOpen = false;
      emit();
    },

    getHasSavedApiKey() {
      syncStoredApiKeyState();
      return apiKeyState.hasSavedApiKey;
    },

    getIsSettingsOpen() {
      return isSettingsOpen;
    },

    getSavedMode() {
      syncStoredApiKeyState();
      return apiKeyState.savedMode;
    },

    openSettings() {
      const apiKeyChanged = syncStoredApiKeyState();

      if (isSettingsOpen) {
        emitIfChanged(apiKeyChanged);
        return;
      }

      isSettingsOpen = true;
      emit();
    },

    saveApiKey(apiKey: string, mode: GeminiApiKeyStorageMode) {
      saveGeminiApiKey(apiKey, mode);
      emitIfChanged(syncStoredApiKeyState());
    },

    subscribe(listener: () => void) {
      if (listeners.size === 0) {
        window.addEventListener('storage', handleStorage);
      }
      listeners.add(listener);

      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          window.removeEventListener('storage', handleStorage);
        }
      };
    },

    toggleSettings() {
      if (!isSettingsOpen) syncStoredApiKeyState();

      isSettingsOpen = !isSettingsOpen;
      emit();
    },
  };
}

export function ApiKeyProvider({ children }: { children: ReactNode }) {
  const store = useMemo(() => createApiKeyStore(), []);

  return (
    <ApiKeyContext.Provider value={store}>{children}</ApiKeyContext.Provider>
  );
}

function useApiKeyStore() {
  const store = useContext(ApiKeyContext);

  if (!store) {
    throw new Error('useApiKeyStore must be used within ApiKeyProvider');
  }

  return store;
}

export function useHasSavedApiKey() {
  const store = useApiKeyStore();

  return useSyncExternalStore(
    store.subscribe,
    store.getHasSavedApiKey,
    () => SERVER_API_KEY_STATE.hasSavedApiKey
  );
}

export function useSavedApiKeyMode() {
  const store = useApiKeyStore();

  return useSyncExternalStore(
    store.subscribe,
    store.getSavedMode,
    () => SERVER_API_KEY_STATE.savedMode
  );
}

export function useIsApiKeySettingsOpen() {
  const store = useApiKeyStore();

  return useSyncExternalStore(
    store.subscribe,
    store.getIsSettingsOpen,
    () => SERVER_IS_SETTINGS_OPEN
  );
}

export function useApiKeyActions() {
  const {
    clearApiKey,
    closeSettings,
    openSettings,
    saveApiKey,
    toggleSettings,
  } = useApiKeyStore();

  return useMemo(
    () => ({
      clearApiKey,
      closeSettings,
      openSettings,
      saveApiKey,
      toggleSettings,
    }),
    [clearApiKey, closeSettings, openSettings, saveApiKey, toggleSettings]
  );
}
