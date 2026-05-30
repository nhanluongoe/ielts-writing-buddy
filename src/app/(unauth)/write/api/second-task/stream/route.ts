import {
  generateContentStream,
  hasGeminiApiKey,
  missingGeminiApiKeyResponse,
} from '@/libs/google-gemini';

const PROMPT = `Based on the provided question for Task 2 in the IELTS Writing exam, write a response in IELTS style.
  The response must be no less than 280 words in length. Do not include any instructions.`;

export async function POST(request: Request) {
  const { question, answer, geminiApiKey } = await request.json();

  if (!hasGeminiApiKey(geminiApiKey)) {
    return missingGeminiApiKeyResponse();
  }

  const prompt = `
    "${PROMPT}"
    Question: "${question}"
    Answer: "${answer}"
  `;
  const promptParts: string[] = prompt.split('\n');

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const response = await generateContentStream(
        promptParts,
        undefined,
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
