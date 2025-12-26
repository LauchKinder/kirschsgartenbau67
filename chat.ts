import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API Key missing in environment" }), { status: 500 });
  }

  try {
    const { messages } = await req.json();
    const ai = new GoogleGenAI({ apiKey });

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: messages.map((m: any) => ({
        role: m.role,
        parts: [{ text: m.text }]
      })),
      config: {
        systemInstruction: "Du bist der digitale Assistent von 'Kirschs Gartenbau' aus Kuppenheim. Das Team besteht aus Elia, Philipp, Jonas und Luca. Das Konzept ist Gartenpflege auf Spendenbasis für Praxiserfahrung. Sei seriös, fachkundig, freundlich und verweise für Termine immer auf das Kontaktformular. Antworte kurz und präzise.",
        temperature: 0.7,
      }
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (e) {
          console.error('Streaming error:', e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache'
      } 
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
