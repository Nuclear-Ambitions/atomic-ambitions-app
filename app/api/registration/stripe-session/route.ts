import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { SubscriptionDataAccess as subDataAccess } from '@/lib/data/subscriptions'

export async function POST(request: NextRequest) {
  try {
    const session = await request.json() as Stripe.Checkout.Session

    console.log('💾 [STRIPE SESSION STORAGE] Storing session:', session.id)

    // Store the session payload in the database
    const sessionId = await subDataAccess.insertStripeSession(session)

    console.log('💾 [STRIPE SESSION STORAGE] Successfully stored session:', sessionId)

    return NextResponse.json({
      success: true,
      sessionId: sessionId
    })

  } catch (error) {
    console.error('💾 [STRIPE SESSION STORAGE] Error:', error)
    return NextResponse.json(
      { error: 'Failed to store session' },
      { status: 500 }
    )
  }
}
