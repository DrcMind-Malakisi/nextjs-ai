import Image from "next/image";
import Link from "next/link";
import { title } from "process";

export default function Home() {
  const links = [
    {
      title: "Prompt",
      description: "Génération de texte à partir d'un prompt",
      subLinks: [
        {
          title: "Auto Completion",
          description: "Complétion automatique de texte",
          href: "/auto-completion",
        },
        {
          title: "Text Summarization",
          description: "Résumé de texte",
          href: "/text-summarization",
        },
      ],
    },
    {
      title: "Multi modal",
      description:
        "Génération de texte à partir d'une image, fichier pdf ou audio",
      subLinks: [
        {
          title: "Image to text",
          description: "Génération de texte à partir d'une image",
          href: "/img-description",
        },
        {
          title: "Invoice scanner",
          description: "Génération d'un object JSON à partir d'une facture",
          href: "/invoice-scanner",
        },
      ],
    },

    {
      title: "Tools",
      description: "Faire appel à des outils externes",
      subLinks: [
        {
          title: "Product finder",
          description: "Génération de texte à partir d'un produit",
          href: "/product-finder",
        },
      ],
    },
  ];
  return (
    <main className="flex min-h-[calc(100vh-10vh)] flex-col items-center justify-between lg:p-24 p-8 max-w-7xl mx-auto">
      <section>
        <h1 className="text-3xl font-bold text-center mb-4">
          Intégration de l'IA dans les applications web
        </h1>
        <p className="text-lg mb-4">
          Ce projet illustre comment intégrer des modèles d'IA dans une
          application web. Il utilise Next.js pour le frontend et l'API de
          Google Gemini pour la génération de texte. Pour les différentes
          fonctionnalités, nous avons utilisé l'outil{" "}
          <a
            href="https://sdk.vercel.ai/"
            target="_blank"
            className="text-primary"
          >
            @ai-sdk
          </a>
          .
        </p>

        <p className="text-lg mb-4">
          Vous pouvez explorer les différentes fonctionnalités de l'application
          en cliquant sur les liens ci-dessous :
        </p>

        <br />
        {/* using ul , ol and li */}
        <ul className="list-none ">
          {links.map((link) => (
            <li key={link.title} className="mb-4">
              <h2 className="text-xl font-bold">{link.title}</h2>
              <p className="text-lg">{link.description}</p>
              <ol className="list-disc list-inside ml-4">
                {link.subLinks.map((subLink) => (
                  <li key={subLink.title} className="mb-2">
                    <Link
                      href={subLink.href}
                      className="text-primary hover:underline"
                    >
                      {subLink.title}
                    </Link>
                    <p className="text-sm">{subLink.description}</p>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
        <br />
      </section>
    </main>
  );
}
