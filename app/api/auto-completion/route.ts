import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-pro-exp-03-25"),
    system:
      "Tu es un assistant qui aide à la rédaction de texte." +
      "Tu es capable de comprendre le contexte et de fournir des suggestions pertinentes." +
      "Retourne uniquement le texte reecri sans balises HTML ou autres éléments inutiles." +
      "Tu proposes ds sugestions d'au moins 70 mots et pas plus de 150 mots." +
      "Tu ne dois pas faire de remerciements ou de salutations." +
      "Ne fais aucoun commentaire sur le texte que tu proposes.",
    prompt,
  });

  return result.toDataStreamResponse();
}
