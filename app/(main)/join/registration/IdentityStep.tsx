'use client'

import React from 'react'
import { StepProps } from './types'
import SignIn from '@/components/sign-in-oauth'
import MagicLinkSignIn from '@/components/sign-in-magic-link'

const IdentityStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onNext,
  onSkip,
}) => {
  return (
    <div className='max-w-md mx-auto'>
      <div className='card'>
        <h2 className='text-2xl font-bold text-primary mb-6 text-center'>
          Verify Your Identity
        </h2>
        <p className='text-muted-foreground mb-6 text-center'>
          To create an account, we need to establish a connection first. Here
          are some options.
        </p>
        <div className='space-y-6'>
          <SignIn />
          <MagicLinkSignIn />
        </div>
      </div>
    </div>
  )
}

export default IdentityStep
