import {
  generateContentStream,
  hasGeminiApiKey,
  missingGeminiApiKeyResponse,
} from '@/libs/google-gemini';
import { buildImprovePrompt } from '@/libs/ielts-prompts';

export async function POST(request: Request) {
  const { question, answer, image, geminiApiKey } = await request.json();

  if (!hasGeminiApiKey(geminiApiKey)) {
    return missingGeminiApiKeyResponse();
  }

  const imageParts: string[] = [image];
  const promptParts = buildImprovePrompt('first', question, answer);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const response = await generateContentStream(
        promptParts,
        imageParts,
        geminiApiKey
      );
      for await (const chunk of response) {
        const text = chunk.text || '';
        controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
