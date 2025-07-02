import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductPageClient from "@/components/flyagaric/ProductPageClient";
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string }
}

// This function generates dynamic metadata for the page.
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    }
  }

  return {
    title: `${product.name} - flyagaric.fr`,
    description: product.description.substring(0, 160), // Truncate for meta description
  }
}

// This is the main server component for the product page.
export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}