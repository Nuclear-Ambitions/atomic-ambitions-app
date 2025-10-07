'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useAuthStore } from '@/lib/stores/auth-store'
import Link from 'next/link'

type PaymentInterval = 'month' | 'year'

const SubscriptionContent = () => {
  const searchParams = useSearchParams()
  const {
    isSignedIn,
    user,
    checkAuthStatus,
    isLoading: authLoading,
  } = useAuthStore()
  const [isInitializing, setIsInitializing] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedInterval, setSelectedInterval] =
    useState<PaymentInterval>('year')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [subscriptionData, setSubscriptionData] = useState<any>(null)
  const [isLookingUpSession, setIsLookingUpSession] = useState(false)

  // Check for session_id from Stripe redirect
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus()
      setIsInitializing(false)
    }
    initializeAuth()
  }, [checkAuthStatus])

  // Lookup session data if session_id is present
  useEffect(() => {
    const lookupSession = async () => {
      if (!sessionId) return

      console.log(
        '🔍 [STRIPE SESSION LOOKUP] Looking up Stripe session:',
        sessionId
      )
      setIsLookingUpSession(true)
      try {
        // First, get the session from Stripe
        const sessionResponse = await fetch(
          `/api/stripe/session-lookup?session_id=${sessionId}`
        )
        if (!sessionResponse.ok) {
          throw new Error('Failed to retrieve session from Stripe')
        }

        const sessionData = await sessionResponse.json()
        console.log('Session data:', sessionData)

        const session = sessionData.session
        const subscriptionId = session.subscription?.id

        if (!subscriptionId) {
          throw new Error('No subscription found in session')
        }

        // Check if subscription record already exists in our database
        const existingSubResponse = await fetch(
          `/api/registration/subscription?subscription_id=${subscriptionId}`
        )

        if (existingSubResponse.ok) {
          // Subscription already exists, get the data
          const existingData = await existingSubResponse.json()
          setSubscriptionData(existingData.subscription)
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
          setSubscriptionData(createData.subscription)
        } else {
          throw new Error('Failed to check subscription status')
        }
      } catch (error) {
        console.error('Session lookup error:', error)
        setErrors({ session: 'Failed to retrieve transaction information' })
      } finally {
        setIsLookingUpSession(false)
      }
    }

    lookupSession()
  }, [sessionId])

  const handlePayment = async () => {
    if (!isSignedIn || !user) {
      setErrors({ auth: 'Please sign in to continue' })
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // Create checkout session with Stripe
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: 'charter-member',
          interval: selectedInterval,
          userId: user.id,
          email: user.email,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to create checkout session ${response}`)
      }

      const { url } = await response.json()

      // Redirect to Stripe checkout
      window.location.href = url
    } catch (error) {
      console.error('Payment error:', error)
      setErrors({ payment: 'Failed to process payment. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while initializing, checking auth, or looking up session
  if (isInitializing || authLoading || isLookingUpSession) {
    return (
      <div className='min-h-screen bg-background py-12'>
        <div className='container mx-auto px-6'>
          <div className='max-w-md mx-auto'>
            <div className='card'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                <p className='text-muted-foreground'>
                  {isLookingUpSession
                    ? 'Retrieving transaction information...'
                    : authLoading
                    ? 'Checking authentication...'
                    : 'Loading...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show confirmation page if user just completed payment
  if (subscriptionData && subscriptionData.payment_status === 'paid') {
    return (
      <div className='min-h-screen bg-background py-12'>
        <div className='container mx-auto px-6'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center mb-8'>
              <div className='w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center'>
                <span className='text-4xl'>🎉</span>
              </div>
              <h1 className='text-4xl font-bold text-primary mb-4'>
                Welcome, Charter Member!
              </h1>
              <p className='text-xl text-muted-foreground'>
                Thank you for supporting the Atomic Ambitions platform. Your
                subscription is now active.
              </p>
            </div>

            <div className='card mb-8'>
              <h2 className='text-2xl font-bold text-primary mb-4'>
                Your Charter Member Benefits
              </h2>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>
                    Our gratitude for your support
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>
                    Access to premium content
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className='text-center'>
              <Link href='/clubroom' className='btn btn-primary'>
                Go to Clubroom
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show cancellation message if user cancelled payment
  // This happens when user returns from Stripe without a session_id
  if (
    searchParams.get('canceled') === 'true' ||
    (sessionId &&
      subscriptionData &&
      subscriptionData.payment_status === 'unpaid')
  ) {
    return (
      <div className='min-h-screen bg-background py-12'>
        <div className='container mx-auto px-6'>
          <div className='max-w-2xl mx-auto'>
            <div className='text-center mb-8'>
              <div className='w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center'>
                <span className='text-4xl'>💳</span>
              </div>
              <h1 className='text-4xl font-bold text-primary mb-4'>
                Payment Cancelled
              </h1>
              <p className='text-xl text-muted-foreground'>
                No worries! You can complete your subscription anytime.
              </p>
            </div>

            <div className='text-center'>
              <Link href='/join/subscribe' className='btn btn-primary'>
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='max-w-4xl mx-auto mb-12'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary mb-4'>
              Level Up Your Membership
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Your support makes a difference. It helps us power the platform
              that empowers the people. Thank you!
            </p>
          </div>
        </div>

        {/* Authentication Check */}
        {!isSignedIn && (
          <div className='max-w-2xl mx-auto mb-12'>
            <div className='card'>
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-primary mb-4'>
                  Sign In Required
                </h2>
                <p className='text-muted-foreground mb-6'>
                  You need to be signed in to become a Charter Member.
                </p>
                <div className='flex gap-4 justify-center'>
                  <Link href='/_sign-in' className='btn btn-primary'>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charter Member Product */}
        {isSignedIn && (
          <div className='max-w-2xl mx-auto'>
            <div className='card mb-8'>
              <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-primary mb-4'>
                  Charter Member
                </h2>
                <p className='text-muted-foreground text-lg'>
                  Support the platform and unlock premium content. You get:
                </p>
              </div>

              {/* Benefits */}
              <div className='space-y-4 mb-8'>
                <div className='flex items-center justify-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>
                    A snazzy Charter Member badge
                  </span>
                </div>
                <div className='flex items-center justify-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>
                    Access to premium content
                  </span>
                </div>
                <div className='flex items-center justify-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>Extra karma points</span>
                </div>
                <div className='flex items-center justify-center space-x-3'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span className='text-foreground'>
                    A regular dose of gratitude
                  </span>
                </div>
              </div>

              {/* Payment Options */}
              <div className='space-y-4 mb-8'>
                <h3 className='text-xl font-bold text-primary text-center'>
                  Choose Your Plan
                </h3>

                <div className='grid grid-cols-2 gap-4'>
                  {/* Monthly Option */}
                  <div
                    className={`card cursor-pointer transition-all ${
                      selectedInterval === 'month'
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedInterval('month')}
                  >
                    <div className='text-center'>
                      <h4 className='text-lg font-bold text-primary mb-2'>
                        Monthly
                      </h4>
                      <div className='text-3xl font-bold text-primary mb-1'>
                        $11
                      </div>
                      <p className='text-muted-foreground text-sm'>per month</p>
                    </div>
                  </div>

                  {/* Annual Option */}
                  <div
                    className={`card cursor-pointer transition-all ${
                      selectedInterval === 'year'
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedInterval('year')}
                  >
                    <div className='text-center'>
                      <h4 className='text-lg font-bold text-primary mb-2'>
                        Annual
                      </h4>
                      <div className='text-3xl font-bold text-primary mb-1'>
                        $111
                      </div>
                      <p className='text-muted-foreground text-sm'>per year</p>
                      <div className='text-xs text-green-600 font-semibold mt-1'>
                        Save 15%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Messages */}
              {errors.payment && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
                  <p className='text-red-600'>{errors.payment}</p>
                </div>
              )}

              {errors.auth && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
                  <p className='text-red-600'>{errors.auth}</p>
                </div>
              )}

              {errors.session && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
                  <p className='text-red-600'>{errors.session}</p>
                </div>
              )}

              {/* Payment Button */}
              <div className='text-center'>
                <button
                  onClick={handlePayment}
                  className='btn btn-primary px-8 py-3 text-lg'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Level Up'}
                </button>
              </div>

              <div className='text-center mt-4'>
                <p className='text-sm text-muted-foreground'>
                  Secure payment powered by Stripe • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const SubscriptionPage = () => {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background py-12'>
          <div className='container mx-auto px-6'>
            <div className='max-w-md mx-auto'>
              <div className='card'>
                <div className='text-center'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                  <p className='text-muted-foreground'>Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  )
}

export default SubscriptionPage
