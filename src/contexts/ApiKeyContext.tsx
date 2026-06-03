'use client';

import {
  clearApiKey as clearStoredApiKey,
  getStoredAiProvider,
  getStoredAiModel,
  getStoredApiKey,
  getStoredApiKeyMode,
  saveAiProvider,
  saveAiModel,
  saveApiKey as saveStoredApiKey,
} from '@/libs/ai/api-settings';
import { getAiProvider, getAiProviderModel } from '@/libs/ai/providers';
import type {
  AiModelOption,
  AiProviderConfig,
  AiProviderId,
  ApiKeyStorageMode,
} from '@/libs/ai/types';
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react';
import type { ReactNode } from 'react';

interface ApiKeyState {
  selectedProvider: AiProviderId;
  selectedModel: string;
  hasSavedApiKey: boolean;
  savedMode: ApiKeyStorageMode | null;
}

interface ApiKeyStore {
  clearApiKey: () => void;
  closeSettings: () => void;
  getHasSavedApiKey: () => boolean;
  getIsSettingsOpen: () => boolean;
  getSavedMode: () => ApiKeyStorageMode | null;
  getSelectedModel: () => AiModelOption;
  getSelectedProvider: () => AiProviderId;
  getSelectedProviderConfig: () => AiProviderConfig;
  openSettings: () => void;
  saveApiKey: (apiKey: string, mode: ApiKeyStorageMode) => void;
  selectModel: (modelId: string) => void;
  selectProvider: (providerId: AiProviderId) => void;
  subscribe: (listener: () => void) => () => void;
  toggleSettings: () => void;
}

const SERVER_API_KEY_STATE: ApiKeyState = {
  selectedProvider: 'gemini',
  selectedModel: getAiProvider('gemini').defaultModel,
  hasSavedApiKey: true,
  savedMode: null,
};
const SERVER_IS_SETTINGS_OPEN = false;
const ApiKeyContext = createContext<ApiKeyStore | null>(null);

function readStoredApiKeyState(): ApiKeyState {
  const selectedProvider = getStoredAiProvider();
  const selectedModel = getAiProviderModel(
    selectedProvider,
    getStoredAiModel(selectedProvider)
  ).id;

  return {
    selectedProvider,
    selectedModel,
    hasSavedApiKey: Boolean(getStoredApiKey(selectedProvider)),
    savedMode: getStoredApiKeyMode(selectedProvider),
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
      nextState.selectedProvider !== apiKeyState.selectedProvider ||
      nextState.selectedModel !== apiKeyState.selectedModel ||
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
      clearStoredApiKey(apiKeyState.selectedProvider);
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

    getSelectedModel() {
      syncStoredApiKeyState();
      return getAiProviderModel(
        apiKeyState.selectedProvider,
        apiKeyState.selectedModel
      );
    },

    getSelectedProvider() {
      syncStoredApiKeyState();
      return apiKeyState.selectedProvider;
    },

    getSelectedProviderConfig() {
      syncStoredApiKeyState();
      return getAiProvider(apiKeyState.selectedProvider);
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

    saveApiKey(apiKey: string, mode: ApiKeyStorageMode) {
      saveStoredApiKey(apiKeyState.selectedProvider, apiKey, mode);
      emitIfChanged(syncStoredApiKeyState());
    },

    selectModel(modelId: string) {
      const model = getAiProviderModel(apiKeyState.selectedProvider, modelId);

      saveAiModel(apiKeyState.selectedProvider, model.id);
      emitIfChanged(syncStoredApiKeyState());
    },

    selectProvider(providerId: AiProviderId) {
      saveAiProvider(providerId);
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

export function useSelectedAiProvider() {
  const store = useApiKeyStore();

  return useSyncExternalStore(
    store.subscribe,
    store.getSelectedProvider,
    () => SERVER_API_KEY_STATE.selectedProvider
  );
}

export function useSelectedAiModel() {
  const store = useApiKeyStore();

  return useSyncExternalStore(store.subscribe, store.getSelectedModel, () =>
    getAiProviderModel(
      SERVER_API_KEY_STATE.selectedProvider,
      SERVER_API_KEY_STATE.selectedModel
    )
  );
}

export function useSelectedAiProviderConfig() {
  const store = useApiKeyStore();

  return useSyncExternalStore(
    store.subscribe,
    store.getSelectedProviderConfig,
    () => getAiProvider(SERVER_API_KEY_STATE.selectedProvider)
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
    selectModel,
    selectProvider,
    toggleSettings,
  } = useApiKeyStore();

  return useMemo(
    () => ({
      clearApiKey,
      closeSettings,
      openSettings,
      saveApiKey,
      selectModel,
      selectProvider,
      toggleSettings,
    }),
    [
      clearApiKey,
      closeSettings,
      openSettings,
      saveApiKey,
      selectModel,
      selectProvider,
      toggleSettings,
    ]
  );
}
