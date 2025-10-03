import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
})

export async function POST(request: NextRequest) {
  try {
    const { productCode, interval, userId, email } = await request.json()

    if (!productCode || !interval || !userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Define pricing for Charter Member based on interval
    const pricing = {
      monthly: {
        price: 1100, // $11.00 in cents
        interval: 'month',
        name: 'Charter Member (Monthly)',
        description: 'Monthly Charter Member subscription with premium content access',
      },
      annual: {
        price: 11100, // $111.00 in cents
        interval: 'year',
        name: 'Charter Member (Annual)',
        description: 'Annual Charter Member subscription with premium content access and 15% discount',
      },
    }

    const selectedPricing = pricing[interval as keyof typeof pricing]

    if (!selectedPricing) {
      return NextResponse.json(
        { error: 'Invalid payment interval' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPricing.name,
              description: selectedPricing.description,
              metadata: {
                product_code: productCode,
                interval: interval,
                user_id: userId,
              },
            },
            unit_amount: selectedPricing.price,
            recurring: {
              interval: selectedPricing.interval as 'month' | 'year',
            },
          },
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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?payment_status=success&subscription_status=active`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/join/subscribe?payment_status=cancelled`,
      subscription_data: {
        metadata: {
          user_id: userId,
          product_code: productCode,
          interval: interval,
        },
      },
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
