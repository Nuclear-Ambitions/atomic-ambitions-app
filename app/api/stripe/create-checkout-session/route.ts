import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const intervalPrices = {
  month: process.env.STRIPE_PRICE_MONTHLY!,
  year: process.env.STRIPE_PRICE_ANNUAL!,
}

export async function POST(request: NextRequest) {
  try {
    const { productCode, interval, userId, email } = await request.json()

    console.log('🔐 [STRIPE CREATE CHECKOUT SESSION] Request received:', { productCode, interval, userId, email })

    console.log(intervalPrices)

    if (!productCode || !interval || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const priceId = intervalPrices[interval as keyof typeof intervalPrices]
    console.log('🔐 [STRIPE CREATE CHECKOUT SESSION] Price ID:', priceId)

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
      mode: 'subscription',
      customer_email: email,
      metadata: {
        user_id: userId,
        product_code: productCode,
        interval: interval,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?canceled=true`,
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.log('Stripe checkout session creation failed:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
