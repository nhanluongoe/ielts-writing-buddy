import {
  generateContent,
  hasGeminiApiKey,
  missingGeminiApiKeyResponse,
} from '@/libs/google-gemini';
import { buildWritePrompt } from '@/libs/ielts-prompts';

export async function POST(request: Request) {
  const { question, geminiApiKey } = await request.json();

  if (!hasGeminiApiKey(geminiApiKey)) {
    return missingGeminiApiKeyResponse();
  }

  const promptParts = buildWritePrompt('second', question);

  const result = await generateContent(promptParts, undefined, geminiApiKey);
  const text = result.text;

  return Response.json({ data: text });
}
