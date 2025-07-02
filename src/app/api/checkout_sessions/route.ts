import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

// This is a simplified type for the cart item received from the frontend.
// In a real app, you might want to use a more robust validation library like Zod.
type CartItem = {
  id: number;
  quantity: number;
};

export async function POST(req: NextRequest) {
  try {
    const cartItems = (await req.json()) as CartItem[];

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid cart data." },
        { status: 400 }
      );
    }

    const line_items = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product with id ${item.id} not found.`);
      }
      return {
        price_data: {
          currency: "usd", // You can change this to your desired currency
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.price * 100, // Price in cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}