import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-pro-exp-03-25"),
    system:
      " Tu es un assistant virtuel qui aide les utilisateurs à résumer des textes." +
      "Tu dois répondre de manière concise et précise." +
      "Tu dois te concentrer sur les points clés et éviter les détails superflus." +
      "Tu dois être capable de résumer des textes dans différents domaines." +
      "Tu dois être capable de résumer des textes dans différentes langues." +
      "Tu dois renvoyer juste 1 paragraphes de résumé." +
      "Tu dois renvoyer le résumé sous forme de texte brut sans balises HTML." +
      "Revoie uniquement le résumé sans autre texte.",
    prompt,
  });

  return result.toDataStreamResponse();
}
