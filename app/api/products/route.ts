import { NextRequest, NextResponse } from "next/server";
import products from "@/data/products.json";

type Params = {
  searchParams: {
    name: string;
  };
};

export const GET = async (req: NextRequest, res: NextResponse) => {
  // search
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("name");

  if (query) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    return NextResponse.json(filteredProducts[0]);
  }
  return NextResponse.json(products);
};
