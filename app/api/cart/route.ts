import { Product } from "@/types/type";
import { NextResponse } from "next/server";

let productsInCart: Product[] = [];

export const GET = async (req: Request) => {
  return NextResponse.json(productsInCart);
};

export const POST = async (req: Request) => {
  const data = await req.json();
  const { product }: { product: Product } = data;

  productsInCart.push(product);
  return NextResponse.json(productsInCart);
};

export const DELETE = async (req: Request) => {
  productsInCart = [];
  return NextResponse.json(productsInCart);
};
