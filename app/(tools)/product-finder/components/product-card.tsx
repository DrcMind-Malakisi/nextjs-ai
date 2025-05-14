"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);

    // Reset animation after a short delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-2">{product.description}</p>
        <div className="flex items-center gap-2 mt-2">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold">
                {product.discountPrice.toFixed(2)}€
              </span>
              <span className=" line-through">{product.price.toFixed(2)}€</span>
            </>
          ) : (
            <span className="text-xl font-bold">
              {product.price.toFixed(2)}€
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full flex items-center gap-2 ${
            isAdding ? "bg-green-600" : ""
          }`}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          {isAdding ? "Ajouté!" : "Ajouter au Panier"}
        </Button>
      </CardFooter>
    </Card>
  );
}
