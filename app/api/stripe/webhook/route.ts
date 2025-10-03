import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;

      case "customer.subscription.created":
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;

      case "customer.subscription.updated":
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case "customer.subscription.deleted":
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      case "invoice.payment_succeeded":
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentSucceeded(invoice);
        break;

      case "invoice.payment_failed":
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(failedInvoice);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler failed:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    const userId = session.metadata?.user_id;
    const membershipLevel = session.metadata?.membership_level;

    if (!userId || !membershipLevel) {
      console.error("Missing user_id or membership_level in session metadata");
      return;
    }

    // Update user's subscription status in database
    await updateUserSubscription(userId, membershipLevel, "active");

    console.log(`Checkout session completed for user ${userId} with membership ${membershipLevel}`);
  } catch (error) {
    console.error("Failed to handle checkout session completion:", error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.user_id;
    const membershipLevel = subscription.metadata?.membership_level;

    if (!userId || !membershipLevel) {
      console.error("Missing user_id or membership_level in subscription metadata");
      return;
    }

    // Update user's subscription status in database
    await updateUserSubscription(userId, membershipLevel, "active");

    console.log(`Subscription created for user ${userId} with membership ${membershipLevel}`);
  } catch (error) {
    console.error("Failed to handle subscription creation:", error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.user_id;
    const membershipLevel = subscription.metadata?.membership_level;

    if (!userId || !membershipLevel) {
      console.error("Missing user_id or membership_level in subscription metadata");
      return;
    }

    let status: string;
    switch (subscription.status) {
      case "active":
        status = "active";
        break;
      case "canceled":
        status = "cancelled";
        break;
      case "past_due":
        status = "past_due";
        break;
      default:
        status = subscription.status;
    }

    // Update user's subscription status in database
    await updateUserSubscription(userId, membershipLevel, status);

    console.log(`Subscription updated for user ${userId} to status ${status}`);
  } catch (error) {
    console.error("Failed to handle subscription update:", error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const userId = subscription.metadata?.user_id;

    if (!userId) {
      console.error("Missing user_id in subscription metadata");
      return;
    }

    // Update user's subscription status to cancelled
    await updateUserSubscription(userId, "explorer", "cancelled");

    console.log(`Subscription cancelled for user ${userId}`);
  } catch (error) {
    console.error("Failed to handle subscription deletion:", error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    if (invoice.subscription) {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      const userId = subscription.metadata?.user_id;
      const membershipLevel = subscription.metadata?.membership_level;

      if (userId && membershipLevel) {
        // Update user's subscription status to active
        await updateUserSubscription(userId, membershipLevel, "active");
        console.log(`Invoice payment succeeded for user ${userId}`);
      }
    }
  } catch (error) {
    console.error("Failed to handle invoice payment success:", error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    if (invoice.subscription) {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      const userId = subscription.metadata?.user_id;
      const membershipLevel = subscription.metadata?.membership_level;

      if (userId && membershipLevel) {
        // Update user's subscription status to past_due
        await updateUserSubscription(userId, membershipLevel, "past_due");
        console.log(`Invoice payment failed for user ${userId}`);
      }
    }
  } catch (error) {
    console.error("Failed to handle invoice payment failure:", error);
  }
}

async function updateUserSubscription(
  userId: string,
  membershipLevel: string,
  subscriptionStatus: string
) {
  try {
    // This would typically update your database
    // For now, we'll just log the update
    console.log(`Updating user ${userId}: level=${membershipLevel}, status=${subscriptionStatus}`);

    // TODO: Implement actual database update
    // Example:
    // await db.users.update({
    //   where: { id: userId },
    //   data: {
    //     membershipLevel,
    //     subscriptionStatus,
    //     updatedAt: new Date(),
    //   },
    // });
  } catch (error) {
    console.error("Failed to update user subscription in database:", error);
  }
}
