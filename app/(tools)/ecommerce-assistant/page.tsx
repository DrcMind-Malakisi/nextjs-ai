import React from "react";

import ChatInterface from "./components/chat-interface";
import ProductList from "./components/product-list";
import FloatingCartButton from "./components/floating-cart-button";
import FloatingChatButton from "./components/floating-chat-button";

type Props = {};

export default async function page({}: Props) {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return (
    <main className="container mx-auto p-4">
      <div>
        <h1 className="text-2xl font-bold">Appel aux outils</h1>
        <p>
          Cette page vous permet de tester les outils externes de l'application.
          Nous allons voir comment dopter notre modele (gemini) avec des outils
          externes pour améliorer l'expérience utilisateur.
        </p>
        <br />
        <div className="">
          {/* Products section - takes 2/3 on large screens */}

          <h2 className="text-2xl font-semibold mb-4">Nos Produits</h2>
          <ProductList products={products} />
        </div>
      </div>

      <FloatingCartButton />
      <FloatingChatButton />
    </main>
  );
}
