import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Webhook endpoint secret - replace with your actual endpoint secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_12345';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.log('⚠️ No stripe-signature header found');
      return NextResponse.json(
        { error: 'No signature found' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      // Verify the webhook signature
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed.`, err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription trial will end. Status: ${subscription.status}`);
        // TODO: Implement handleSubscriptionTrialEnding(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription deleted. Status: ${subscription.status}`);
        // TODO: Implement handleSubscriptionDeleted(subscription);
        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription created. Status: ${subscription.status}`);
        // TODO: Implement handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`Subscription updated. Status: ${subscription.status}`);
        // TODO: Implement handleSubscriptionUpdated(subscription);
        break;
      }

      case 'entitlements.active_entitlement_summary.updated': {
        const entitlement = event.data.object;
        console.log(`Active entitlement summary updated for ${entitlement.id}`);
        // TODO: Implement handleEntitlementUpdated(entitlement);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
