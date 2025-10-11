'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import {
  RegistrationData,
  RegistrationStep,
  StepFlow,
  StepConfig,
} from './types'
import MembershipStep from './MembershipStep'
import IdentityStep from './IdentityStep'
import ConfirmMembershipStep from './ConfirmMembershipStep'
import { useSession } from 'next-auth/react'

const RegistrationContent = () => {
  const searchParams = useSearchParams()
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true)

  // Step configuration with canSkip functions
  const stepConfigs: Record<RegistrationStep, StepConfig> = {
    IdentityStep: {
      name: 'IdentityStep',
      title: 'Verify Identity',
      description: 'Confirm your identity',
      canSkip: (formData) => {
        return !!formData.userId
      },
      nextStep: 'MembershipStep',
    },
    MembershipStep: {
      name: 'MembershipStep',
      title: 'Create Membership',
      description: 'Set up your free Explorer membership',
      canSkip: (formData) => !!formData.joinedAt,
      nextStep: 'ConfirmMembershipStep',
      previousStep: 'IdentityStep',
    },
    ConfirmMembershipStep: {
      name: 'ConfirmMembershipStep',
      title: 'Welcome Explorer',
      description: 'Your account is ready',
      canSkip: (formData) => false, // Always required - shows welcome and benefits
      previousStep: 'MembershipStep',
    },
  }

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
  })

  // Determine initial step and completed steps based on loaded registration state and auth status
  const getInitialStepAndCompletedSteps = (
    loadedFormData: RegistrationData,
    isUserSignedIn: boolean
  ): { step: RegistrationStep; completedSteps: RegistrationStep[] } => {
    // If user is signed in, they've already verified their identity
    if (isUserSignedIn || loadedFormData.userId) {
      const completedSteps: RegistrationStep[] = ['IdentityStep']

      // User has verified identity, check if they have an account
      if (loadedFormData.joinedAt) {
        // User has membership - also completed MembershipStep
        completedSteps.push('MembershipStep')
        return { step: 'ConfirmMembershipStep', completedSteps }
      }
      // Identity is known, but still needs to join
      return { step: 'MembershipStep', completedSteps }
    }
    // Start with identity verification
    return { step: 'IdentityStep', completedSteps: [] }
  }

  const [stepFlow, setStepFlow] = useState<StepFlow>({
    currentStep: 'IdentityStep', // Default, will be updated after loading
    completedSteps: [],
    availableSteps: ['IdentityStep', 'MembershipStep', 'ConfirmMembershipStep'],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Load registration state and check auth status on mount
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    const loadRegistrationState = async () => {
      try {
        if (!isMounted) return

        const isSignedIn = session.status === 'authenticated'
        const currentUser = session.data?.user

        console.log('Auth state after check:', {
          isSignedIn,
          currentUser,
        })

        // Load registration data from the database
        let loadedData: RegistrationData = {
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
        }

        // If user is signed in, try to load their registration state
        if (isSignedIn) {
          try {
            const response = await fetch('/api/registration', {
              method: 'GET',
              credentials: 'include',
            })

            if (response.ok) {
              const stateData = (await response.json()) as RegistrationData
              loadedData = { ...loadedData, ...stateData }
            }
          } catch (error) {
            console.error('Failed to load registration state:', error)
          }
        }

        if (!isMounted) return

        // If user is signed in, populate from auth data if not already set from database
        if (isSignedIn && currentUser) {
          if (!loadedData.alias && currentUser.name) {
            loadedData.alias = currentUser.name
          }
          if (!loadedData.email && currentUser.email) {
            loadedData.email = currentUser.email
          }
        }

        if (!isMounted) return

        console.log('Final loaded data:', loadedData)
        console.log('Current isSignedIn:', isSignedIn)

        // Update form data with loaded state
        setFormData(loadedData)

        // Determine and set the appropriate initial step and completed steps
        const { step: initialStep, completedSteps } =
          getInitialStepAndCompletedSteps(loadedData, isSignedIn)
        console.log('Initial step determined:', initialStep)
        console.log('Completed steps:', completedSteps)

        setStepFlow((prev) => ({
          ...prev,
          currentStep: initialStep,
          completedSteps,
        }))
      } catch (error) {
        console.error('Failed to load registration state:', error)
        // Fall back to default state if loading fails
        if (isMounted) {
          const requestedAlias = searchParams.get('requested-alias')
          if (requestedAlias) {
            setFormData((prev) => ({ ...prev, alias: requestedAlias }))
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRegistrationState()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only run once on mount

  // Refresh registration data from backend
  const refreshRegistrationData = async () => {
    try {
      const response = await fetch('/api/registration', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const stateData = (await response.json()) as RegistrationData
        setFormData(stateData)
        return stateData
      }
    } catch (error) {
      console.error('Failed to refresh registration data:', error)
    }
    return null
  }

  const handleNext = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep]
    if (currentConfig.nextStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.nextStep!,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }))
    }
  }

  const handlePrevious = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep]
    if (currentConfig.previousStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.previousStep!,
      }))
    }
  }

  const handleSkip = () => {
    const currentConfig = stepConfigs[stepFlow.currentStep]
    if (currentConfig.canSkip(formData) && currentConfig.nextStep) {
      setStepFlow((prev) => ({
        ...prev,
        currentStep: currentConfig.nextStep!,
        completedSteps: [...prev.completedSteps, prev.currentStep],
      }))
    }
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
    onSkip: handleSkip,
    refreshRegistrationData,
  }

  // Get step components mapping
  const stepComponents = {
    MembershipStep: MembershipStep,
    IdentityStep: IdentityStep,
    ConfirmMembershipStep: ConfirmMembershipStep,
  }

  // Show loading state while initializing or checking auth
  if (isLoading) {
    return (
      <div className='min-h-screen bg-background py-12'>
        <div className='container mx-auto px-6'>
          <div className='max-w-md mx-auto'>
            <div className='card'>
              <div className='text-center'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4'></div>
                <p className='text-muted-foreground'>
                  Loading next registration step...
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
        {/* Progress indicator */}
        <div className='max-w-4xl mx-auto mb-12'>
          <div className='flex items-center justify-between'>
            {stepFlow.availableSteps.map((stepName, index) => {
              const config = stepConfigs[stepName]
              const isCompleted = stepFlow.completedSteps.includes(stepName)
              const isCurrent = stepFlow.currentStep === stepName
              const isActive = isCurrent || isCompleted

              return (
                <React.Fragment key={stepName}>
                  <div
                    className={`flex items-center ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-primary text-white' : 'bg-muted'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <span className='ml-2 font-medium hidden sm:block'>
                      {config.title}
                    </span>
                  </div>
                  {index < stepFlow.availableSteps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? 'bg-primary' : 'bg-muted'
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        <CurrentStepComponent {...stepProps} />
      </div>
    </div>
  )
}

const RegistrationPage = () => {
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
                    Loading registration form...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <RegistrationContent />
    </Suspense>
  )
}

export default RegistrationPage
