"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// Props for the ProductCard component
type ProductCardProps = {
  product: Product;
};

/**
 * A component that displays a single product card.
 * It shows the product image, name, price, and a button to view details.
 */
const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none sm:h-96">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          <Link href={`/product/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-base font-semibold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Button
          className="mt-4 w-full relative z-10"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;