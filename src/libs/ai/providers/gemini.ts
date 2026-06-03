'use client';

import {
  createPartFromBase64,
  createPartFromText,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';
import { getStoredApiKey } from '../api-settings';
import type { AiProviderAdapter, StreamOptions } from '../types';

function getGeminiClient() {
  const apiKey = getStoredApiKey('gemini').trim();

  if (!apiKey) {
    throw new Error(geminiProvider.missingApiKeyMessage);
  }

  return new GoogleGenAI({ apiKey });
}

function getImagePart(image?: string) {
  if (!image) return null;

  const match = image.match(/^data:(?<mimeType>[^;]+);base64,(?<data>.+)$/);

  const data = match?.groups?.data;
  const mimeType = match?.groups?.mimeType;

  if (!data || !mimeType) {
    throw new Error('The uploaded image could not be read. Please try again.');
  }

  return createPartFromBase64(data, mimeType);
}

async function* streamIeltsContent(
  model: string,
  promptParts: string[],
  image?: string,
  options: StreamOptions = {}
) {
  const imagePart = getImagePart(image);
  const response = await getGeminiClient().models.generateContentStream({
    model,
    contents: [
      createUserContent([
        ...promptParts.map((prompt) => createPartFromText(prompt)),
        ...(imagePart ? [imagePart] : []),
      ]),
    ],
    config: {
      abortSignal: options.signal,
    },
  });

  for await (const chunk of response) {
    if (options.signal?.aborted) return;

    yield chunk.text ?? '';
  }
}

export const geminiProvider: AiProviderAdapter = {
  id: 'gemini',
  label: 'Gemini',
  apiKeyLabel: 'Gemini API key',
  apiKeyPlaceholder: 'Paste your Gemini API key',
  defaultModel: 'gemini-3.5-flash',
  missingApiKeyMessage:
    'No Gemini API key is configured. Add your Gemini API key in settings to continue.',
  models: [
    {
      id: 'gemini-3.5-flash',
      label: 'Gemini 3.5 Flash',
      description: 'Stable frontier model for sustained writing feedback.',
    },
    {
      id: 'gemini-3.1-pro-preview',
      label: 'Gemini 3.1 Pro Preview',
      description: 'Preview model for deeper reasoning and complex tasks.',
    },
    {
      id: 'gemini-3-flash-preview',
      label: 'Gemini 3 Flash Preview',
      description: 'Preview multimodal model with strong reasoning.',
    },
    {
      id: 'gemini-3.1-flash-lite',
      label: 'Gemini 3.1 Flash-Lite',
      description: 'Fast, lightweight option for high-frequency practice.',
    },
    {
      id: 'gemini-2.5-pro',
      label: 'Gemini 2.5 Pro',
      description: 'Advanced 2.5 model for complex writing tasks.',
    },
    {
      id: 'gemini-2.5-flash',
      label: 'Gemini 2.5 Flash',
      description: 'Low-latency 2.5 model with strong price-performance.',
    },
    {
      id: 'gemini-2.5-flash-lite',
      label: 'Gemini 2.5 Flash-Lite',
      description: 'Fastest and most budget-friendly Gemini 2.5 option.',
    },
  ],
  streamIeltsContent: (input, options) =>
    streamIeltsContent(input.model, input.promptParts, input.image, options),
};
