"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useChat } from "@ai-sdk/react";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
export default function UploadImage() {
  const [preview, setPreview] = useState<string | null>(null);

  const { messages, input, handleInputChange, handleSubmit, status, setInput } =
    useChat({
      api: "/api/img-description",
    });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<FileList | undefined>(undefined);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setInput("Décrivez ce que vous voulez savoir sur l'image");
  }, []);

  return (
    <div className="w-full  mx-auto mt-6 ">
      <Card className="border-dashed">
        <CardContent className="p-6">
          <form
            onSubmit={(event) => {
              handleSubmit(event, {
                experimental_attachments: files,
              });

              setFiles(undefined);

              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            <Input
              type="text"
              placeholder="Décrivez ce que vous voulez savoir sur l'image"
              value={input}
              onChange={handleInputChange}
              className="mb-4"
            />

            {!preview ? (
              <div
                onClick={triggerFileInput}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-foreground rounded-lg cursor-pointer  transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">
                  Click to upload an image
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    if (event.target.files) {
                      setFiles(event.target.files);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }
                  }}
                  accept="image/*"
                  className="hidden"
                  multiple
                />
              </div>
            ) : (
              <div className=" w-full   rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="object-cover w-full h-full max-h-80 max-w-fit "
                    width={300}
                    height={300}
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    className="absolute top-2 right-2 rounded-full bg-white shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                    onClick={() => {
                      setPreview(null);
                      setFiles(undefined);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              </div>
            )}

            <br />
            <Button
              className="w-full"
              type="submit"
              disabled={status === "streaming" || !files || input.length === 0}
            >
              {status === "submitted" ? "En cours..." : "Analyser l'image"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <br />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Resultat d'analyse</CardTitle>
        </CardHeader>
        <CardContent>
          {status === "submitted" && (
            <div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role !== "user" && (
                <p>
                  <span>{m.content}</span>
                </p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
