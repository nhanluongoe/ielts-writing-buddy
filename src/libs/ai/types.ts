'use client';

export type AiProviderId = 'gemini' | 'openai';

export type ApiKeyStorageMode = 'session' | 'local';

export interface AiProviderConfig {
  id: AiProviderId;
  label: string;
  apiKeyLabel: string;
  apiKeyPlaceholder: string;
  defaultModel: string;
  missingApiKeyMessage: string;
  models: AiModelOption[];
}

export interface AiModelOption {
  id: string;
  label: string;
  description: string;
}

export interface WriteTaskInput {
  question: string;
  image?: string;
}

export interface ImproveTaskInput extends WriteTaskInput {
  answer: string;
}

export interface StreamOptions {
  signal?: AbortSignal;
}

export interface IeltsStreamInput {
  model: string;
  promptParts: string[];
  image?: string;
}

export interface AiProviderAdapter extends AiProviderConfig {
  streamIeltsContent: (
    input: IeltsStreamInput,
    options?: StreamOptions
  ) => AsyncGenerator<string>;
}
