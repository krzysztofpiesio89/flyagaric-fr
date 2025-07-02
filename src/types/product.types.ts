// Defines the structure for a single product
export type Product = {
  id: number;
  name: string; // Product's display name
  price: number; // Product's price in a numerical format
  image: string; // URL or path to the product image
  slug: string; // URL-friendly identifier for the product page
  description: string; // Detailed product description
};
