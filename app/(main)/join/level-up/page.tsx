'use client'

import PickAndPay from './PickAndPay'
import Confirmation from './Confirmation'
import { useAuthStore } from '@/lib/stores/auth-store'

function SignInMsg() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto bg-background py-12'>
      <h1 className='mb-6'>Level Up Your Membership</h1>
      <p>Let's get you signed in first.</p>
    </div>
  )
}

export default function LevelUpPage() {
  const {
    isSignedIn,
    user,
    checkAuthStatus,
    isLoading: authLoading,
  } = useAuthStore()

  const hasActiveSubscription = false

  return (
    <div>
      {!isSignedIn ? (
        <SignInMsg />
      ) : !hasActiveSubscription ? (
        <PickAndPay />
      ) : (
        <Confirmation />
      )}
    </div>
  )
}
