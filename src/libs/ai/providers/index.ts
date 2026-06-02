'use client';

import type { AiProviderAdapter, AiProviderId } from '../types';
import { geminiProvider } from './gemini';
import { openAiProvider } from './openai';

export const AI_PROVIDERS = {
  gemini: geminiProvider,
  openai: openAiProvider,
} as const satisfies Record<AiProviderId, AiProviderAdapter>;

export const AI_PROVIDER_OPTIONS = Object.values(AI_PROVIDERS);

export function getAiProvider(providerId: AiProviderId) {
  return AI_PROVIDERS[providerId];
}
