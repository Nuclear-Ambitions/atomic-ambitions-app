import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

const productPrices = {
  "monthly": process.env.STRIPE_CHARTER_MEMBER_MONTHLY_PRICE_ID!,
  "annual": process.env.STRIPE_CHARTER_MEMBER_ANNUAL_PRICE_ID!,
}

export async function POST(request: NextRequest) {
  try {
    const { productCode, interval, userId } = await request.json()

    if (!productCode || !interval || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const priceId = productPrices[interval as keyof typeof productPrices]

    if (!priceId) {
      return NextResponse.json({ error: 'Invalid payment interval' }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
