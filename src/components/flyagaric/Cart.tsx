"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

// Load the Stripe publishable key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export function Cart() {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          cartItems.map((item) => ({ id: item.id, quantity: item.quantity }))
        ),
      });

      const { sessionId } = await res.json();
      if (!sessionId) {
        throw new Error("Failed to create checkout session.");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      // Here you could show an error message to the user
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto pr-4">
            {cartItems.length === 0 ? (
              <p className="text-center py-4">Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center py-4 border-b">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      &times;
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cartItems.length > 0 && (
            <SheetFooter className="mt-auto border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
                >
                  Checkout
                </Button>
                {!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && (
                  <p className="text-xs text-center text-red-500 mt-2">
                    Stripe is not configured.
                  </p>
                )}
              </div>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}