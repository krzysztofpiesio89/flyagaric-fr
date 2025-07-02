import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown webhook error";
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Fulfill the order...
    try {
      // Send a confirmation email
      const fromEmail = process.env.EMAIL_FROM;
      const toEmail = process.env.EMAIL_TO;

      if (!fromEmail || !toEmail) {
        throw new Error("Email addresses are not configured in .env.local");
      }

      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: "New Order Confirmation - flyagaric.fr",
        html: `<p>A new order has been placed. Session ID: <strong>${session.id}</strong>. Total: <strong>${(session.amount_total! / 100).toFixed(2)} ${session.currency?.toUpperCase()}</strong></p>`,
      });

      console.log("Confirmation email sent for session:", session.id);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Don't block the webhook response for email errors
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}