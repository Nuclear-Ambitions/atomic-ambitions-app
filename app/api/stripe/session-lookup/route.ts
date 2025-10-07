import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

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

    // Return the session data without any side effects
    return NextResponse.json({
      success: true,
      session: session
    })

  } catch (error) {
    console.error('🔍 [STRIPE SESSION LOOKUP] Error:', error)
    return NextResponse.json(
      { error: 'Failed to lookup session' },
      { status: 500 }
    )
  }
}
