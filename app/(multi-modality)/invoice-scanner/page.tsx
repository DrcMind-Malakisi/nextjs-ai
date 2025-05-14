import React from "react";
import FileUpload from "./components/file-upload";

type Props = {};

export default function page({}: Props) {
  return (
    <main className="flex min-h-[calc(100vh-20vh)] flex-col items-center justify-between lg:p-16 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Scanner de facture</h1>

        <p>
          Voici un exemple d'application de scanner de facture. Vous pouvez
          télécharger une image de facture et l'IA va extraire les informations
          et les injecter dans le formulaire
        </p>
        <br />
        <FileUpload />
      </div>
    </main>
  );
}
