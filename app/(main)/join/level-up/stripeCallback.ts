import { SubscriptionSummary } from '@/lib/data/subscriptions'

const ingestStripeSession = async (
  sessionId: string
): Promise<SubscriptionSummary> => {
  console.log('Ingesting Stripe session')
  const sessionResponse = await fetch(
    `/api/stripe/session-lookup?session_id=${sessionId}`
  )
  if (!sessionResponse.ok) {
    throw new Error('Failed to retrieve session from Stripe')
  }

  const sessionData = await sessionResponse.json()
  console.log('Stripe session data:', sessionData)

  const session = sessionData.session
  const subscriptionId = session.subscription?.id

  if (!subscriptionId) {
    throw new Error('No subscription found in session')
  }

  const storeSessionResponse = await fetch(
    '/api/registration/stripe-session',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    }
  )

  if (storeSessionResponse.ok) {
    const storeSessionData = await storeSessionResponse.json()
    console.log(
      '💾 [STRIPE SESSION STORAGE] Successfully stored session:',
      storeSessionData.sessionId
    )
  } else {
    throw new Error('Failed to store session in the database')
  }

  // Check if subscription record already exists in our database
  const existingSubResponse = await fetch(
    `/api/registration/subscription?subscription_id=${subscriptionId}`
  )

  if (existingSubResponse.ok) {
    // Subscription already exists, get the data
    const existingData = await existingSubResponse.json()
    console.log(
      '📝 [SUBSCRIPTION] Existing subscription data:',
      existingData.subscription
    )
    return existingData.subscription
  } else if (existingSubResponse.status === 404) {
    // Subscription doesn't exist, create it via POST
    console.log('Creating new subscription record...')
    const createResponse = await fetch('/api/registration/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    })

    if (!createResponse.ok) {
      throw new Error('Failed to create subscription record')
    }

    const createData = await createResponse.json()
    console.log(
      '📝 [SUBSCRIPTION] Created subscription data:',
      createData.subscription
    )
    return createData.subscription
  } else {
    throw new Error('Failed to check subscription status')
  }
}

export default ingestStripeSession
