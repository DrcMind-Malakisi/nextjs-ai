import { ToolInvocation, streamText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { Product } from "@/types/type";
import { tools } from "./tools";
import { model } from "@/constant";

interface Message {
  role: "user" | "assistant";
  content: string;
  toolInvocations?: ToolInvocation[];
}

export async function POST(req: Request) {
  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: google(model),
    system:
      "You are a helpful assistant For an e-commerce website. You can help users find products, answer questions, and provide recommendations. You only speak in French." +
      "You are able to use tools to get products, get one product, add product to cart, clean cart, and get cart." +
      "For each tool that require actions like adding a product to the cart, you must ask for confirmation before executing the action." +
      "You must always ask for confirmation before executing any action.",

    messages,
    tools,
  });

  return result.toDataStreamResponse();
}
