import { createUserContent, GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-3.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

function getGeminiClient(apiKey?: string) {
  const resolvedApiKey = GEMINI_API_KEY || apiKey;

  if (!resolvedApiKey) {
    throw new Error('Missing Gemini API key');
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
