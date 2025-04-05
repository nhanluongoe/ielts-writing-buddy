import { generateContent, generateContentStream } from '@/libs/google-gemini';

const PROMPT = `Based on the provided question, answer, and image for Task 1 in the IELTS Writing exam, write an enhanced response in IELTS style.
The enhanced response must be no less than 160 words in length.

The answer will contain 3 parts: Estimated score for the original response, Enhanced response, and a table in markdown format.

The table will have 3 columns:
The first column will contain the original sentence.
The second column will contain the enhanced sentence.
The third column will explain the reason for the enhancement.`;

export async function POST(request: Request) {
  const { question, answer, image } = await request.json();

  const prompt = `
    "${PROMPT}"
    Question: "${question}"
    Answer: "${answer}"
  `;

  const imageParts: string[] = [image];
  const promptParts: string[] = prompt.split('\n');

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const response = await generateContentStream(promptParts, imageParts);
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
