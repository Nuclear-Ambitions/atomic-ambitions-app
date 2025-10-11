import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SubscriptionDataAccess as subDataAccess, SubscriptionData } from '@/lib/data/subscriptions'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subscriptionId = searchParams.get('subscription_id')

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'Missing subscription_id parameter' },
        { status: 400 }
      )
    }

    console.log('🔍 [SUBSCRIPTION CHECK] Checking if subscription exists:', subscriptionId)

    const exists = await subDataAccess.subscriptionExists(subscriptionId)

    if (!exists) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    const subscription = await subDataAccess.getSubscription(subscriptionId)

    return NextResponse.json({
      success: true,
      subscription: subscription
    })

  } catch (error) {
    console.error('🔍 [SUBSCRIPTION CHECK] Error:', error)
    return NextResponse.json(
      { error: 'Failed to check subscription' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await request.json() as Stripe.Checkout.Session

    console.log('📝 [SUBSCRIPTION REGISTRATION] Processing session:', session.id)

    const sub = session.subscription as Stripe.Subscription
    const subItem = sub.items.data[0]
    const meta = session.metadata as Stripe.Metadata

    const subData: SubscriptionData = {
      id: sub.id,
      stripeCustomerId: sub.customer as string,
      userId: meta.user_id,
      customerEmail: session.customer_email,
      totalAmount: session.amount_total,
      currency: session.currency,
      priceId: subItem.price.id,
      productId: subItem.plan.product as string,
      amount: subItem.price.unit_amount,
      interval: subItem.plan.interval,
      paymentStatus: session.payment_status,
      status: session.status,
      currentPeriodStart: new Date(subItem.current_period_start * 1000),
      currentPeriodEnd: new Date(subItem.current_period_end * 1000),
    }

    // Store subscription information in database
    const subId = await recordSubscription(subData)

    // Get the subscription record to return
    const subRecord = await subDataAccess.getSubscription(subId)

    console.log('📝 [SUBSCRIPTION REGISTRATION] Successfully processed subscription:', subId)

    return NextResponse.json({
      success: true,
      subscription: subRecord
    })

  } catch (error) {
    console.error('📝 [SUBSCRIPTION REGISTRATION] Error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    )
  }
}

async function recordSubscription(subData: SubscriptionData): Promise<string> {
  try {
    const userId = subData.userId

    if (!userId) {
      console.error('📝 [SUBSCRIPTION REGISTRATION] No user_id found')
      throw new Error('No user_id found')
    }

    const result = await subDataAccess.insertSubscription(subData)

    await subDataAccess.updateUserStripeCustomerId(userId, subData.stripeCustomerId)

    await subDataAccess.setMembershipLevel(userId, 'charter')

    return result[0].id

  } catch (error) {
    console.error('📝 [SUBSCRIPTION REGISTRATION] Failed to store subscription info:', error)
    throw new Error('Failed to store subscription info')
  }
}
