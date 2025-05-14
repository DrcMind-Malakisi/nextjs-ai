import React from "react";
import { ModeToggle } from "./theme-switcher";
import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 border-b h-16 sticky top-0 bg-background z-10 container mx-auto">
      <a href="/">
        <Bot className="w-8 h-8" />
      </a>

      <ModeToggle />
    </header>
  );
}
