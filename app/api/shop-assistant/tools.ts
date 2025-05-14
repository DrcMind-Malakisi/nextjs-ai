import { Product } from "@/types/type";
import { ToolSet } from "ai";
import { z } from "zod";

export const tools: ToolSet = {
  getProducts: {
    description: "Get products from the database",
    parameters: z.object({
      category: z
        .string()
        .describe("The category of products to get")
        .optional(),
    }),
    execute: async ({ category }) => {
      const res = await fetch("http://localhost:3000/api/products");
      const products = await res.json();

      if (category) {
        const filteredProducts = products.filter(
          (product: Product) => product.category === category
        );
        return filteredProducts;
      }
      return products;
    },
  },
  getAvailableProducts: {
    description: "Get available products from the database",
    parameters: z.object({
      category: z
        .string()
        .describe("The category of products to get")
        .optional(),
    }),
    execute: async ({ category }) => {
      const res = await fetch("http://localhost:3000/api/products/available");
      const products = await res.json();

      if (category) {
        const filteredProducts = products.filter(
          (product: Product) => product.category === category
        );
        return filteredProducts;
      }
      return products;
    },
  },

  getProduct: {
    description: "Get a product from the database",
    parameters: z.object({
      name: z.string().describe("The name of the product to get"),
    }),
    execute: async ({ name }) => {
      const res = await fetch(
        "http://localhost:3000/api/products" + `?name=${name}`
      );
      const product = await res.json();

      return `Voici le produit que vous avez demandé : ${product.name} - ${product.description} - ${product.price} $ - ${product.quantity} en stock`;
    },
  },

  addProductToCart: {
    description: "Add a product to the cart",
    parameters: z.object({
      name: z.string().describe("The name of the product to add"),
    }),
    execute: async ({ name }) => {
      const productRes = await fetch(
        "http://localhost:3000/api/products" + `?name=${name}`
      );
      const product = (await productRes.json()) as Product;
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        body: JSON.stringify({ id: product.id }),
      });

      return `Le produit ${product.name} a été ajouté au panier`;
    },
  },
  clearCart: {
    description: "Clear cart content",
    parameters: z.object({}),
    execute: async () => {
      const res = await fetch("http://localhost:3000/api/cart", {
        method: "DELETE",
      });
      return `Le panier a été vidé`;
    },
  },
};
