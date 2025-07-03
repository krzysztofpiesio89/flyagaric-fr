"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { Cart } from "@/components/flyagaric/Cart";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white z-20 border-b">
      <nav className="flex max-w-frame mx-auto items-center justify-between py-5 md:py-6 px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/flyagaric"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px]",
            ])}
          >
            flyagaric.fr
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="hover:text-gray-700">Shop</Link>
          <Link href="/about" className="hover:text-gray-700">About</Link>
          <Link href="/contact" className="hover:text-gray-700">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <Cart />
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Image
                    src="/icons/menu.svg"
                    alt="Menu"
                    width={24}
                    height={24}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-4 p-4">
                  <SheetClose asChild>
                    <Link href="/shop" className="text-lg">Shop</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about" className="text-lg">About</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contact" className="text-lg">Contact</Link>
                  </SheetClose>
                  <div className="mt-4">
                    <Cart />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;