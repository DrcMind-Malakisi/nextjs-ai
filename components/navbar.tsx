import React from "react";
import { ModeToggle } from "./theme-switcher";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center p-4 border-b h-16 sticky top-0 bg-background z-10">
      <a href="/">
        <h3 className="text-2xl font-bold ">AI integration</h3>
      </a>

      <ModeToggle />
    </header>
  );
}
