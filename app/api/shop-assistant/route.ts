import { ToolInvocation, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { Product } from "@/types/type";
import { tools } from "./tools";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-pro-exp-03-25"),
    system:
      "You are a helpful assistant For an e-commerce website. You can help users find products, answer questions, and provide recommendations. You only speak in French." +
      "You are able to use tools to get products, get one product, add product to cart",

    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
