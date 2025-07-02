import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";

/**
 * A simple header component for the store.
 * Displays the store name and a tagline.
 */
const Header = () => {
  return (
    <header className="bg-gray-50 py-16 text-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className={cn(integralCF.className, "text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl")}>
          flyagaric.fr
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Discover the power of nature with our premium Amanita Muscaria products.
        </p>
      </div>
    </header>
  );
};

export default Header;