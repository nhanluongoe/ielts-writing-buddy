'use client';

import {
  createPartFromBase64,
  createPartFromText,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';
import { getStoredApiKey } from '../api-settings';
import type { AiProviderAdapter, StreamOptions } from '../types';

const MODEL = 'gemini-3.5-flash';

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
  promptParts: string[],
  image?: string,
  options: StreamOptions = {}
) {
  const imagePart = getImagePart(image);
  const response = await getGeminiClient().models.generateContentStream({
    model: MODEL,
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
  missingApiKeyMessage:
    'No Gemini API key is configured. Add your Gemini API key in settings to continue.',
  streamIeltsContent: (input, options) =>
    streamIeltsContent(input.promptParts, input.image, options),
};
