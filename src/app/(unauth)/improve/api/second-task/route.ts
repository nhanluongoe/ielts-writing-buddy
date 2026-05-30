import {
  generateContent,
  hasGeminiApiKey,
  missingGeminiApiKeyResponse,
} from '@/libs/google-gemini';
import { buildImprovePrompt } from '@/libs/ielts-prompts';

export async function POST(request: Request) {
  const { question, answer, geminiApiKey } = await request.json();

  if (!hasGeminiApiKey(geminiApiKey)) {
    return missingGeminiApiKeyResponse();
  }

  const promptParts = buildImprovePrompt('second', question, answer);

  const result = await generateContent(promptParts, undefined, geminiApiKey);
  const text = result.text;

  return Response.json({ data: text });
}
