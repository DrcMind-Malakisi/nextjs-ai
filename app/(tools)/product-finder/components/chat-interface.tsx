"use client";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/type";

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/shop-assistant",
      initialMessages: [
        {
          id: "1",
          role: "assistant",
          content:
            "Bonjour ! Je suis votre assistant shopping. Comment puis-je vous aider aujourd'hui ?",
        },
      ],
    });

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-grow overflow-y-auto p-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start gap-2 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar
                className={`h-8 w-8 ${
                  message.role === "user" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <AvatarFallback>
                  {message.role === "user" ? "U" : "A"}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.experimental_attachments &&
                  message.experimental_attachments.map((attachment) => (
                    <p>{attachment.contentType}</p>
                  ))}

                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case "text":
                      return part.text;
                    case "tool-invocation":
                      switch (part.toolInvocation.toolName) {
                        case "getProducts": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>En cours de recherche</p>;
                            case "result":
                              return (
                                <div>
                                  <p className=" text-gray-500">
                                    Résultats de la recherche :
                                  </p>
                                  <ul className="text-sm list-disc list-inside">
                                    {part.toolInvocation.result.map(
                                      (product: Product) => (
                                        <li key={product.id}>
                                          {product.name} - {product.price}$ (
                                          {product.quantity})
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                        case "getAvailableProducts": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>En cours de recherche</p>;
                            case "result":
                              return (
                                <div>
                                  <p className=" text-gray-500">
                                    Résultats de la recherche :
                                  </p>
                                  <ul className="text-sm list-disc list-inside">
                                    {part.toolInvocation.result.map(
                                      (product: Product) => (
                                        <li key={product.id}>
                                          {product.name} - {product.price}$ (
                                          {product.quantity})
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                        case "getProduct": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>En cours de recherche</p>;
                            case "result":
                              return (
                                <div>
                                  {/* one setence */}
                                  <p>{part.toolInvocation.result}</p>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                        case "addProductToCart": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>En cours d'ajout</p>;
                            case "result":
                              return (
                                <div>
                                  {/* one setence */}
                                  <p>{part.toolInvocation.result}</p>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                        case "clearCart": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>En cours de suppression</p>;
                            case "result":
                              return (
                                <div>
                                  {/* one setence */}
                                  <p>{part.toolInvocation.result}</p>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                        case "getCart": {
                          switch (part.toolInvocation.state) {
                            case "call":
                              return <p>Je charge vos produits ... </p>;
                            case "result":
                              return (
                                <div>
                                  {/* one setence */}
                                  <p>{part.toolInvocation.result}</p>
                                </div>
                              );

                            default:
                              break;
                          }
                        }
                      }

                    default:
                      break;
                  }
                })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8 bg-gray-200">
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="border-t p-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-4 items-center"
        >
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Posez une question sur nos produits..."
            className="flex-grow resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Empêche le saut de ligne
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full  "
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
