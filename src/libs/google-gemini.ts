import { createUserContent, GoogleGenAI } from '@google/genai';

const MODEL = 'gemini-2.0-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateContent(prompts: string[], image = ['']) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [createUserContent([...prompts, ...image])],
  });

  return response;
}
