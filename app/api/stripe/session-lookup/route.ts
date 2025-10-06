import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SubscriptionDataAccess as subsData } from '@/lib/db/subscriptions'
import { SubscriptionData } from '@/lib/db/subscriptions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    console.log('🔍 [STRIPE SESSION LOOKUP] Retrieving session from Stripe:', sessionId)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription']
    })

    console.log('🔍 [STRIPE SESSION LOOKUP] Session retrieved:', session)

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
    await recordSubscription(subData)

    // Return the transaction information
    return NextResponse.json({
      success: true,
      transaction: {
        session
      }
    })

  } catch (error) {
    console.error('🔍 [STRIPE SESSION LOOKUP] Error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup session' },
      { status: 500 }
    )
  }
}

async function recordSubscription(subData: any) {
  try {
    const userId = subData.userId

    if (!userId) {
      console.error('🔍 [STRIPE SESSION LOOKUP] No user_id found')
      return
    }

    await subsData.updateUserStripeCustomerId(userId, subData.stripeCustomerId)

    await subsData.insertSubscription(subData)

    await subsData.setMembershipLevel(userId, 'charter')

  } catch (error) {
    console.error('🔍 [STRIPE SESSION LOOKUP] Failed to store subscription info:', error)
  }
}
