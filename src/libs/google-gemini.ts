import { createUserContent, GoogleGenAI } from '@google/genai';
import { MISSING_GEMINI_API_KEY_MESSAGE } from './gemini-api-key-message';

const MODEL = 'gemini-3.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export function hasGeminiApiKey(apiKey?: string) {
  return Boolean(GEMINI_API_KEY || apiKey?.trim());
}

export function missingGeminiApiKeyResponse() {
  return Response.json(
    { message: MISSING_GEMINI_API_KEY_MESSAGE },
    { status: 400 }
  );
}

function getGeminiClient(apiKey?: string) {
  const resolvedApiKey = GEMINI_API_KEY || apiKey;

  if (!resolvedApiKey) {
    throw new Error(MISSING_GEMINI_API_KEY_MESSAGE);
  }

  return new GoogleGenAI({ apiKey: resolvedApiKey });
}

export async function generateContent(
  prompts: string[],
  image = [''],
  apiKey?: string
) {
  const response = await getGeminiClient(apiKey).models.generateContent({
    model: MODEL,
    contents: [createUserContent([...prompts, ...image])],
  });

  return response;
}

export async function generateContentStream(
  prompts: string[],
  image = [''],
  apiKey?: string
) {
  const response = await getGeminiClient(apiKey).models.generateContentStream({
    model: MODEL,
    contents: [createUserContent([...prompts, ...image])],
  });

  return response;
}
