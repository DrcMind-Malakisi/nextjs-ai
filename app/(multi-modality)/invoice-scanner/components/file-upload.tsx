"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { FormEvent, useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [json, setJson] = useState<any>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setJson(null);
    setLoading(true);
    if (!file) return;

    const formData = new FormData();
    formData.append("invoice", file);

    const response = await fetch("/api/invoice-scanner", {
      method: "POST",
      body: formData,
    });

    const json = await response.json();

    setJson(json);
    setFile(null);
    setPreview(null);
    setLoading(false);
  };

  return (
    <Card className="w-full ">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md ">
          <Input
            type="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files && target.files.length > 0) {
                setFile(target.files[0]);
                // set the preview url
                const reader = new FileReader();
                reader.onload = (e) => {
                  setPreview(e.target?.result as string);
                };
                reader.readAsDataURL(target.files[0]);
              }
            }}
            accept="image/jpeg, image/png"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto rounded-md border"
            />
          )}
          <Button type="submit" disabled={!file || loading}>
            {loading ? "Analyse en cours..." : "Analyser le fichier"}
          </Button>
        </form>
        <br />
        <Separator />
        <br />
        {loading && (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4" />
          </div>
        )}

        {json && (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Résultat de l'analyse</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(json, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
