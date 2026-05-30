'use client';

import { createUserContent, GoogleGenAI } from '@google/genai';
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

function getGeminiClient() {
  const apiKey = getStoredGeminiApiKey().trim();

  if (!apiKey) {
    throw new Error(MISSING_GEMINI_API_KEY_MESSAGE);
  }

  return new GoogleGenAI({ apiKey });
}

async function* streamIeltsContent(promptParts: string[], image?: string) {
  const imageParts = image ? [image] : [];
  const response = await getGeminiClient().models.generateContentStream({
    model: MODEL,
    contents: [createUserContent([...promptParts, ...imageParts])],
  });

  for await (const chunk of response) {
    yield chunk.text ?? '';
  }
}

export function streamWriteFirstTask(value: WriteTaskInput) {
  return streamIeltsContent(
    buildWritePrompt('first', value.question),
    value.image
  );
}

export function streamWriteSecondTask(value: WriteTaskInput) {
  return streamIeltsContent(buildWritePrompt('second', value.question));
}

export function streamImproveFirstTask(value: ImproveTaskInput) {
  return streamIeltsContent(
    buildImprovePrompt('first', value.question, value.answer),
    value.image
  );
}

export function streamImproveSecondTask(value: ImproveTaskInput) {
  return streamIeltsContent(
    buildImprovePrompt('second', value.question, value.answer)
  );
}
