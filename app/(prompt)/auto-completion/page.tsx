import AutoCompletionForm from "./components/auto-completion-form";

export default function Page() {
  return (
    <main className="flex min-h-[calc(100vh-20vh)] flex-col items-center justify-between lg:p-16 p-4 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Auto Completion</h1>
        <p>
          Voici un exemple de page d'auto-complétion. Vous pouvez l'utiliser
          pour générer du texte automatiquement en fonction de l'input de
          l&apos;utilisateur.
        </p>
        <br />
        <AutoCompletionForm />
      </div>
    </main>
  );
}
