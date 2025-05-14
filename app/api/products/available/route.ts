import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

export const GET = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json(products.filter((product) => product.quantity > 0));
};
