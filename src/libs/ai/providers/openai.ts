'use client';

import { getStoredApiKey } from '../api-settings';
import type { AiProviderAdapter, StreamOptions } from '../types';

const MODEL = 'gpt-5.5';
const RESPONSES_API_URL = 'https://api.openai.com/v1/responses';
const TEXT_DELTA_EVENT = 'response.output_text.delta';

function getOpenAiApiKey() {
  const apiKey = getStoredApiKey('openai').trim();

  if (!apiKey) {
    throw new Error(openAiProvider.missingApiKeyMessage);
  }

  return apiKey;
}

function buildInput(promptParts: string[], image?: string) {
  return [
    {
      role: 'user',
      content: [
        ...promptParts.map((prompt) => ({
          type: 'input_text',
          text: prompt,
        })),
        ...(image
          ? [
              {
                type: 'input_image',
                image_url: image,
                detail: 'auto',
              },
            ]
          : []),
      ],
    },
  ];
}

function readResponseError(errorText: string) {
  try {
    const errorBody = JSON.parse(errorText) as {
      error?: { message?: string };
    };

    return errorBody.error?.message ?? errorText;
  } catch {
    return errorText;
  }
}

async function* streamIeltsContent(
  promptParts: string[],
  image?: string,
  options: StreamOptions = {}
) {
  const response = await fetch(RESPONSES_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getOpenAiApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: buildInput(promptParts, image),
      stream: true,
    }),
    signal: options.signal,
  });

  if (!response.ok) {
    throw new Error(readResponseError(await response.text()));
  }

  if (!response.body) {
    throw new Error('The ChatGPT response stream could not be read.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done || options.signal?.aborted) return;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split('\n\n');
    buffer = events.pop() ?? '';

    for (const event of events) {
      const lines = event.split('\n');
      const eventType = lines
        .find((line) => line.startsWith('event: '))
        ?.slice('event: '.length);

      if (eventType !== TEXT_DELTA_EVENT) continue;

      const data = lines
        .filter((line) => line.startsWith('data: '))
        .map((line) => line.slice('data: '.length))
        .join('\n');

      if (!data) continue;

      const parsed = JSON.parse(data) as { delta?: string };
      yield parsed.delta ?? '';
    }
  }
}

export const openAiProvider: AiProviderAdapter = {
  id: 'openai',
  label: 'ChatGPT',
  apiKeyLabel: 'ChatGPT API key',
  apiKeyPlaceholder: 'Paste your OpenAI API key',
  missingApiKeyMessage:
    'No ChatGPT API key is configured. Add your OpenAI API key in settings to continue.',
  streamIeltsContent: (input, options) =>
    streamIeltsContent(input.promptParts, input.image, options),
};
