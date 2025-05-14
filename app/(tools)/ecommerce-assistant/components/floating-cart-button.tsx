"use client";

import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FloatingCartButton() {
  const { data: products = [] } = useSWR("/api/cart", fetcher, {
    refreshInterval: 3000, // Optional: auto-update every 3s
  });

  return (
    <Button className="fixed top-14 right-4 rounded-full w-8 h-8 shadow-lg z-50 p-0 bg-green-600 hover:bg-green-700">
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        {products.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {products.length}
          </span>
        )}
      </div>
    </Button>
  );
}
