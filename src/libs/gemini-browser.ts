'use client';

import {
  createPartFromBase64,
  createPartFromText,
  createUserContent,
  GoogleGenAI,
} from '@google/genai';
import { getStoredGeminiApiKey } from './gemini-api-key';
import { MISSING_GEMINI_API_KEY_MESSAGE } from './gemini-api-key-message';
import { buildImprovePrompt, buildWritePrompt } from './ielts-prompts';

const MODEL = 'gemini-3.5-flash';

interface WriteTaskInput {
  question: string;
  image?: string;
}

interface ImproveTaskInput extends WriteTaskInput {
  answer: string;
}

interface GeminiStreamOptions {
  signal?: AbortSignal;
}

function getGeminiClient() {
  const apiKey = getStoredGeminiApiKey().trim();

  if (!apiKey) {
    throw new Error(MISSING_GEMINI_API_KEY_MESSAGE);
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
  options: GeminiStreamOptions = {}
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

export function streamWriteFirstTask(
  value: WriteTaskInput,
  options?: GeminiStreamOptions
) {
  return streamIeltsContent(
    buildWritePrompt('first', value.question),
    value.image,
    options
  );
}

export function streamWriteSecondTask(
  value: WriteTaskInput,
  options?: GeminiStreamOptions
) {
  return streamIeltsContent(
    buildWritePrompt('second', value.question),
    undefined,
    options
  );
}

export function streamImproveFirstTask(
  value: ImproveTaskInput,
  options?: GeminiStreamOptions
) {
  return streamIeltsContent(
    buildImprovePrompt('first', value.question, value.answer),
    value.image,
    options
  );
}

export function streamImproveSecondTask(
  value: ImproveTaskInput,
  options?: GeminiStreamOptions
) {
  return streamIeltsContent(
    buildImprovePrompt('second', value.question, value.answer),
    undefined,
    options
  );
}
