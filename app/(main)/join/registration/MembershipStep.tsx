'use client'

import React from 'react'
import Link from 'next/link'
import { MembershipLevel, StepProps } from './types'

const MembershipStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  errors,
  setErrors,
  isSubmitting,
  setIsSubmitting,
  onNext,
  refreshRegistrationData,
}) => {
  const validateMembershipStep = () => {
    const newErrors: Record<string, string> = {}

    if (!formData?.alias?.trim()) {
      newErrors.alias = 'Please enter an alias'
    }

    if (!formData?.agreedToTerms) {
      newErrors.terms =
        'You must accept the Terms of Use to create a membership'
    }

    if (!formData?.privacyPolicyOk) {
      newErrors.privacy =
        'You must acknowledge the Privacy Policy to create a membership'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateMembershipStep()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send data to backend API to create membership
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alias: formData.alias,
          termsAcceptedAt: formData.agreedToTerms,
          privacyPolicyAcceptedAt: formData.privacyPolicyOk,
        }),
      })

      if (response.ok) {
        // Refresh registration data from the database
        if (refreshRegistrationData) {
          await refreshRegistrationData()
        }
        onNext()
      } else {
        const errorData = (await response.json()) as { message?: string }
        setErrors({
          submit: errorData.message || 'Membership creation failed',
        })
      }
    } catch (error) {
      console.error('Membership creation error:', error)
      setErrors({ submit: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-md mx-auto'>
      <div className='card'>
        <h2 className='text-2xl font-bold text-primary mb-6 text-center'>
          Create Your Membership
        </h2>
        <p className='text-muted-foreground mb-6 text-center'>
          You will start with a free Explorer membership.
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='alias'
              className='block text-sm font-medium text-foreground mb-2'
            >
              Choose Your Alias
            </label>
            <input
              type='text'
              id='alias'
              value={formData.alias || ''}
              onChange={(e) =>
                setFormData({ ...formData, alias: e.target.value })
              }
              placeholder='Enter your alias'
              className='input w-full'
            />
            {errors.alias && (
              <p className='text-red-500 text-sm mt-1'>{errors.alias}</p>
            )}
          </div>

          <div className='flex items-start space-x-3'>
            <input
              type='checkbox'
              id='terms'
              checked={!!formData.agreedToTerms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  agreedToTerms: e.target.checked ? new Date() : null,
                })
              }
              className='mt-1'
            />
            <label htmlFor='terms' className='text-sm text-muted-foreground'>
              I agree to the{' '}
              <Link
                target='_blank'
                href='https://nuclearambitions.com/legal/terms-of-use.html'
                className='text-primary hover:underline'
              >
                Terms of Use
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className='text-red-500 text-sm'>{errors.terms}</p>
          )}

          <div className='flex items-start space-x-3'>
            <input
              type='checkbox'
              id='privacy'
              checked={!!formData.privacyPolicyOk}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  privacyPolicyOk: e.target.checked ? new Date() : null,
                })
              }
              className='mt-1'
            />
            <label htmlFor='privacy' className='text-sm text-muted-foreground'>
              I am aware of the{' '}
              <Link
                target='blank'
                href='https://nuclearambitions.com/legal/privacy-policy.html'
                className='text-primary hover:underline'
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.privacy && (
            <p className='text-red-500 text-sm'>{errors.privacy}</p>
          )}

          {errors.submit && (
            <p className='text-red-500 text-sm text-center'>{errors.submit}</p>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn btn-primary w-full'
          >
            {isSubmitting ? 'Creating Membership...' : 'Create Membership'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default MembershipStep
