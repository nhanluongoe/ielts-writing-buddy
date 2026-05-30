import {
  generateContent,
  hasGeminiApiKey,
  missingGeminiApiKeyResponse,
} from '@/libs/google-gemini';
import { buildWritePrompt } from '@/libs/ielts-prompts';

export async function POST(request: Request) {
  const { question, image, geminiApiKey } = await request.json();

  if (!hasGeminiApiKey(geminiApiKey)) {
    return missingGeminiApiKeyResponse();
  }

  const imageParts: string[] = [image];
  const promptParts = buildWritePrompt('first', question);

  const result = await generateContent(promptParts, imageParts, geminiApiKey);
  const text = result.text;

  return Response.json({ data: text });
}
