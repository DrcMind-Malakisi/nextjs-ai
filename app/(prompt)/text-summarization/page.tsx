import React from "react";
import SummarizationForm from "./components/summarization-form";

export default function page() {
  return (
    <main className="flex min-h-[calc(100vh-20vh)] flex-col items-center justify-between lg:p-24 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Summarisation de texte avec l'IA</h1>
        <p>
          Cette page vous permet de résumer un texte en utilisant l'IA. Il vous
          suffit d'entrer le texte que vous souhaitez résumer dans le champ
          ci-dessous , de sélectionner le ton souhaité et le nombre de
          paragraphes souhaité, puis de cliquer sur le bouton "Résumer". L'IA
          générera un résumé du texte que vous avez fourni.
        </p>
        <br />
        <SummarizationForm />
      </div>
    </main>
  );
}
