import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import { Cart } from "@/components/flyagaric/Cart";

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 border-b">
      <div className="flex max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px]",
            ])}
          >
            flyagaric.fr
          </Link>
        </div>
        <div className="flex items-center">
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
