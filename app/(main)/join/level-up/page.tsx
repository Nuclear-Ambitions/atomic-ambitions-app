'use client'

import PickAndPay from './PickAndPay'
import Confirmation from './Confirmation'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import ingestStripeSession from './stripeCallback'
import { SubscriptionSummary } from '@/lib/data/subscriptions'

function SignInMsg() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Level Up Your Membership</h1>
      <p>First, you need to sign in.</p>
    </div>
  )
}

const LevelUpContent = () => {
  const searchParams = useSearchParams()
  const stripeSessionId = searchParams.get('session_id')
  const session = useSession()
  const isSignedIn = session.status === 'authenticated'
  const isSubscriber = session.data?.user?.summary?.isSubscriber

  const [isRetrievingPaymentInfo, setIsRetrievingPaymentInfo] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionSummary>()

  // Lookup session data if session_id is present
  useEffect(() => {
    const lookupSession = async () => {
      if (!stripeSessionId) return

      setIsRetrievingPaymentInfo(true)
      try {
        const subscription = await ingestStripeSession(stripeSessionId)
        setSubscriptionData(subscription)
      } catch (error) {
        console.error('Error while ingesting Stripe session:', error)
        setErrors({
          payment:
            'Failed to sync payment. We may need to fix this for you. Sorry for the inconvenience.',
        })
      } finally {
        setIsRetrievingPaymentInfo(false)
      }
    }

    lookupSession()
  }, [stripeSessionId])

  return (
    <div>
      {isRetrievingPaymentInfo && <div>Retrieving payment information...</div>}
      {errors.payment && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
          <p className='text-red-600'>{errors.payment}</p>
        </div>
      )}
      {!isSignedIn ? (
        <SignInMsg />
      ) : !isSubscriber ? (
        <PickAndPay />
      ) : (
        <Confirmation subscription={subscriptionData} />
      )}
    </div>
  )
}

const LevelUpPage = () => {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background py-12'>
          <div className='container mx-auto px-6'>
            <div className='max-w-md mx-auto'>
              <div className='card'>
                <div className='text-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'>
                    <p className='text-muted-foreground'>
                      Loading page to upgrade your membership...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <LevelUpContent />
    </Suspense>
  )
}

export default LevelUpPage
