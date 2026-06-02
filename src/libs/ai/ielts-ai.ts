'use client';

import { getAiProvider } from './providers';
import { getStoredAiProvider } from './api-settings';
import { buildImprovePrompt, buildWritePrompt } from '../ielts-prompts';
import type { ImproveTaskInput, StreamOptions, WriteTaskInput } from './types';

function getSelectedProvider() {
  return getAiProvider(getStoredAiProvider());
}

function streamIeltsContent(
  promptParts: string[],
  image?: string,
  options?: StreamOptions
) {
  return getSelectedProvider().streamIeltsContent(
    {
      promptParts,
      image,
    },
    options
  );
}

export function streamWriteFirstTask(
  value: WriteTaskInput,
  options?: StreamOptions
) {
  return streamIeltsContent(
    buildWritePrompt('first', value.question),
    value.image,
    options
  );
}

export function streamWriteSecondTask(
  value: WriteTaskInput,
  options?: StreamOptions
) {
  return streamIeltsContent(
    buildWritePrompt('second', value.question),
    undefined,
    options
  );
}

export function streamImproveFirstTask(
  value: ImproveTaskInput,
  options?: StreamOptions
) {
  return streamIeltsContent(
    buildImprovePrompt('first', value.question, value.answer),
    value.image,
    options
  );
}

export function streamImproveSecondTask(
  value: ImproveTaskInput,
  options?: StreamOptions
) {
  return streamIeltsContent(
    buildImprovePrompt('second', value.question, value.answer),
    undefined,
    options
  );
}
