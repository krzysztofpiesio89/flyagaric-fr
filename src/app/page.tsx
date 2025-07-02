import Header from "@/components/flyagaric/Header";
import ProductGrid from "@/components/flyagaric/ProductGrid";

/**
 * The main page of the flyagaric.fr store.
 * It combines the Header and ProductGrid components to create the homepage.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <ProductGrid />
      </main>
    </>
  );
}
