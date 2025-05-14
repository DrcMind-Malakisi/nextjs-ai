import React from "react";
import UploadTheme from "./components/upload-img";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex min-h-[calc(100vh-20vh)] flex-col items-center justify-between lg:p-24 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Description image</h1>

        <p>
          Ceci est une page de démonstration de la fonctionnalité de description
          d'une image. Vous pouvez télécharger une image et l'IA générera une
          description de l'image. Cette fonctionnalité utilise l'IA sdk et l'API
          de Google Gemini pour générer la description de l'image.
        </p>
        <br />
        <UploadTheme />
      </div>
    </main>
  );
}
