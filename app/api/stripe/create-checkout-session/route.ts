import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const { membershipLevel, userId, email } = await request.json();

    if (!membershipLevel || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Define pricing based on membership level
    const pricing = {
      supporter: {
        price: 1100, // $11.00 in cents
        interval: "month",
        name: "Supporter Membership",
        description: "Monthly Supporter membership with premium features",
      },
      charter: {
        price: 11100, // $111.00 in cents
        interval: "year",
        name: "Charter Membership",
        description: "Annual Charter membership with premium features and 15% discount",
      },
    };

    const selectedPricing = pricing[membershipLevel as keyof typeof pricing];

    if (!selectedPricing) {
      return NextResponse.json(
        { error: "Invalid membership level" },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedPricing.name,
              description: selectedPricing.description,
              metadata: {
                membership_level: membershipLevel,
                user_id: userId,
              },
            },
            unit_amount: selectedPricing.price,
            recurring: {
              interval: selectedPricing.interval as "month" | "year",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: email,
      metadata: {
        user_id: userId,
        membership_level: membershipLevel,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?payment_status=success&subscription_status=active`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?payment_status=cancelled`,
      subscription_data: {
        metadata: {
          user_id: userId,
          membership_level: membershipLevel,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
