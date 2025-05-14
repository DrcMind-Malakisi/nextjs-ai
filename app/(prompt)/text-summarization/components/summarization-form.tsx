"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCompletion } from "@ai-sdk/react";

export default function SummarizationForm() {
  const {
    completion,
    complete,
    input,

    isLoading,
    handleInputChange,
    error,
  } = useCompletion({
    api: "/api/text-summarization",
  });

  return (
    <div className="space-y-8">
      <div className="relative w-full">
        <label htmlFor="text">Texte à résumer</label>
        <Textarea
          id="text"
          placeholder="Entrez le texte à résumer ici..."
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          rows={5}
          className="mt-1 h-64 resize-none"
        />

        {/* lenght indicator */}
        <div className="absolute right-2 bottom-2 text-sm text-gray-500">
          {input.length}/2500
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={isLoading}
          onClick={async () => await complete(input)}
        >
          {isLoading ? "Résumant..." : "Résumer"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && !completion && (
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          )}
          {completion && <p>{completion}</p>}
          {error && <p className="text-red-500">{error.message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
