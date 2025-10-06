import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { db } from '@/lib/db/Database'
import { SubscriptionDataAccess as subsData } from '@/lib/db/subscriptions'

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

    console.log('🔍 [STRIPE SESSION LOOKUP] Looking up session:', sessionId)

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'subscription', 'payment_intent', 'line_items']
    })

    console.log(session)
    // console.log('🔍 [STRIPE SESSION LOOKUP] Session retrieved:', {
    //   id: session.id,
    //   payment_status: session.payment_status,
    //   customer: session.customer,
    //   subscription: session.subscription,
    //   mode: session.mode
    // })

    // Extract transaction information
    // const transactionInfo = {
    //   session_id: session.id,
    //   payment_status: session.payment_status,
    //   customer_id: typeof session.customer === 'string' ? session.customer : session.customer?.id,
    //   subscription_id: typeof session.subscription === 'string' ? session.subscription : session.subscription?.id,
    //   payment_intent_id: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id,
    //   amount_total: session.amount_total,
    //   currency: session.currency,
    //   mode: session.mode,
    //   metadata: session.metadata,
    //   line_items: session.line_items?.data || [],
    //   created: new Date(session.created * 1000),
    // }

    // Store transaction information in database
    // await storeTransactionInfo(transactionInfo)

    // Return the transaction information
    return NextResponse.json({
      success: true,
      transaction: {
        session
      }
      // transaction: {
      //   session_id: transactionInfo.session_id,
      //   payment_status: transactionInfo.payment_status,
      //   customer_id: transactionInfo.customer_id,
      //   subscription_id: transactionInfo.subscription_id,
      //   payment_intent_id: transactionInfo.payment_intent_id,
      //   amount_total: transactionInfo.amount_total,
      //   currency: transactionInfo.currency,
      //   mode: transactionInfo.mode,
      //   metadata: transactionInfo.metadata,
      //   line_items: transactionInfo.line_items.map(item => ({
      //     price_id: item.price?.id,
      //     product_id: item.price?.product,
      //     amount: item.amount_total,
      //     quantity: item.quantity,
      //     description: item.description
      //   })),
      //   created: transactionInfo.created
      // }
    })

  } catch (error) {
    console.error('🔍 [STRIPE SESSION LOOKUP] Error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup session' },
      { status: 500 }
    )
  }
}

async function storeTransactionInfo(transactionInfo: any) {
  try {
    const userId = transactionInfo.metadata?.user_id
    const productCode = transactionInfo.metadata?.product_code
    const interval = transactionInfo.metadata?.interval

    if (!userId) {
      console.error('🔍 [STRIPE SESSION LOOKUP] No user_id in metadata')
      return
    }

    // Update user's Stripe customer ID if not already set
    if (transactionInfo.customer_id) {
      await subsData.updateUserStripeCustomerId(userId, transactionInfo.customer_id)
    }

    // Store payment information
    if (transactionInfo.payment_intent_id && transactionInfo.amount_total) {
      await subsData.insertPayment({
        id: transactionInfo.session_id,
        stripe_payment_intent_id: transactionInfo.payment_intent_id,
        amount: transactionInfo.amount_total / 100, // Convert from cents
        currency: transactionInfo.currency,
        subscription_id: transactionInfo.subscription_id
      })
    }

    // Store subscription information
    if (transactionInfo.subscription_id) {
      const subscription = await stripe.subscriptions.retrieve(transactionInfo.subscription_id)

      // FIXME: at minimum, period end date is wrong
      await subsData.insertSubscription({
        id: transactionInfo.subscription_id,
        stripe_subscription_id: transactionInfo.subscription_id,
        user_id: userId,
        status: subscription.status,
        current_period_start: new Date(subscription.start_date),
        current_period_end: new Date(),
        product_id: productCode || 'charter-member'
      })
    }

    // Update membership status
    if (transactionInfo.payment_status === 'paid') {
      await subsData.updateMembershipStatus(userId, productCode || 'charter-member', 'active')
    }

    console.log('🔍 [STRIPE SESSION LOOKUP] Transaction info stored successfully')

  } catch (error) {
    console.error('🔍 [STRIPE SESSION LOOKUP] Failed to store transaction info:', error)
  }
}
