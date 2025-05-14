"use client";

import { useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
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
  const {
    completion,
    complete,
    isLoading,
    input,
    setInput,
    handleInputChange,
  } = useCompletion({
    api: "/api/auto-completion",
  });

  useEffect(() => {
    if (completion) {
      setInput(completion);
    }
  }, [completion, setInput]);
  return (
    <form action="">
      <div className="w-full relative">
        <Textarea
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
          placeholder="Entrez votre texte ici..."
          // adding a border animation when is loading
          className={isLoading ? "border-primary " : " resize-none"}
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
                      await complete(input);
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
