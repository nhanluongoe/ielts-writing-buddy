'use client';

import OpenAI from 'openai';
import type {
  ResponseInput,
  ResponseInputMessageContentList,
} from 'openai/resources/responses/responses';
import { getStoredApiKey } from '../api-settings';
import type { AiProviderAdapter, StreamOptions } from '../types';

const MODEL = 'gpt-5.5';
const TEXT_DELTA_EVENT = 'response.output_text.delta';

function getOpenAiClient() {
  const apiKey = getStoredApiKey('openai').trim();

  if (!apiKey) {
    throw new Error(openAiProvider.missingApiKeyMessage);
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

function buildInput(promptParts: string[], image?: string): ResponseInput {
  const content: ResponseInputMessageContentList = [
    ...promptParts.map((prompt) => ({
      type: 'input_text' as const,
      text: prompt,
    })),
    ...(image
      ? [
          {
            type: 'input_image' as const,
            image_url: image,
            detail: 'auto' as const,
          },
        ]
      : []),
  ];

  return [
    {
      type: 'message',
      role: 'user',
      content,
    },
  ];
}

async function* streamIeltsContent(
  promptParts: string[],
  image?: string,
  options: StreamOptions = {}
) {
  const stream = await getOpenAiClient().responses.create(
    {
      model: MODEL,
      input: buildInput(promptParts, image),
      stream: true,
    },
    {
      signal: options.signal,
    }
  );

  for await (const event of stream) {
    if (options.signal?.aborted) return;
    if (event.type !== TEXT_DELTA_EVENT) continue;

    yield event.delta;
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
