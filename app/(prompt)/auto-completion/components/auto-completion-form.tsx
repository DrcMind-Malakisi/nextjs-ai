"use client";

import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader2, PenLine } from "lucide-react";

export default function AutoCompletionForm() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form action="">
      <div className="w-full relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Entrez votre texte ici..."
          // adding a border animation when is loading

          rows={5}
        />

        {input.split(" ").length > 5 && (
          <div className="absolute right-2 bottom-2 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    type="button"
                    className="rounded-full p-3 w-4 h-4 "
                    onClick={async () => {
                      setIsLoading(true);
                      alert("ok");
                    }}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <PenLine />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ecrire avec l'IA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
      <div className="flex items-center justify-end mt-2">
        <Button
          disabled={isLoading || input.split(" ").length < 5}
          type="submit"
        >
          Valider
        </Button>
      </div>
    </form>
  );
}
