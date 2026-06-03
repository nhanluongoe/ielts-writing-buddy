'use client';

import OpenAI from 'openai';
import type {
  Response as OpenAiResponse,
  ResponseInput,
  ResponseInputMessageContentList,
  ResponseStreamEvent,
} from 'openai/resources/responses/responses';
import { getStoredApiKey } from '../api-settings';
import type { AiProviderAdapter, StreamOptions } from '../types';

const MODEL = 'gpt-5.5';
const DEFAULT_STREAM_ERROR_MESSAGE =
  'ChatGPT could not complete the response. Please try again.';

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

function getResponseFailureMessage(response: OpenAiResponse) {
  return response.error?.message ?? DEFAULT_STREAM_ERROR_MESSAGE;
}

function getResponseIncompleteMessage(response: OpenAiResponse) {
  const reason = response.incomplete_details?.reason;

  if (reason === 'max_output_tokens') {
    return 'ChatGPT stopped because the response was too long. Please try a shorter prompt.';
  }

  if (reason === 'content_filter') {
    return 'ChatGPT stopped because the response was blocked by the content filter.';
  }

  return DEFAULT_STREAM_ERROR_MESSAGE;
}

function getStreamTextDelta(event: ResponseStreamEvent) {
  switch (event.type) {
    case 'response.output_text.delta':
      return event.delta;

    case 'error':
      throw new Error(event.message || DEFAULT_STREAM_ERROR_MESSAGE);

    case 'response.failed':
      throw new Error(getResponseFailureMessage(event.response));

    case 'response.incomplete':
      throw new Error(getResponseIncompleteMessage(event.response));

    default:
      return null;
  }
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
    const delta = getStreamTextDelta(event);
    if (!delta) continue;

    yield delta;
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
