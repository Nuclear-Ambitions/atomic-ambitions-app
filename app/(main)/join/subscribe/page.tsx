'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { RegistrationData, MembershipLevel } from '../registration/types'
import SubscribeStep from './SubscribeStep'
import ConfirmSubscriptionStep from './ConfirmSubscriptionStep'
import { useAuthStore } from '@/lib/stores/auth-store'
import Link from 'next/link'

type SubscriptionStep = 'SubscribeStep' | 'ConfirmSubscriptionStep';

interface SubscriptionFlow {
  currentStep: SubscriptionStep;
  completedSteps: SubscriptionStep[];
  availableSteps: SubscriptionStep[];
}

const SubscriptionContent = () => {
  const searchParams = useSearchParams()
  const {
    isSignedIn,
    user,
    checkAuthStatus,
    isLoading: authLoading,
  } = useAuthStore()
  const [isInitializing, setIsInitializing] = useState(true)

  // Initialize form data state
  const [formData, setFormData] = useState<RegistrationData>({
    userId: null,
    email: null,
    emailVerified: null,
    alias: null,
    membershipId: null,
    agreedToTerms: null,
    privacyPolicyOk: null,
    status: null,
    level: null,
    joinedAt: null,
    subscriptionStatus: null,
  })

  // Initialize step flow
  const [stepFlow, setStepFlow] = useState<SubscriptionFlow>({
    currentStep: 'SubscribeStep',
    completedSteps: [],
    availableSteps: ['SubscribeStep', 'ConfirmSubscriptionStep'],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load user data and check auth status on mount
  useEffect(() => {
    let isMounted = true

    const loadUserData = async () => {
      try {
        // First, check authentication status
        await checkAuthStatus()

        if (!isMounted) return

        // Get the current auth state after the check
        const currentAuthState = useAuthStore.getState()
        const currentIsSignedIn = currentAuthState.isSignedIn
        const currentUser = currentAuthState.user

        // If user is signed in, populate form data
        if (currentIsSignedIn && currentUser) {
          setFormData((prev) => ({
            ...prev,
            userId: currentUser.id,
            email: currentUser.email,
            alias: currentUser.name,
            emailVerified: new Date(), // Assume verified if user is signed in
          }))
        }

        // Check if we're returning from Stripe payment
        const paymentStatus = searchParams.get('payment_status')
        const subscriptionStatus = searchParams.get('subscription_status')

        if (paymentStatus === 'success' || subscriptionStatus === 'active') {
          setFormData((prev) => ({
            ...prev,
            subscriptionStatus: subscriptionStatus || 'active',
          }))
          setStepFlow((prev) => ({
            ...prev,
            currentStep: 'ConfirmSubscriptionStep',
            completedSteps: ['SubscribeStep'],
          }))
        } else if (paymentStatus === 'cancelled') {
          setFormData((prev) => ({
            ...prev,
            subscriptionStatus: 'cancelled',
          }))
          setStepFlow((prev) => ({
            ...prev,
            currentStep: 'ConfirmSubscriptionStep',
            completedSteps: ['SubscribeStep'],
          }))
        }
      } catch (error) {
        console.error('Failed to load user data:', error)
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    loadUserData()

    return () => {
      isMounted = false
    }
  }, [searchParams, checkAuthStatus])

  const handleNext = () => {
    if (stepFlow.currentStep === 'SubscribeStep') {
      // Handle Stripe payment redirect
      handleStripePayment()
    }
  }

  const handleStripePayment = async () => {
    if (!formData.level || formData.level === 'explorer') {
      setErrors({ level: 'Please select a membership level' })
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
          membershipLevel: formData.level,
          userId: formData.userId,
          email: formData.email,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
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

  const handlePrevious = () => {
    setStepFlow((prev) => ({
      ...prev,
      currentStep: 'SubscribeStep',
    }))
  }

  const stepProps = {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    onNext: handleNext,
    onPrevious: handlePrevious,
  }

  // Get step components mapping
  const stepComponents = {
    SubscribeStep: SubscribeStep,
    ConfirmSubscriptionStep: ConfirmSubscriptionStep,
  }

  // Show loading state while initializing or checking auth
  if (isInitializing || authLoading) {
    return (
      <div className='min-h-screen bg-background py-12'>
        <div className='container mx-auto px-6'>
          <div className='max-w-md mx-auto'>
            <div className='card'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                <p className='text-muted-foreground'>
                  {authLoading
                    ? 'Checking authentication...'
                    : 'Loading subscription options...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const CurrentStepComponent = stepComponents[stepFlow.currentStep]

  return (
    <div className='min-h-screen bg-background py-12'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='max-w-4xl mx-auto mb-12'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-primary mb-4'>
              Upgrade Your Membership
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Unlock premium features and support the Atomic Ambitions community
              with a paid membership. Choose the plan that works best for you
              and join our growing community of supporters.
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
                  You need to be signed in to upgrade your membership. If
                  you&apos;re not already a member, you can join our free
                  Explorer membership first.
                </p>
                <div className='flex gap-4 justify-center'>
                  <Link href='/join' className='btn btn-primary'>
                    Join as Explorer (Free)
                  </Link>
                  <Link href='/_sign-in' className='btn btn-outline'>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Flow */}
        {isSignedIn && (
          <>
            {/* Progress indicator */}
            <div className='max-w-4xl mx-auto mb-12'>
              <div className='flex items-center justify-center'>
                {stepFlow.availableSteps.map((stepName, index) => {
                  const isCompleted =
                    stepFlow.completedSteps.includes(stepName)
                  const isCurrent = stepFlow.currentStep === stepName
                  const isActive = isCurrent || isCompleted

                  return (
                    <React.Fragment key={stepName}>
                      <div
                        className={`flex items-center ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive ? 'bg-primary text-white' : 'bg-muted'
                          }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <span className='ml-2 font-medium hidden sm:block'>
                          {stepName === 'SubscribeStep'
                            ? 'Choose Plan'
                            : 'Confirm'}
                        </span>
                      </div>
                      {index < stepFlow.availableSteps.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-4 ${
                            isCompleted ? 'bg-primary' : 'bg-muted'
                          }`}></div>
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            <CurrentStepComponent {...stepProps} />
          </>
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
                  <p className='text-muted-foreground'>
                    Loading subscription page...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
      <SubscriptionContent />
    </Suspense>
  )
}

export default SubscriptionPage
