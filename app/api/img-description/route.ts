import { streamText, Message } from "ai";
import { google } from "@ai-sdk/google";
import { model } from "@/constant";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  // description de l'image

  const result = streamText({
    model: google(model),
    system:
      "Tu es expert en visionage par ordinateur et en traitement d'images." +
      "Tu es capable d'analuser une image et de fournir une description détaillée." +
      "A la fin, tu donnes ton avis sur le contenu de l'image." +
      "Soit concis et précis dans ta réponse." +
      "Tu ne dois pas faire de remerciements ou de salutations." +
      "Ne fais aucoun commentaire sur le texte que tu proposes.",
    messages,
  });

  return result.toDataStreamResponse();
}
