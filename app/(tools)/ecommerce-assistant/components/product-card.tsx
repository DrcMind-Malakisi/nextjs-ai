"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{product.description}</p>
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
      <CardFooter className="flex justify-end">
        <Button variant={"outline"}>
          <ShoppingCart className="h-4 w-4" />
          Ajouter au Panier
        </Button>
      </CardFooter>
    </Card>
  );
}
